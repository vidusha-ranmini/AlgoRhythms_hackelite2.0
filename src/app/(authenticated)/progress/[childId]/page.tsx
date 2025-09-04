"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProgressChart from '@/components/charts/ProgressChart';
import ActivityHistoryChart from '@/components/charts/ActivityHistoryChart';

// Define the Child type
interface Child {
  id: number;
  name: string;
  age: number;
  avatar: string;
  level: number;
  progress: number;
}

// Dummy data for child profiles
const CHILDREN_MAP: Record<string, Child> = {
  "1": {
    id: 1,
    name: "Emma",
    age: 8,
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    level: 3,
    progress: 78
  },
  "2": {
    id: 2,
    name: "Shenaya",
    age: 7,
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
    level: 2,
    progress: 65
  },
  "3": {
    id: 3,
    name: "Olivia",
    age: 9,
    avatar: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face",
    level: 4,
    progress: 92
  }
};

// Dummy data for progress charts
const PROGRESS_DATA = [
  { date: "Week 1", phonics: 45, spelling: 30, reading: 20, comprehension: 15 },
  { date: "Week 2", phonics: 52, spelling: 35, reading: 25, comprehension: 22 },
  { date: "Week 3", phonics: 60, spelling: 42, reading: 35, comprehension: 28 },
  { date: "Week 4", phonics: 65, spelling: 48, reading: 42, comprehension: 34 },
  { date: "Week 5", phonics: 72, spelling: 55, reading: 48, comprehension: 40 },
  { date: "Week 6", phonics: 78, spelling: 65, reading: 55, comprehension: 45 }
];

// Dummy data for activity history
const ACTIVITY_HISTORY_DATA = [
  { period: "Week 1", Phonics: 5, Spelling: 3, Reading: 2, Comprehension: 1 },
  { period: "Week 2", Phonics: 4, Spelling: 4, Reading: 3, Comprehension: 2 },
  { period: "Week 3", Phonics: 7, Spelling: 3, Reading: 4, Comprehension: 2 },
  { period: "Week 4", Phonics: 6, Spelling: 5, Reading: 4, Comprehension: 3 }
];

// Dummy data for weekly stats
const WEEKLY_STATS = {
  totalActivities: 18,
  totalTimeSpent: "4h 35m",
  correctAnswers: 82,
  skillImprovement: "+12%"
};

