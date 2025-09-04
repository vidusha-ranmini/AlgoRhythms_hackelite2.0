#!/usr/bin/env python3
"""
Test script to verify that the RAG chatbot produces shorter responses
"""

import requests
import json

def test_response_lengths():
    base_url = "http://localhost:8000"
    
    # Test question
    question = "What is dyslexia?"
    
    # Test different response lengths
    lengths = ["short", "medium", "long"]
    
    print("Testing response lengths...\n")
    
    for length in lengths:
        print(f"Testing {length} responses:")
        print("-" * 50)
        
        # Test without RAG
        response = requests.post(f"{base_url}/chat", json={
            "message": question,
            "model": "llama2",
            "use_rag": False,
            "response_length": length
        })
        
        if response.status_code == 200:
            data = response.json()
            print(f"Without RAG ({length}):")
            print(f"Response: {data['response']}")
            print(f"Word count: {len(data['response'].split())}")
            print(f"Character count: {len(data['response'])}")
            print()
        
        # Test with RAG
        response = requests.post(f"{base_url}/chat", json={
            "message": question,
            "model": "llama2",
            "use_rag": True,
            "response_length": length
        })
        
        if response.status_code == 200:
            data = response.json()
            print(f"With RAG ({length}):")
            print(f"Response: {data['response']}")
            print(f"Word count: {len(data['response'].split())}")
            print(f"Character count: {len(data['response'])}")
            print(f"Sources used: {data['sources_used']}")
            print()
        
        print("=" * 60)
        print()

def test_rag_status():
    base_url = "http://localhost:8000"
    
    print("Testing RAG status...")
    response = requests.get(f"{base_url}/rag/status")
    
    if response.status_code == 200:
        data = response.json()
        print(f"RAG Status: {json.dumps(data, indent=2)}")
    else:
        print(f"Error checking RAG status: {response.status_code}")

if __name__ == "__main__":
    print("Readle Chatbot Response Length Test")
    print("=" * 50)
    
    # Test RAG status first
    test_rag_status()
    print()
    
    # Test response lengths
    test_response_lengths()
