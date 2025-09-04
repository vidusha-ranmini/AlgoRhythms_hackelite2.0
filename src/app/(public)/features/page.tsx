"use client";

import Link from 'next/link';
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff]">
      {/* Hero/Title Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 bg-indigo-100 p-3 rounded-full">
              <span className="text-4xl">⚡</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Powerful Features
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Discover the tools and technologies that make Readlle the leading platform for 
              children with dyslexia to develop their reading skills with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Dyslexia Quiz */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Dyslexia Quiz</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Our science-backed assessment helps identify dyslexia indicators and creates a baseline for your child&apos;s personalized learning plan. The quiz takes only 15 minutes and provides immediate insights.
              </p>
              <div className="mt-auto">
                <Link href="/login" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors duration-300">
                  Take the Quiz
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Feature 2: Personalized Activities */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Personalized Activities</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Engaging games and exercises tailored to your child&apos;s specific needs. Our adaptive learning system adjusts difficulty and focus areas based on your child&apos;s progress to maintain the perfect learning challenge.
              </p>
              <div className="mt-auto">
                <Link href="/login" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-300">
                  Explore Activities
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Feature 3: Progress Tracker */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Progress Tracker</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Monitor your child&apos;s development with detailed insights and visual reports. Celebrate achievements with milestone markers and watch as reading confidence grows through data-backed evidence.
              </p>
              <div className="mt-auto">
                <Link href="/login" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors duration-300">
                  View Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Feature 4: Parent Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Parent Tips</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Access a wealth of resources designed to help parents support their children with dyslexia. Learn strategies for at-home practice, understand dyslexia better, and become your child&apos;s best advocate.
              </p>
              <div className="mt-auto">
                <Link href="/login" className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors duration-300">
                  Get Resources
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Feature 5: Psychologist Connection */}
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Psychologist Connection</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Connect with licensed child psychologists who specialize in dyslexia and learning differences. Get professional guidance, personalized strategies, and ongoing support for your child&apos;s unique needs.
              </p>
              <div className="mt-auto">
                <Link href="/login" className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-xl hover:bg-pink-700 transition-colors duration-300">
                  Find Specialists
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Feature 6: Text-to-Speech */}
            <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9.172 12l3.5-3.5M7 21l3.5-3.5M3 3l3.5 3.5M21 3l-3.5 3.5M16 12l-3.5 3.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Text-to-Speech System</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Advanced text-to-speech functionality built into every learning activity. Children can hear proper pronunciation, follow along with highlighted text, and develop better reading comprehension through multi-sensory learning.
              </p>
              <div className="mt-auto">
                <Link href="/login" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-300">
                  Try Audio Features
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">COMPARE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">Why Readlle Stands Out</h2>
            <p className="text-gray-600 max-w-xl mx-auto">See how our features compare to traditional reading approaches</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-xl">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="px-6 py-4 text-left text-gray-800 font-bold">Feature</th>
                  <th className="px-6 py-4 text-center text-indigo-700 font-bold">Readlle</th>
                  <th className="px-6 py-4 text-center text-gray-800 font-bold">Traditional Approaches</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium">Personalization</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium">Progress Tracking</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">Limited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium">Dyslexia-Specific</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium">Engagement Level</td>
                  <td className="px-6 py-4 text-center">High</td>
                  <td className="px-6 py-4 text-center">Low to Medium</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Parent Resources</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
            Start your child&apos;s journey to confident reading today with our specialized tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/signup" className="px-10 py-4 bg-white text-indigo-700 font-medium rounded-xl hover:bg-indigo-50 transition-all duration-300 text-center shadow-lg">
              Get Started Free
            </Link>
            <Link href="/contact" className="px-10 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">No credit card required. Start with our free plan today.</p>
        </div>
      </section>
    </main>
  );
}