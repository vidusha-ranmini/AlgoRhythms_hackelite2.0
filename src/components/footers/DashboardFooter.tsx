"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const DashboardFooter: React.FC = () => {
  const [language, setLanguage] = useState('en');
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-3 sm:mb-0">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Readlle Inc. All rights reserved.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Help Link */}
          <Link 
            href="/help" 
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </Link>

          {/* Language Switcher */}
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-md py-1 pl-3 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
              aria-label="Select language"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Privacy Link */}
          <Link 
            href="/privacy" 
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;