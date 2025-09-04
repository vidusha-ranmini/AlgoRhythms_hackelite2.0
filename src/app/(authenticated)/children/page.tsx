// filepath: d:\Readle\src\app\(authenticated)\children\page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dummy data for children
const CHILDREN = [
  {
    id: 1,
    name: "Emma",
    age: 8,
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    progress: 78,
    level: 3,
    lastActivity: "Beginning Sounds",
    completedActivities: 12
  },
  {
    id: 2,
    name: "Shenaya",
    age: 7,
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
    progress: 65,
    level: 2,
    lastActivity: "CVC Words",
    completedActivities: 8
  },
  {
    id: 3,
    name: "Olivia",
    age: 9,
    avatar: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face",
    progress: 92,
    level: 4,
    lastActivity: "Simple Sentences",
    completedActivities: 15
  }
];

export default function ChildrenPage() {
  const [sortBy, setSortBy] = useState<'name' | 'progress'>('name');

  // Sort children based on selected sort option
  const sortedChildren = [...CHILDREN].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return b.progress - a.progress;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-8 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1F2937] mb-2 flex items-center gap-3">
                👨‍👩‍👧‍👦 Your Children
              </h1>
              <p className="text-lg text-[#6B7280]">Manage profiles and view reading progress</p>
            </div>

            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm px-4 py-2">
                <label htmlFor="sort" className="text-sm text-[#6B7280] mr-2">Sort by:</label>
                <select
                  id="sort"
                  className="border-none bg-transparent font-medium text-[#1F2937] focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'progress')}
                >
                  <option value="name">Name</option>
                  <option value="progress">Progress</option>
                </select>
              </div>

              <Link
                href="#"
                className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Child
              </Link>
            </div>
          </div>
        </div>

        {/* Children Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedChildren.map((child) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] p-6 flex items-center">
                <div className="bg-white rounded-full overflow-hidden mr-4 w-16 h-16 flex items-center justify-center border-2 border-white shadow-md">
                  <Image
                    src={child.avatar}
                    alt={child.name}
                    width={60}
                    height={60}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="text-white">
                  <h2 className="text-xl font-bold">{child.name}</h2>
                  <p className="text-blue-100">Age {child.age}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-[#1F2937]">Overall Progress</span>
                    <span className="text-sm font-bold text-[#4F46E5]">{child.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] rounded-full transition-all duration-500"
                      style={{ width: `${child.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-[#6B7280] font-medium">Level</p>
                    <p className="text-xl font-bold text-[#1F2937]">{child.level}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-[#6B7280] font-medium">Activities</p>
                    <p className="text-xl font-bold text-[#1F2937]">{child.completedActivities}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-4 rounded-lg mb-6">
                  <p className="text-sm text-[#6B7280] mb-1">Last Activity:</p>
                  <p className="font-semibold text-[#1F2937]">{child.lastActivity}</p>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/child/${child.id}`}
                    className="flex-1 px-4 py-3 border border-[#4F46E5] text-[#4F46E5] rounded-lg hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#6366F1] hover:text-white transition-all text-center font-semibold"
                  >
                    Profile
                  </Link>
                  <Link
                    href={`/progress/${child.id}`}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white rounded-lg hover:shadow-md transition-all hover:-translate-y-0.5 text-center font-semibold"
                  >
                    Progress
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Child Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border-2 border-dashed border-[#4F46E5]/30 rounded-xl overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 flex items-center justify-center min-h-[300px] cursor-pointer hover:border-[#4F46E5]/50"
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-2">Add New Child</h2>
              <p className="text-[#6B7280] font-medium">Create a new profile</p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between">
          <Link
            href="/dashboard"
            className="flex items-center px-6 py-3 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 text-[#4F46E5] rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5 font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}