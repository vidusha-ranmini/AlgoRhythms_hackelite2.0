"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { childBadges, Badge as BadgeType, getBadgesByCategory } from '@/lib/childBadges';

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayedBadges, setDisplayedBadges] = useState<BadgeType[]>(childBadges);

  // Get all categories
  const categories = Array.from(
    new Set(childBadges.map(badge => badge.category))
  );

  // Filter badges when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setDisplayedBadges(childBadges);
    } else {
      setDisplayedBadges(getBadgesByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  // Group badges by category for display
  const groupedBadges: Record<string, BadgeType[]> = {};

  if (selectedCategory === 'all') {
    categories.forEach(category => {
      groupedBadges[category] = getBadgesByCategory(category);
    });
  } else {
    groupedBadges[selectedCategory] = displayedBadges;
  }

  // Calculate achievement stats
  const totalBadges = childBadges.length;
  const totalEarned = childBadges.length; // Since these are all "earned" badges in our demo
  const completionPercentage = Math.round((totalEarned / totalBadges) * 100);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-2">My Achievements 🏆</h1>
              <p className="text-[#6B7280] text-lg">Celebrate your learning milestones and unlock new badges!</p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center text-[#4F46E5] hover:text-[#4338CA] transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1F2937]">Achievement Progress</h2>
              <p className="text-sm text-[#6B7280]">Your learning journey so far</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-5 rounded-lg text-center">
              <div className="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🎯</span>
              </div>
              <p className="text-sm font-medium text-[#4F46E5] mb-1">Total Badges</p>
              <p className="text-3xl font-bold text-[#1F2937]">{totalBadges}</p>
            </div>

            <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] p-5 rounded-lg text-center">
              <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">✅</span>
              </div>
              <p className="text-sm font-medium text-[#10B981] mb-1">Badges Earned</p>
              <p className="text-3xl font-bold text-[#1F2937]">{totalEarned}</p>
            </div>

            <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] p-5 rounded-lg text-center">
              <div className="w-12 h-12 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📊</span>
              </div>
              <p className="text-sm font-medium text-[#7C3AED] mb-1">Completion</p>
              <p className="text-3xl font-bold text-[#1F2937]">{completionPercentage}%</p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937]">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors 
                ${selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-sm border border-[#C7D2FE]'
                  : 'bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] text-[#6B7280] hover:from-[#F1F5F9] hover:to-[#E0E7FF] border border-gray-100 hover:border-gray-200'}`}
            >
              All Badges
            </button>

            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
                  ${selectedCategory === category
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-sm border border-[#C7D2FE]'
                    : 'bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] text-[#6B7280] hover:from-[#F1F5F9] hover:to-[#E0E7FF] border border-gray-100 hover:border-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.keys(groupedBadges).map(category => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="mb-8"
            >
              {selectedCategory === 'all' && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-[#1F2937] capitalize">{category}</h2>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {groupedBadges[category].map(badge => (
                  <motion.div
                    key={badge.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Achievement Header */}
                    <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] p-6 text-center border-b border-gray-100">
                      <div className="relative inline-block">
                        {/* Badge Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/20 to-[#7C3AED]/20 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform duration-300"></div>

                        {/* Main Badge */}
                        <div className="relative w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <span className="text-3xl filter drop-shadow-sm">{badge.icon}</span>
                        </div>

                        {/* Achievement Ring */}
                        <div className="absolute inset-0 w-20 h-20 border-4 border-white rounded-full shadow-sm"></div>
                      </div>

                      {/* Level Stars */}
                      {badge.level && (
                        <div className="mt-3 flex justify-center">
                          {Array.from({ length: badge.level }).map((_, i) => (
                            <span key={i} className="text-[#F59E0B] text-lg mx-0.5">⭐</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Achievement Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#1F2937] mb-2 text-center group-hover:text-[#4F46E5] transition-colors">
                        {badge.title}
                      </h3>

                      <p className="text-sm text-[#6B7280] text-center leading-relaxed mb-4">
                        {badge.description}
                      </p>

                      {/* Achievement Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium text-[#10B981]">EARNED</span>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-[#6B7280]">
                            {badge.earnedOn.toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="mt-3 text-center">
                        <span className="inline-block px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs font-medium rounded-full capitalize">
                          {badge.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {Object.keys(groupedBadges).length === 0 && (
            <motion.div
              className="text-center py-16 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="w-32 h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#6B7280] mb-2">No badges found</h3>
              <p className="text-[#9CA3AF]">No badges found in this category.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Locked Badges Teaser */}
        <motion.div
          className="mt-12 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-[#F8FAFC] to-[#EEF2FF] p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#6B7280] to-[#9CA3AF] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1F2937]">Mystery Badges</h2>
                <p className="text-sm text-[#6B7280]">Complete more activities to unlock these special badges</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { hint: "Complete 10 phonics activities", icon: "🎵" },
                { hint: "Read for 7 days straight", icon: "📚" },
                { hint: "Master all spelling levels", icon: "✏️" },
                { hint: "Help a friend learn", icon: "🤝" }
              ].map((mystery, i) => (
                <div key={i} className="group bg-[#F8FAFC] border-2 border-dashed border-[#D1D5DB] rounded-xl p-4 text-center hover:border-[#4F46E5] hover:bg-[#EEF2FF] transition-all duration-300">
                  <div className="relative mb-4">
                    {/* Mystery Badge with Glow */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{mystery.icon}</span>
                    </div>

                    {/* Lock Icon */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6B7280] rounded-full flex items-center justify-center border-2 border-white">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-[#6B7280] mb-2">Mystery Badge</h4>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{mystery.hint}</p>

                  {/* Progress Hint */}
                  <div className="mt-3 pt-3 border-t border-dashed border-[#D1D5DB]">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-[#E5E7EB] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#E5E7EB] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-1">33% Complete</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <Link
                href="/activities"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Learning to Unlock More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}