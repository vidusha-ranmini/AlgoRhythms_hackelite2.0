"use client";

import React, { useState } from 'react';
import { Psychologist } from '@/lib/psychologists';
import { Check, ChevronDown } from 'lucide-react';

interface MatchFormProps {
  onMatch: (results: Psychologist[]) => void;
  allPsychologists: Psychologist[];
}

type ContactMethod = 'Chat' | 'Video' | 'Call';
type AreaOfConcern = 'Reading' | 'Focus' | 'Confidence';

const ageOptions = [
  "3-5 years",
  "6-8 years",
  "9-11 years",
  "12-14 years",
  "15-17 years"
];

const languageOptions = ["English", "Spanish", "French", "Mandarin", "German"];

const MatchForm: React.FC<MatchFormProps> = ({ onMatch, allPsychologists }) => {
  const [childAge, setChildAge] = useState<string>("");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("");
  const [areasOfConcern, setAreasOfConcern] = useState<AreaOfConcern[]>([]);
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAreasOfConcernChange = (concern: AreaOfConcern) => {
    setAreasOfConcern(prev => {
      if (prev.includes(concern)) {
        return prev.filter(item => item !== concern);
      } else {
        return [...prev, concern];
      }
    });
  };

  const handleContactMethodChange = (method: ContactMethod) => {
    setContactMethods(prev => {
      if (prev.includes(method)) {
        return prev.filter(item => item !== method);
      } else {
        return [...prev, method];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request with timeout
    setTimeout(() => {
      // Match psychologists based on form data
      let matches = [...allPsychologists];

      // Filter by language if selected
      if (preferredLanguage) {
        matches = matches.filter(p => 
          p.languages.includes(preferredLanguage)
        );
      }

      // Filter by specialties matching areas of concern
      if (areasOfConcern.length > 0) {
        matches = matches.filter(p => {
          // Map our concern areas to related specialties
          const concernToSpecialty: Record<AreaOfConcern, string[]> = {
            'Reading': ['Learning Disabilities', 'Child Development', 'Education'],
            'Focus': ['ADHD', 'Concentration', 'Child Development'],
            'Confidence': ['Anxiety', 'Self-Esteem', 'Social Skills']
          };
          
          // Check if psychologist has at least one specialty matching our concerns
          return areasOfConcern.some(concern => 
            concernToSpecialty[concern].some(specialty => 
              p.specialties.includes(specialty)
            )
          );
        });
      }

      // Sort by rating (highest first)
      matches.sort((a, b) => b.rating - a.rating);

      // Take top 2 matches
      const topMatches = matches.slice(0, 2);
      
      setIsLoading(false);
      onMatch(topMatches);
    }, 1500); // Simulate loading for 1.5 seconds
  };

  const isFormValid = childAge && preferredLanguage && areasOfConcern.length > 0 && contactMethods.length > 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Find the Perfect Match</h2>
      
      <div className="space-y-6">
        {/* Age Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Child&apos;s Age
          </label>
          <div className="relative">
            <select 
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>Select age range</option>
              {ageOptions.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Preferred Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Language
          </label>
          <div className="relative">
            <select 
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>Select language</option>
              {languageOptions.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Areas of Concern */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Areas of Concern (select all that apply)
          </label>
          <div className="space-y-3">
            {(['Reading', 'Focus', 'Confidence'] as AreaOfConcern[]).map(concern => (
              <div key={concern} className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleAreasOfConcernChange(concern)}
                  className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${
                    areasOfConcern.includes(concern)
                      ? 'bg-indigo-600 border-indigo-600'
                      : 'border-gray-300'
                  }`}
                >
                  {areasOfConcern.includes(concern) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
                <label className="ml-3 text-gray-700">{concern}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Contact Method (select all that apply)
          </label>
          <div className="flex flex-wrap gap-3">
            {(['Chat', 'Video', 'Call'] as ContactMethod[]).map(method => (
              <button
                key={method}
                type="button"
                onClick={() => handleContactMethodChange(method)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  contactMethods.includes(method)
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-5 py-3.5 rounded-xl shadow-sm transition-all ${
            isFormValid && !isLoading
              ? 'hover:shadow-md hover:from-indigo-700 hover:to-purple-700'
              : 'opacity-60 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Finding matches...
            </div>
          ) : (
            'Find Matches'
          )}
        </button>
      </div>
    </form>
  );
};

export default MatchForm;