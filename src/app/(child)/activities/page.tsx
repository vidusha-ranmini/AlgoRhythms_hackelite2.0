"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ActivityCard from '@/components/ui/ActivityCard';
import { childActivities, Activity, ActivityType, DifficultyLevel } from '@/lib/childActivities';
import { CHILD } from '@/lib/constants';
import Image from 'next/image';

export default function ActivitiesPage() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(childActivities);
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'duration'>('title');

  // Set initial filter from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type') as ActivityType;
    if (typeParam && ['phonics', 'spelling', 'reading', 'comprehension'].includes(typeParam)) {
      setSelectedType(typeParam);
    }
  }, [searchParams]);

  // Filter activities based on selected criteria
  useEffect(() => {
    let filtered = [...childActivities];

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(activity => activity.type === selectedType);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(activity => activity.difficulty === selectedDifficulty);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort activities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'duration':
          return (a.durationMinutes || 0) - (b.durationMinutes || 0);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredActivities(filtered);
  }, [selectedType, selectedDifficulty, searchQuery, sortBy]);

  // Mock progress data for activities
  const getActivityProgress = (activityId: string) => {
    const progressMap: Record<string, number> = {
      'act-001': 100, // Completed
      'act-002': 65,  // In progress
      'act-003': 100, // Completed
      'act-004': 0,   // Not started
      'act-005': 40,  // In progress
      'act-006': 0,   // Not started
      'act-007': 80,  // In progress
      'act-008': 0,   // Not started
    };
    return progressMap[activityId] || 0;
  };

  const activityTypeData = [
    {
      type: 'phonics',
      icon: '🔤',
      title: 'Phonics',
      color: 'from-[#4F46E5] to-[#6366F1]',
      accent: 'border-[#4F46E5]',
      description: 'Learn letter sounds',
      count: childActivities.filter(a => a.type === 'phonics').length,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop'
    },
    {
      type: 'spelling',
      icon: '✏️',
      title: 'Spelling',
      color: 'from-[#10B981] to-[#14B8A6]',
      accent: 'border-[#10B981]',
      description: 'Master word spelling',
      count: childActivities.filter(a => a.type === 'spelling').length,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop'
    },
    {
      type: 'reading',
      icon: '📚',
      title: 'Reading',
      color: 'from-[#F59E0B] to-[#F97316]',
      accent: 'border-[#F59E0B]',
      description: 'Practice reading skills',
      count: childActivities.filter(a => a.type === 'reading').length,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop'
    },
    {
      type: 'comprehension',
      icon: '🧩',
      title: 'Comprehension',
      color: 'from-[#3B82F6] to-[#2563EB]',
      accent: 'border-[#3B82F6]',
      description: 'Understand what you read',
      count: childActivities.filter(a => a.type === 'comprehension').length,
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-2">Learning Activities 🎮</h1>
              <p className="text-[#6B7280] text-lg">Choose your next adventure, {CHILD.name}!</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm text-[#6B7280]">Level {CHILD.level}</span>
                <span className="mx-2">•</span>
                <span className="text-sm font-bold text-[#4F46E5]">{CHILD.totalStars} ⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Type Cards */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1F2937]">Learning Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {activityTypeData.map((category) => (
              <motion.button
                key={category.type}
                variants={itemVariants}
                onClick={() => setSelectedType(category.type as ActivityType)}
                className={`group bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden ${selectedType === category.type ? 'ring-2 ring-[#4F46E5] ring-offset-2' : ''
                  }`}
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.type}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl text-white drop-shadow-lg">{category.icon}</span>
                  </div>

                  {selectedType === category.type && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                        <svg className="w-4 h-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-[#1F2937] capitalize mb-1">{category.title}</h3>
                  <p className="text-sm text-[#6B7280] mb-2">{category.description}</p>
                  <p className="text-xs font-medium text-[#4F46E5]">{category.count} activities</p>
                  <div className={`mt-3 w-12 h-0.5 ${category.accent.replace('border-', 'bg-')} rounded-full`}></div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-colors"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ActivityType | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white text-[#374151]"
              >
                <option value="all">All Types</option>
                <option value="phonics">Phonics</option>
                <option value="spelling">Spelling</option>
                <option value="reading">Reading</option>
                <option value="comprehension">Comprehension</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white text-[#374151]"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner ⭐</option>
                <option value="intermediate">Intermediate ⭐⭐</option>
                <option value="advanced">Advanced ⭐⭐⭐</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'difficulty' | 'duration')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white text-[#374151]"
              >
                <option value="title">Sort by Name</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="duration">Sort by Duration</option>
              </select>

              {/* Clear Filters */}
              {(selectedType !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] text-[#6B7280] rounded-lg hover:from-[#F1F5F9] hover:to-[#E0E7FF] transition-colors border border-gray-100 shadow-sm"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedType !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedType !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-[#EEF2FF] text-[#4F46E5] rounded-full text-sm font-medium">
                  Type: {selectedType}
                  <button
                    onClick={() => setSelectedType('all')}
                    className="ml-2 hover:text-[#4338CA]"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-sm font-medium">
                  Level: {selectedDifficulty}
                  <button
                    onClick={() => setSelectedDifficulty('all')}
                    className="ml-2 hover:text-[#047857]"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-[#F3E8FF] text-[#7C3AED] rounded-full text-sm font-medium">
                  Search: &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-[#5B21B6]"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1F2937]">
              {selectedType === 'all' ? 'All Activities' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Activities`}
            </h2>
            <span className="text-[#6B7280] text-sm">
              {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
            </span>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <ActivityCard
                    id={activity.id}
                    title={activity.title}
                    type={activity.type}
                    difficulty={activity.difficulty}
                    description={activity.description}
                    imageUrl={activity.thumbnailUrl || `https://images.unsplash.com/photo-${activity.type === 'phonics' ? '1503676260728-1c00da094a0b' :
                      activity.type === 'spelling' ? '1455390582262-044cdead277a' :
                        activity.type === 'reading' ? '1481627834876-b7833e8f5570' :
                          '1606092195730-5d7b9af1efc5'
                      }?w=400&h=250&fit=crop`}
                    completedPercentage={getActivityProgress(activity.id)}
                    isNew={activity.id === 'act-001' || activity.id === 'act-008'}
                    durationMinutes={activity.durationMinutes}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-32 h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#6B7280] mb-2">No Activities Found</h3>
              <p className="text-[#9CA3AF] mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors"
              >
                Show All Activities
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Recommended Activities */}
        {selectedType === 'all' && searchQuery === '' && (
          <motion.div
            className="mt-12 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#3B82F6] p-8 rounded-xl shadow-sm text-white border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">Ready for a Challenge? 🚀</h2>
              <p className="text-lg opacity-90 mb-6">
                Based on your level {CHILD.level} progress, we recommend trying intermediate activities!
              </p>
              <button
                onClick={() => setSelectedDifficulty('intermediate')}
                className="inline-flex items-center px-8 py-3 bg-white text-[#4F46E5] font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Show Intermediate Activities
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}