"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import { CHILD } from '@/lib/constants';
import { childActivities } from '@/lib/childActivities';
import { getRecentBadges } from '@/lib/childBadges';
import Image from 'next/image';

export default function ChildDashboard() {
  const [currentStreak] = useState(7);
  const [weeklyGoal] = useState(5);
  const [completedToday] = useState(2);

  // Get recent badges
  const recentBadges = getRecentBadges().slice(0, 4);

  // Calculate weekly progress
  const weeklyProgress = Math.min((completedToday / weeklyGoal) * 100, 100);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Mock data for today's activities
  const todayActivities = [
    { id: 'act-001', completed: true, timeSpent: 15 },
    { id: 'act-003', completed: true, timeSpent: 12 },
    { id: 'act-004', completed: false, timeSpent: 0 }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Today's Challenge */}
        <motion.div
          className="bg-gradient-to-br from-[#4F46E5] to-[#6366F1] border border-[#C7D2FE] p-6 rounded-2xl shadow-sm mb-8 text-white"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop"
                alt="Challenge trophy"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">Daily Challenge 🏆</h2>
                <p className="opacity-90">Complete &quot;Rhyme Time&quot; to earn a special badge!</p>
                <p className="text-sm opacity-75 mt-1">+50 bonus stars for completion today</p>
              </div>
            </div>
            <Link
              href="/activities/act-004"
              className="px-6 py-3 bg-white text-[#4F46E5] font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              Start Challenge
            </Link>
          </div>
        </motion.div>
        {/* Welcome Header with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Welcome Message */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-6 rounded-2xl shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              {/* <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face"
                alt="Reading mascot"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              /> */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#1F2937]">
                  Welcome back, {CHILD.name}! 🌟
                </h1>
                <p className="text-[#6B7280] text-lg">Ready to continue your learning adventure?</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 p-6 rounded-2xl shadow-sm"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold text-[#1F2937] mb-4">Today&apos;s Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">⭐ Stars Earned</span>
                <span className="font-bold text-[#F59E0B]">{CHILD.totalStars}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">🔥 Day Streak</span>
                <span className="font-bold text-[#F59E0B]">{currentStreak}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">📚 Activities</span>
                <span className="font-bold text-[#4F46E5]">{completedToday}/{weeklyGoal}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress & Goals Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Level Progress */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 p-6 rounded-2xl shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=40&h=40&fit=crop"
                alt="Progress icon"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">Level Progress</h2>
            </div>
            <ProgressBar progress={CHILD.progress} level={CHILD.level} theme="rainbow" />

            {CHILD.progress >= 90 && (
              <div className="mt-4 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] p-4 rounded-xl border border-[#FDE68A] flex items-center">
                <span className="text-2xl mr-3">🎉</span>
                <p className="text-sm text-[#1F2937] font-medium">
                  Almost there! One more activity to level up!
                </p>
              </div>
            )}
          </motion.div>

          {/* Weekly Goal */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 p-6 rounded-2xl shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=40&h=40&fit=crop"
                alt="Goal icon"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-[#1F2937]">This Week&apos;s Goal</h2>
            </div>

            <div className="relative">
              <div className="h-4 bg-[#D1FAE5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                  style={{ width: `${weeklyProgress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-[#6B7280]">{completedToday} completed</span>
                <span className="font-medium text-[#1F2937]">{weeklyGoal} activities</span>
              </div>
            </div>

            {completedToday >= weeklyGoal && (
              <div className="mt-3 text-center">
                <span className="text-[#10B981] font-bold text-sm">🎯 Goal Complete! Amazing work!</span>
              </div>
            )}
          </motion.div>
        </div>


        {/* Activity Categories */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1F2937]">Learning Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { type: 'phonics', icon: '🔤', color: 'from-[#4F46E5] to-[#6366F1]', accent: 'border-[#4F46E5]', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop' },
              { type: 'spelling', icon: '✏️', color: 'from-[#10B981] to-[#14B8A6]', accent: 'border-[#10B981]', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop' },
              { type: 'reading', icon: '📚', color: 'from-[#F59E0B] to-[#F97316]', accent: 'border-[#F59E0B]', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' },
              { type: 'comprehension', icon: '🧩', color: 'from-[#3B82F6] to-[#2563EB]', accent: 'border-[#3B82F6]', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop' }
            ].map((category) => (
              <Link
                key={category.type}
                href={`/activities?type=${category.type}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
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
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#1F2937] capitalize mb-1">{category.type}</h3>
                    <p className="text-sm text-[#6B7280]">Interactive exercises</p>
                    <div className={`mt-3 w-12 h-0.5 ${category.accent.replace('border-', 'bg-')} rounded-full`}></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Continue Learning & Recent Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Continue Learning */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm"
            variants={itemVariants}
          >
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#1F2937]">Continue Learning</h2>
                  <p className="text-sm text-[#6B7280]">Pick up where you left off</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {childActivities.slice(0, 4).map((activity) => {
                  const completedActivity = todayActivities.find(a => a.id === activity.id);
                  const completedPercentage = completedActivity?.completed ? 100 : Math.random() > 0.7 ? Math.floor(Math.random() * 80) : 0;

                  return (
                    <div key={activity.id} className="group">
                      <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] hover:from-[#F1F5F9] hover:to-[#E0E7FF] border border-gray-100 hover:border-gray-200 rounded-lg transition-all duration-300 overflow-hidden shadow-sm">
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {activity.type === 'phonics' ? '🔤' :
                                  activity.type === 'spelling' ? '✏️' :
                                    activity.type === 'reading' ? '📚' : '🧩'}
                              </span>
                              <div>
                                <h3 className="font-medium text-[#1F2937] text-sm">{activity.title}</h3>
                                <p className="text-xs text-[#6B7280] capitalize">{activity.type} • {activity.difficulty}</p>
                              </div>
                            </div>
                            {(activity.id === 'act-001' || activity.id === 'act-008') && (
                              <span className="bg-[#F59E0B] text-white text-xs px-2 py-1 rounded-full font-medium">
                                New
                              </span>
                            )}
                          </div>

                          {activity.description && (
                            <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{activity.description}</p>
                          )}

                          {completedPercentage > 0 && (
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-[#6B7280]">Progress</span>
                                <span className="text-xs font-medium text-[#1F2937]">{completedPercentage}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#10B981] to-[#14B8A6] rounded-full transition-all duration-300"
                                  style={{ width: `${completedPercentage}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <Link
                            href={`/activities/${activity.id}`}
                            className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-[#4F46E5] hover:text-white hover:bg-[#4F46E5] border border-[#4F46E5] rounded-md transition-all duration-200"
                          >
                            {completedPercentage === 100 ? 'Review' : completedPercentage > 0 ? 'Continue' : 'Start'}
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/activities"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#4F46E5] font-medium rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                >
                  View All Activities
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 p-6 rounded-2xl shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=40&h=40&fit=crop"
                alt="Achievements"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-[#1F2937]">Latest Badges</h2>
            </div>

            <div className="space-y-3">
              {recentBadges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-medium text-[#1F2937] text-sm">{badge.title}</p>
                    <p className="text-xs text-[#6B7280]">{badge.earnedOn.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}

              {recentBadges.length === 0 && (
                <div className="text-center py-8">
                  <Image
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop"
                    alt="No badges yet"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mx-auto mb-3 opacity-50"
                  />
                  <p className="text-[#6B7280] text-sm">Complete activities to earn your first badge!</p>
                </div>
              )}
            </div>

            <Link
              href="/achievements"
              className="block mt-4 text-center text-[#4F46E5] hover:text-[#4338CA] text-sm font-medium"
            >
              View All Achievements →
            </Link>
          </motion.div>
        </div>

        {/* Learning Streak & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Streak */}
          <motion.div
            className="bg-gradient-to-br from-[#4F46E5] to-[#6366F1] border border-[#86EFAC] p-6 rounded-2xl shadow-sm text-white"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <Image
                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=80&h=80&fit=crop"
                alt="Fire streak"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-bold mb-1">{currentStreak} Day Streak! 🔥</h3>
                <p className="opacity-90">You&apos;re on fire! Keep learning every day.</p>
                <p className="text-sm opacity-75 mt-1">Next milestone: 10 days</p>
              </div>
            </div>
          </motion.div>

          {/* Parent Connection */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 p-6 rounded-2xl shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <Image
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=80&h=80&fit=crop"
                alt="Parent message"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-1">Message from Mom 💕</h3>
                <p className="text-[#6B7280] text-sm">&quot;Great job on your reading today! I&apos;m so proud of you!&quot;</p>
                <button className="mt-2 text-[#4F46E5] text-xs font-medium hover:text-[#4338CA]">
                  Send a message back →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}