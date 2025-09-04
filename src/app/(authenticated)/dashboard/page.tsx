"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Dummy data for dashboard stats
const DASHBOARD_STATS = {
  totalChildren: 3,
  totalActivities: 24,
  completedActivities: 18,
  averageProgress: 72,
};

export default function ParentDashboard() {
  const userName = "Kasun"; // This should come from your user context or state

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-[#6B7280] text-lg">Let&apos;s continue your child&apos;s reading journey</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Children Count */}
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl text-white">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-[#6B7280] font-medium">Total Children</h3>
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">{DASHBOARD_STATS.totalChildren}</p>
          </div>

          {/* Total Activities */}
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#14B8A6] rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl text-white">📚</span>
              </div>
              <h3 className="text-[#6B7280] font-medium">Total Activities</h3>
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">{DASHBOARD_STATS.totalActivities}</p>
          </div>

          {/* Completed Activities */}
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl text-white">✅</span>
              </div>
              <h3 className="text-[#6B7280] font-medium">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">{DASHBOARD_STATS.completedActivities}</p>
          </div>

          {/* Average Progress */}
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl text-white">📈</span>
              </div>
              <h3 className="text-[#6B7280] font-medium">Avg. Progress</h3>
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">{DASHBOARD_STATS.averageProgress}%</p>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-8 rounded-xl shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1F2937]">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/children" className="block p-6 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl text-white">👪</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">View Children</h3>
                  <p className="text-sm text-[#6B7280]">Manage profiles and progress</p>
                </div>
              </div>
            </Link>

            <Link href="/psychologists" className="block p-6 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#14B8A6] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl text-white">🧠</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">Psychologists</h3>
                  <p className="text-sm text-[#6B7280]">Find learning specialists</p>
                </div>
              </div>
            </Link>

            <Link href="#" className="block p-6 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl text-white">⚙️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-1">Settings</h3>
                  <p className="text-sm text-[#6B7280]">Account and preferences</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-8 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1F2937]">Recent Activity</h2>
          </div>

          <div className="space-y-6">
            {[
              { child: "Emma", activity: "Completed 'Beginning Sounds'", time: "2 hours ago", icon: "📚", color: "from-[#3B82F6] to-[#1D4ED8]" },
              { child: "Shenaya", activity: "Started 'CVC Words'", time: "Yesterday", icon: "✍️", color: "from-[#10B981] to-[#14B8A6]" },
              { child: "Olivia", activity: "Took reading assessment", time: "2 days ago", icon: "📝", color: "from-[#F59E0B] to-[#F97316]" }
            ].map((item, index) => (
              <div key={index} className="flex items-center p-6 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-white text-xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1F2937]">
                    {item.child} <span className="font-medium text-[#6B7280]">{item.activity}</span>
                  </p>
                  <p className="text-sm text-[#6B7280]">{item.time}</p>
                </div>
                <Link
                  href={`/child/${index + 1}`}
                  className="px-4 py-2 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white text-sm rounded-lg hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  View
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/children"
              className="px-8 py-4 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center font-semibold"
            >
              View All Children
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}