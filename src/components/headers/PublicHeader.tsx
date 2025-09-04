"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PublicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white py-4 px-6 md:px-12 shadow-sm sticky top-0 z-40 border-b border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Readlle Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-[#4F46E5]">Readlle</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors">
            Home
          </Link>
          <Link href="/features" className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors">
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-5 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-xl hover:shadow-md transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#1F2937] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {!isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-3 px-4 bg-white border-t border-[#D1D5DB]">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors py-2 px-3 rounded-lg hover:bg-[#E0E7FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#features" 
              className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors py-2 px-3 rounded-lg hover:bg-[#E0E7FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors py-2 px-3 rounded-lg hover:bg-[#E0E7FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors py-2 px-3 rounded-lg hover:bg-[#E0E7FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/#contact" 
              className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors py-2 px-3 rounded-lg hover:bg-[#E0E7FF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-[#D1D5DB] flex flex-col space-y-3">
              <Link 
                href="/login" 
                className="text-[#1F2937] font-medium hover:text-[#4F46E5] transition-colors py-2 px-3 rounded-lg hover:bg-[#E0E7FF]"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/sign-up" 
                className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-xl text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;