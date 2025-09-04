"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MatchForm from '@/components/psychologists/MatchForm';
import PsychologistCard from '@/components/psychologists/PsychologistCard';
import { Psychologist, psychologists } from '@/lib/psychologists';
import { ArrowLeft, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function MatchPage() {
  const [matches, setMatches] = useState<Psychologist[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleMatch = (results: Psychologist[]) => {
    setMatches(results);
    setHasSubmitted(true);
    if (results.length === 0) {
      toast.error("No matches found. Try different criteria.");
    } else {
      toast.success(`Found ${results.length} matches for your needs!`);
    }
  };

  // These would connect to real functionality in a production app
  const handleBookSession = (id: string) => {
    toast.success(`Booking session with psychologist ID: ${id}`);
  };
  
  const handleSendMessage = (id: string) => {
    toast.success(`Opening message window for psychologist ID: ${id}`);
  };
  
  const handleRequestCall = (id: string) => {
    toast.success(`Requesting call from psychologist ID: ${id}`);
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <Link 
          href="/psychologists" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all psychologists
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCheck className="h-8 w-8 text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">Find a Perfect Match</h1>
              <p className="text-indigo-600">Tell us about your child&apos;s needs, and we&apos;ll recommend the right psychologists</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <MatchForm 
                onMatch={handleMatch} 
                allPsychologists={psychologists}
              />
            </div>

            <div className={`space-y-6 ${!hasSubmitted ? 'hidden md:block' : ''}`}>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-medium text-lg text-blue-800 mb-2">How We Match</h3>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 rounded-full bg-blue-200 text-blue-700 text-xs font-medium flex items-center justify-center mr-2 mt-0.5">1</span>
                    We analyze your child&apos;s specific needs and challenges
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 rounded-full bg-blue-200 text-blue-700 text-xs font-medium flex items-center justify-center mr-2 mt-0.5">2</span>
                    Our algorithm matches with professionals specializing in those areas
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 rounded-full bg-blue-200 text-blue-700 text-xs font-medium flex items-center justify-center mr-2 mt-0.5">3</span>
                    We consider language preferences and communication styles
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-5 w-5 rounded-full bg-blue-200 text-blue-700 text-xs font-medium flex items-center justify-center mr-2 mt-0.5">4</span>
                    We prioritize highly-rated professionals with relevant experience
                  </li>
                </ul>
              </div>

              {hasSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {matches.length > 0 ? 'Your Recommended Matches' : 'No Matches Found'}
                  </h2>
                  
                  {matches.length > 0 ? (
                    <div className="space-y-6">
                      {matches.map((psychologist, index) => (
                        <motion.div
                          key={psychologist.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <PsychologistCard
                            psychologist={psychologist}
                            onBook={() => handleBookSession(psychologist.id)}
                            onMessage={() => handleSendMessage(psychologist.id)}
                            onRequestCall={() => handleRequestCall(psychologist.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                      <p className="text-gray-600 mb-4">
                        We couldn&apos;t find any psychologists matching your criteria. 
                        Try adjusting your preferences or contact our support team for assistance.
                      </p>
                      <button
                        onClick={() => setHasSubmitted(false)}
                        className="text-indigo-600 font-medium hover:text-indigo-800"
                      >
                        Try different criteria
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}