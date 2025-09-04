"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuiz } from '@/context/QuizContext';

// Helper function to analyze quiz results
const analyzeResults = (answers: Record<number, string>): AnalysisResult => {
  // Count high-concern answers (Often/Always or Yes responses)
  const highConcernCount = Object.values(answers).filter(
    answer => ['Often', 'Always', 'Yes'].includes(answer)
  ).length;
  
  // Count medium-concern answers (Sometimes responses)
  const mediumConcernCount = Object.values(answers).filter(
    answer => answer === 'Sometimes'
  ).length;

  // Determine risk level
  if (highConcernCount >= 5) {
    return {
      riskLevel: "high" as const,
      title: "Significant Dyslexia Indicators",
      description: "Based on your responses, there are several indicators that suggest your child may be experiencing challenges consistent with dyslexia.",
      color: "from-red-500 to-pink-500"
    };
  } else if (highConcernCount >= 3 || (highConcernCount >= 2 && mediumConcernCount >= 3)) {
    return {
      riskLevel: "medium" as const,
      title: "Moderate Dyslexia Indicators",
      description: "Based on your responses, there are some indicators that your child may be experiencing reading challenges that could be related to dyslexia.",
      color: "from-yellow-500 to-orange-500"
    };
  } else {
    return {
      riskLevel: "low" as const,
      title: "Few Dyslexia Indicators",
      description: "Based on your responses, there are few indicators associated with dyslexia. However, it's still beneficial to support your child's reading development.",
      color: "from-green-500 to-teal-500"
    };
  }
};

// Helper to get recommendations based on risk level
const getRecommendations = (riskLevel: "high" | "medium" | "low") => {
  const commonRecommendations = [
    "Use multi-sensory learning approaches (visual, auditory, tactile)",
    "Practice reading regularly with texts at an appropriate level",
    "Focus on phonological awareness skills"
  ];
  
  const highRiskRecommendations = [
    "Consider a professional evaluation by an educational psychologist",
    "Explore structured literacy programs specifically designed for dyslexia",
    "Discuss accommodations with your child's school"
  ];
  
  const mediumRiskRecommendations = [
    "Monitor your child's reading progress closely",
    "Try strategies like colored overlays or dyslexia-friendly fonts",
    "Consider additional reading support through tutoring"
  ];
  
  const lowRiskRecommendations = [
    "Continue supporting regular reading practice",
    "Encourage reading for enjoyment with high-interest materials",
    "Build vocabulary through conversation and reading aloud"
  ];
  
  switch (riskLevel) {
    case "high":
      return [...commonRecommendations, ...highRiskRecommendations];
    case "medium":
      return [...commonRecommendations, ...mediumRiskRecommendations];
    default:
      return [...commonRecommendations, ...lowRiskRecommendations];
  }
};

// Add type definition for the analysis result
interface AnalysisResult {
  riskLevel: "high" | "medium" | "low";
  title: string;
  description: string;
  color: string;
}

export default function ResultsPage() {
  const { answers, questions, resetQuiz } = useQuiz();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  useEffect(() => {
    // Check if we have answers
    const answersCount = Object.keys(answers).length;
    if (answersCount > 0) {
      const analysisResult = analyzeResults(answers);
      setResult(analysisResult);
      setRecommendations(getRecommendations(analysisResult.riskLevel));
    }
  }, [answers]);

  // If there are no quiz answers, redirect to quiz start
  if (Object.keys(answers).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4">No Quiz Results</h1>
          <p className="mb-6">You haven&apos;t completed the quiz yet.</p>
          <Link 
            href="/quiz/start" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  // If we have answers but no result yet (shouldn't happen, but just in case)
  if (!result) {
    return <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
      <div className="text-2xl">Analyzing results...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Header with result */}
          <div className={`${
            result.riskLevel === 'high' ? 'bg-[#EF4444]' :
            result.riskLevel === 'medium' ? 'bg-[#F59E0B]' :
            'bg-[#10B981]'
          } p-8 text-white`}>
            <h1 className="text-3xl font-bold mb-4">{result.title}</h1>
            <p className="text-lg">{result.description}</p>
          </div>
          
          {/* Main content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#1F2937]">Recommendations</h2>
              <ul className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-[#D1FAE5] p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#1F2937]">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#1F2937]">Next Steps</h2>
              <p className="text-[#6B7280] mb-6">
                Readle offers personalized learning tools specifically designed to support children with diverse reading needs. Our platform adapts to your child&apos;s unique requirements and provides engaging activities to build reading confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard" 
                  className="px-6 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center"
                >
                  <span>Start Learning Path</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <button 
                  onClick={resetQuiz}
                  className="px-6 py-4 border-2 border-[#C7D2FE] text-[#4F46E5] font-medium rounded-xl hover:border-[#A5B4FC] hover:bg-[#E0E7FF] transition-all duration-300 text-center flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
            
            <div className="bg-[#E0E7FF] p-6 rounded-xl">
              <h3 className="font-bold text-[#1F2937] mb-2">Important Note</h3>
              <p className="text-[#1F2937] text-sm">
                This screening tool provides an initial assessment based on your responses and is not a clinical diagnosis. 
                For a formal diagnosis of dyslexia, consult with a qualified educational psychologist or learning specialist.
              </p>
            </div>
          </div>
        </div>
        
        {/* Summary of answers */}
        <details className="bg-white rounded-xl shadow-md p-6 mb-8">
          <summary className="text-xl font-semibold text-[#4F46E5] cursor-pointer">
            View Your Responses
          </summary>
          <div className="mt-4 border-t pt-4">
            <ul className="space-y-3">
              {questions.map((question) => (
                <li key={question.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3 border-b border-[#F3F4F6]">
                  <div className="md:col-span-2 font-medium text-[#1F2937]">{question.question}</div>
                  <div className="text-[#4F46E5] font-medium">
                    {answers[question.id] ? answers[question.id] : "Not answered"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>
        
        {/* Additional resources */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#1F2937]">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <h3 className="font-bold text-[#1F2937] mb-2">Reading Resources</h3>
              <p className="text-[#6B7280] mb-3">Explore our library of dyslexia-friendly books and learning materials.</p>
              <Link href="/resources" className="text-[#4F46E5] font-medium hover:text-[#4338CA]">Learn more →</Link>
            </div>
            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <h3 className="font-bold text-[#1F2937] mb-2">Parent Community</h3>
              <p className="text-[#6B7280] mb-3">Connect with other parents navigating similar challenges.</p>
              <Link href="/community" className="text-[#4F46E5] font-medium hover:text-[#4338CA]">Join now →</Link>
            </div>
          </div>
          
          {/* Alternative navigation at bottom */}
          <div className="mt-8 pt-6 border-t border-[#D1D5DB]">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                  href="/" 
                  className="px-6 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Back to Home</span>
                </Link>
              <Link 
                href="/quiz/start" 
                className="px-6 py-3 text-[#4F46E5] border border-[#C7D2FE] rounded-lg hover:bg-[#E0E7FF] transition-colors text-center"
              >
                Share Results
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}