export default function ProgressPage() {
  const params = useParams();
  const childId = params.childId as string;
  
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("6weeks");
  
  const child = CHILDREN_MAP[childId];
  
  if (!child) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Child Not Found</h1>
          <p className="mb-6">Sorry, this child profile doesn&apos;t exist.</p>
          <Link 
            href="/children" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Back to Children
          </Link>
        </div>
      </div>
    );
  }

  // Filter data based on selected skill
  const chartData =
    selectedSkill === 'all'
      ? PROGRESS_DATA.map(item => ({
          ...item,
          value: 0 // Provide a dummy value for 'all', or adjust ProgressChart to not require 'value' for multi-skill
        }))
      : PROGRESS_DATA.map(item => ({
          date: item.date,
          value: item[selectedSkill as keyof typeof item] as number
        }));

  // Activity history colors
  const activityColors = {
    Phonics: "#4f46e5", // indigo
    Spelling: "#9333ea", // purple
    Reading: "#16a34a", // green
    Comprehension: "#eab308" // yellow
  };
  
  // Progress chart colors
  const progressColors = ["#4f46e5", "#9333ea", "#16a34a", "#eab308"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="bg-white rounded-full overflow-hidden mr-4 w-12 h-12 flex items-center justify-center">
              <Image
                src={child.avatar} 
                alt={child.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-indigo-800 mb-1">
                {child.name}&apos;s Progress
              </h1>
              <p className="text-indigo-600">Level {child.level} • Overall Progress: {child.progress}%</p>
            </div>
          </div>
          
          <Link 
            href={`/child/${childId}`}
            className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            View Profile
          </Link>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <div className="bg-white rounded-xl shadow-sm px-4 py-2">
              <label htmlFor="skill" className="text-sm text-gray-500 mr-2">Skill:</label>
              <select 
                id="skill"
                className="border-none bg-transparent font-medium text-indigo-700 focus:outline-none"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="all">All Skills</option>
                <option value="phonics">Phonics 🔤</option>
                <option value="spelling">Spelling ✍️</option>
                <option value="reading">Reading 📚</option>
                <option value="comprehension">Comprehension 🧠</option>
              </select>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm px-4 py-2">
              <label htmlFor="range" className="text-sm text-gray-500 mr-2">Range:</label>
              <select 
                id="range"
                className="border-none bg-transparent font-medium text-indigo-700 focus:outline-none"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="4weeks">4 Weeks</option>
                <option value="6weeks">6 Weeks</option>
                <option value="3months">3 Months</option>
              </select>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
            Export Report
          </button>
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <ProgressChart
              data={chartData}
              dataKeys={selectedSkill === 'all' ? ['phonics', 'spelling', 'reading', 'comprehension'] : [selectedSkill]}
              colors={progressColors}
              title="Skill Progress Over Time"
              yAxisLabel="Progress (%)"
              xAxisLabel="Time Period"
            />
          </div>
          
          {/* Activity History Chart */}
          <div>
            <ActivityHistoryChart
              data={ACTIVITY_HISTORY_DATA}
              title="Activities Completed"
              colors={activityColors}
            />
          </div>
          
          {/* Weekly Stats */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-xl">
                <div className="flex items-center mb-1">
                  <div className="bg-indigo-100 p-2 rounded-full mr-2">
                    <span className="text-xl">📊</span>
                  </div>
                  <span className="text-sm text-gray-600">Total Activities</span>
                </div>
                <p className="text-2xl font-bold text-indigo-700">{WEEKLY_STATS.totalActivities}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="flex items-center mb-1">
                  <div className="bg-purple-100 p-2 rounded-full mr-2">
                    <span className="text-xl">⏱️</span>
                  </div>
                  <span className="text-sm text-gray-600">Time Spent</span>
                </div>
                <p className="text-2xl font-bold text-purple-700">{WEEKLY_STATS.totalTimeSpent}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center mb-1">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <span className="text-xl">✅</span>
                  </div>
                  <span className="text-sm text-gray-600">Correct Answers</span>
                </div>
                <p className="text-2xl font-bold text-green-700">{WEEKLY_STATS.correctAnswers}%</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <div className="flex items-center mb-1">
                  <div className="bg-yellow-100 p-2 rounded-full mr-2">
                    <span className="text-xl">📈</span>
                  </div>
                  <span className="text-sm text-gray-600">Improvement</span>
                </div>
                <p className="text-2xl font-bold text-yellow-700">{WEEKLY_STATS.skillImprovement}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skill Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Skill Breakdown</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-700">
                  <span className="mr-2 text-xl">🔤</span>
                  Phonics
                </span>
                <span className="text-sm font-medium text-indigo-700">78%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-700">
                  <span className="mr-2 text-xl">✍️</span>
                  Spelling
                </span>
                <span className="text-sm font-medium text-indigo-700">65%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-700">
                  <span className="mr-2 text-xl">📚</span>
                  Reading
                </span>
                <span className="text-sm font-medium text-indigo-700">55%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: "55%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center text-gray-700">
                  <span className="mr-2 text-xl">🧠</span>
                  Comprehension
                </span>
                <span className="text-sm font-medium text-indigo-700">45%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-yellow-500"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recommendations</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Focus on Comprehension</p>
                <p className="text-gray-600">This is {child.name}&apos;s lowest skill area. Try the &ldquo;Story Time&rdquo; activities to improve comprehension.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Keep up the Phonics Work</p>
                <p className="text-gray-600">Phonics is {child.name}&apos;s strongest area. Continue building on this strength.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            href="/children"
            className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Children
          </Link>
          <div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white border border-indigo-200 text-indigo-700 rounded-xl mr-4 hover:bg-indigo-50 transition-colors"
            >
              Dashboard
            </Link>
            <button 
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              onClick={() => window.print()}
            >
              Print Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}