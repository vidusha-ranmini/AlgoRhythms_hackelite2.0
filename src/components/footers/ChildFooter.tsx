import React from 'react';
import Link from 'next/link';

const ChildFooter: React.FC = () => {
  return (
    <footer className="bg-indigo-50 py-4 px-4 rounded-t-2xl shadow-inner fixed bottom-0 left-0 right-0">
      <div className="max-w-xl mx-auto flex justify-center items-center space-x-6">
        {/* Home Button */}
        <Link 
          href="/child/dashboard" 
          className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Go to Home"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Home</span>
          </div>
        </Link>

        {/* Next Activity Button */}
        <Link 
          href="/child/next-activity" 
          className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Go to Next Activity"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-1">
              <svg className="w-9 h-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Next Activity</span>
          </div>
        </Link>

        {/* Help Button */}
        <Link 
          href="/child/help" 
          className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Get Help"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Help</span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default ChildFooter;