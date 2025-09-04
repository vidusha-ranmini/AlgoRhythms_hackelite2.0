"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import { CHILD } from '@/lib/constants';
import { getRecentBadges } from '@/lib/childBadges';

export default function ProgressPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');

  // Mock progress data
  const progressData = {
    currentLevel: CHILD.level,
    currentProgress: CHILD.progress,
    totalStars: CHILD.totalStars,
    totalActivities: 45,
    completedActivities: 32,
    weeklyStreak: 7,
    longestStreak: 12,
    timeSpent: 180, // minutes this week

    // Activity breakdown by type
    activityStats: {
      phonics: { completed: 8, total: 12, accuracy: 85 },
      spelling: { completed: 6, total: 10, accuracy: 92 },
      reading: { completed: 12, total: 15, accuracy: 88 },
      comprehension: { completed: 6, total: 8, accuracy: 90 }
    },

    // Weekly progress data
    weeklyData: [
      { day: 'Mon', activities: 2, stars: 15, timeSpent: 25 },
      { day: 'Tue', activities: 1, stars: 8, timeSpent: 15 },
      { day: 'Wed', activities: 3, stars: 22, timeSpent: 35 },
      { day: 'Thu', activities: 2, stars: 18, timeSpent: 30 },
      { day: 'Fri', activities: 1, stars: 12, timeSpent: 20 },
      { day: 'Sat', activities: 3, stars: 25, timeSpent: 40 },
      { day: 'Sun', activities: 2, stars: 16, timeSpent: 15 }
    ],

    // Level milestones
    levelMilestones: [
      { level: 1, unlockedAt: new Date('2025-05-01'), badge: 'First Steps' },
      { level: 2, unlockedAt: new Date('2025-05-15'), badge: 'Rising Star' },
      { level: 3, unlockedAt: new Date('2025-06-01'), badge: 'Learning Hero' },
      { level: 4, unlockedAt: null, badge: 'Reading Master' }, // Future level
    ]
  };

  // Calculate completion percentage
  const completionPercentage = Math.round((progressData.completedActivities / progressData.totalActivities) * 100);

  // Get recent badges
  const recentBadges = getRecentBadges().slice(0, 6);

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
              <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-2">My Learning Journey 🌟</h1>
              <p className="text-[#6B7280] text-lg">Track your progress and celebrate your achievements, {CHILD.name}!</p>
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

        {/* Level Progress & Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Level Progress */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#1F2937]">Level {progressData.currentLevel}</h2>
                <p className="text-[#6B7280]">Your Learning Level</p>
              </div>
            </div>

            <ProgressBar
              progress={progressData.currentProgress}
              level={progressData.currentLevel}
              theme="rainbow"
              animate={true}
            />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-lg">
                <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">⭐</span>
                </div>
                <div className="text-2xl font-bold text-[#1F2937]">{progressData.totalStars}</div>
                <div className="text-sm text-[#92400E]">Total Stars</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-lg">
                <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">📚</span>
                </div>
                <div className="text-2xl font-bold text-[#1F2937]">{progressData.completedActivities}</div>
                <div className="text-sm text-[#065F46]">Activities Done</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] rounded-lg">
                <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">🔥</span>
                </div>
                <div className="text-2xl font-bold text-[#1F2937]">{progressData.weeklyStreak}</div>
                <div className="text-sm text-[#5B21B6]">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-lg">
                <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">⏰</span>
                </div>
                <div className="text-2xl font-bold text-[#1F2937]">{Math.round(progressData.timeSpent / 60)}h</div>
                <div className="text-sm text-[#1E3A8A]">This Week</div>
              </div>
            </div>
          </motion.div>

          {/* Achievement Summary */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">🏆</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1F2937] mb-2">Amazing Progress!</h3>
              <div className="text-4xl font-bold text-[#4F46E5] mb-1">{completionPercentage}%</div>
              <p className="text-[#6B7280] text-sm mb-4">Activities Completed</p>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-[#6B7280]">Next milestone at 75%</p>
                <p className="text-xs text-[#9CA3AF]">Keep going, you&apos;re doing great!</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Activity Categories Progress */}
        <motion.div
          className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6 mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1F2937]">Skills Progress</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(progressData.activityStats).map(([type, stats]) => {
              const percentage = Math.round((stats.completed / stats.total) * 100);
              const colors = {
                phonics: { bg: 'from-[#4F46E5] to-[#6366F1]', icon: '🔤', border: 'border-[#C7D2FE]', text: 'text-[#4F46E5]' },
                spelling: { bg: 'from-[#10B981] to-[#14B8A6]', icon: '✏️', border: 'border-[#86EFAC]', text: 'text-[#10B981]' },
                reading: { bg: 'from-[#F59E0B] to-[#F97316]', icon: '📚', border: 'border-[#FCD34D]', text: 'text-[#F59E0B]' },
                comprehension: { bg: 'from-[#3B82F6] to-[#2563EB]', icon: '🧩', border: 'border-[#93C5FD]', text: 'text-[#3B82F6]' }
              };

              return (
                <div key={type} className={`text-center p-5 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] rounded-lg shadow-sm`}>
                  <div className={`bg-gradient-to-br ${colors[type as keyof typeof colors].bg} w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <span className="text-2xl text-white">{colors[type as keyof typeof colors].icon}</span>
                  </div>
                  <h3 className="font-semibold text-[#1F2937] capitalize mb-3">{type}</h3>

                  {/* Progress Circle */}
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                      <circle
                        cx="32" cy="32" r="28" fill="none"
                        stroke={type === 'phonics' ? '#4F46E5' : type === 'spelling' ? '#10B981' : type === 'reading' ? '#F59E0B' : '#3B82F6'}
                        strokeWidth="4"
                        strokeDasharray={`${percentage * 1.76} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#1F2937]">{percentage}%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-[#6B7280]">{stats.completed}/{stats.total} activities</div>
                    <div className={`text-sm font-medium ${colors[type as keyof typeof colors].text}`}>{stats.accuracy}% accuracy</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Activity Chart */}
        <motion.div
          className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6 mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937]">This Week&apos;s Activity</h2>
                <p className="text-sm text-[#6B7280]">Daily learning progress</p>
              </div>
            </div>

            <div className="flex gap-2">
              {['week', 'month', 'all'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe as 'week' | 'month' | 'all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
                    ${selectedTimeframe === timeframe
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-sm border border-[#C7D2FE]'
                      : 'bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] text-[#6B7280] hover:from-[#F1F5F9] hover:to-[#E0E7FF] border border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-4">
            <div className="flex items-end gap-2 h-40 px-4">
              {progressData.weeklyData.map((day) => {
                const maxActivities = Math.max(...progressData.weeklyData.map(d => d.activities));
                const height = (day.activities / maxActivities) * 100;

                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-[#4F46E5] to-[#7C3AED] rounded-t-lg transition-all duration-500 flex items-end justify-center pb-1"
                      style={{ height: `${height}%`, minHeight: day.activities > 0 ? '20px' : '0' }}
                    >
                      {day.activities > 0 && (
                        <span className="text-white text-xs font-bold">{day.activities}</span>
                      )}
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#1F2937]">{day.day}</div>
                    <div className="text-xs text-[#6B7280]">{day.stars}⭐</div>
                  </div>
                );
              })}
            </div>

            <div className="text-center text-sm text-[#6B7280]">
              Activities completed each day
            </div>
          </div>
        </motion.div>

        {/* Level Journey & Recent Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Level Journey */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1F2937]">Level Journey</h2>
                <p className="text-sm text-[#6B7280]">Your learning milestones</p>
              </div>
            </div>

            <div className="space-y-4">
              {progressData.levelMilestones.map((milestone) => (
                <div key={milestone.level} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white border-2
                    ${milestone.unlockedAt
                      ? 'bg-[#10B981] border-[#10B981]'
                      : milestone.level === progressData.currentLevel
                        ? 'bg-[#F59E0B] border-[#F59E0B]'
                        : 'bg-[#E5E7EB] border-[#E5E7EB] text-[#6B7280]'
                    }`}>
                    {milestone.level}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#1F2937]">Level {milestone.level}</span>
                      {milestone.unlockedAt && <span className="text-[#10B981]">✓</span>}
                      {milestone.level === progressData.currentLevel && <span className="text-[#F59E0B]">⭐</span>}
                    </div>
                    <div className="text-sm text-[#6B7280]">{milestone.badge}</div>
                    {milestone.unlockedAt && (
                      <div className="text-xs text-[#9CA3AF]">
                        Unlocked {milestone.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Badges */}
          <motion.div
            className="bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF] border border-gray-100 rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#1F2937]">Recent Badges</h2>
                  <p className="text-sm text-[#6B7280]">Latest achievements</p>
                </div>
              </div>

              <Link
                href="/achievements"
                className="text-[#4F46E5] hover:text-[#4338CA] text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {recentBadges.map(badge => (
                <div key={badge.id} className="p-3 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-lg text-center hover:bg-[#F1F5F9] transition-colors shadow-sm">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-sm font-medium text-[#1F2937]">{badge.title}</div>
                  <div className="text-xs text-[#6B7280]">{badge.earnedOn.toLocaleDateString()}</div>
                </div>
              ))}

              {recentBadges.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="text-[#6B7280] text-sm">Complete more activities to earn badges!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Motivational Section */}
        <motion.div
          className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm p-8 text-center"
          variants={itemVariants}
        >
          <div className="w-24 h-24 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl text-white">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">You&apos;re Doing Amazing! 🎉</h2>
          <p className="text-lg text-[#6B7280] mb-6 max-w-2xl mx-auto">
            You&apos;ve completed {progressData.completedActivities} activities and earned {progressData.totalStars} stars!
            Keep up the fantastic work on your learning journey.
          </p>
          <div className="flex items-center justify-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <span className="text-[#6B7280]">{progressData.weeklyStreak}-day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
              <span className="text-[#6B7280]">Level {progressData.currentLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
              <span className="text-[#6B7280]">{completionPercentage}% complete</span>
            </div>
          </div>

          <Link
            href="/activities"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Continue Learning
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}