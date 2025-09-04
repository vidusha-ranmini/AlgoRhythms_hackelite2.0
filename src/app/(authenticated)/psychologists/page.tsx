"use client";

import React, { useState } from 'react';
import { psychologists } from '@/lib/psychologists';
import PsychologistCard from '@/components/psychologists/PsychologistCard';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Search, UserSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PsychologistsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const router = useRouter();

  // Extract unique specialties for filter dropdown
  const specialties = ['All', ...Array.from(new Set(psychologists.flatMap(p => p.specialties)))];

  // Filter psychologists based on search and specialty
  const filteredPsychologists = psychologists.filter(psychologist => {
    const matchesSearch = searchTerm === '' ||
      psychologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty = selectedSpecialty === 'All' ||
      psychologist.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  // These would connect to real functionality in a production app
  const handleBookSession = (id: string) => {
    toast.success(`Opening booking form for psychologist ID: ${id}`);
  };

  const handleSendMessage = (id: string) => {
    toast.success(`Opening message window for psychologist ID: ${id}`);
  };

  const handleRequestCall = (id: string) => {
    toast.success(`Requesting call from psychologist ID: ${id}`);
  };

  const handleOpenMatchModal = () => {
    router.push('/psychologists/match');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-8 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-[#1F2937] mb-2 flex items-center gap-3">
                🧠 Find a Psychologist
              </h1>
              <p className="text-lg text-[#6B7280]">Connect with professionals specializing in child development</p>
            </div>

            <div className="flex w-full lg:w-auto flex-col sm:flex-row gap-4 items-center">
              {/* Enhanced search bar */}
              <div className="relative flex w-full sm:max-w-md bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <div className="absolute left-0 pl-4 flex items-center h-full pointer-events-none">
                  <Search className="h-5 w-5 text-[#6B7280]" />
                </div>

                <input
                  type="text"
                  placeholder="Search psychologists..."
                  className="pl-12 py-3 pr-3 flex-grow bg-transparent border-none outline-none focus:ring-0 text-[#1F2937] placeholder-[#6B7280]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="h-full flex items-center">
                  <div className="w-px h-[60%] bg-gray-200 self-center"></div>
                </div>

                <div className="relative flex items-center px-4">
                  <select
                    className="appearance-none bg-transparent text-sm font-medium text-[#6B7280] py-3 cursor-pointer outline-none"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    <option value="All">All Specialties</option>
                    {specialties.filter(s => s !== 'All').map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Match-Me button */}
              <button
                onClick={handleOpenMatchModal}
                className="whitespace-nowrap bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:shadow-md text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <UserSearch className="w-5 h-5" />
                Match-Me
              </button>
            </div>
          </div>
        </div>

        {/* Results count and quick filter tags */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6 mb-8 flex flex-wrap items-center gap-4">
          <span className="text-[#1F2937] font-semibold">
            <span className="text-[#4F46E5]">{filteredPsychologists.length}</span> psychologists found
          </span>

          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm text-[#6B7280] font-medium">Quick filters:</span>
            {['Anxiety', 'Child Development', 'ADHD', 'Learning Disabilities'].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedSpecialty(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedSpecialty === tag
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-sm'
                    : 'bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 text-[#6B7280] hover:shadow-sm hover:-translate-y-0.5'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Psychologist cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPsychologists.length > 0 ? (
            filteredPsychologists.map((psychologist, index) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2">No psychologists found</h3>
              <p className="text-[#6B7280] mb-6">Try adjusting your search or filters to find more results</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedSpecialty('All'); }}
                className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white rounded-xl font-semibold hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <a
            href="/dashboard"
            className="flex items-center px-6 py-3 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 text-[#4F46E5] rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </a>
        </div>
      </motion.div>
    </div>
  );
}