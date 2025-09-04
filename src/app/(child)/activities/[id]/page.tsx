"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AudioButton from '@/components/ui/AudioButton';
import { useTTS } from '@/hooks/useTTS';
import { childActivities, Activity } from '@/lib/childActivities';
import Image from 'next/image';

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { speakWithHighlight } = useTTS();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [readDescription, setReadDescription] = useState(false);

  const id = typeof params.id === 'string' ? params.id : '';

  // Fetch activity data
  useEffect(() => {
    if (id) {
      const activityData = childActivities.find(act => act.id === id);
      setActivity(activityData || null);
      setLoading(false);
    }
  }, [id]);

  // Auto-read description when page first loads
  useEffect(() => {
    if (activity && !readDescription) {
      setTimeout(() => {
        speakWithHighlight(activity.description, 'activity-description');
        setReadDescription(true);
      }, 1000);
    }
  }, [activity, readDescription, speakWithHighlight]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#4F46E5] border-t-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-[#4F46E5]">Loading activity...</p>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!activity) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-md w-full p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-6 text-5xl"
          >
            😢
          </motion.div>
          <h1 className="text-2xl font-semibold text-[#EF4444] mb-4">Activity Not Found</h1>
          <p className="mb-6 text-[#6B7280]">We couldn&apos;t find the activity you&apos;re looking for.</p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Get difficulty label
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { text: 'Easy', color: 'bg-green-100 text-green-800' };
      case 'intermediate':
        return { text: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
      case 'advanced':
        return { text: 'Hard', color: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const difficultyInfo = getDifficultyLabel(activity.difficulty);

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phonics': return '🔤';
      case 'spelling': return '✏️';
      case 'reading': return '📚';
      case 'comprehension': return '🧩';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 md:px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#4F46E5] hover:text-[#4338CA] transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Activities
          </button>
        </div>

        {/* Activity card */}
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {/* Activity header with image */}
          {activity.thumbnailUrl && (
            <div className="h-56 md:h-72 w-full relative">
              <Image
                src={activity.thumbnailUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(activity.type)}</span>
                    <span className="text-sm font-medium text-gray-800 capitalize">{activity.type}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/20 ${difficultyInfo.color.replace('bg-', 'bg-white/90 ').replace('text-', 'text-')}`}>
                  {difficultyInfo.text}
                </span>
              </div>
            </div>
          )}

          {/* Activity content */}
          <div className="p-6 md:p-8">
            <div className="border-b border-gray-100 pb-6 mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#1F2937] mb-3">{activity.title}</h1>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.durationMinutes || 15} minutes
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {difficultyInfo.text} Level
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-[#1F2937]">About This Activity</h2>
                <AudioButton
                  text={activity.description}
                  size="small"
                  variant="ghost"
                  className="ml-auto"
                />
              </div>
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-4">
                <p
                  id="activity-description"
                  className="text-[#374151] leading-relaxed"
                >
                  {activity.description}
                </p>
              </div>
            </div>

            {/* Activity info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] border border-[#C7D2FE] p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#4F46E5] rounded-md flex items-center justify-center">
                    <span className="text-white text-sm">{getTypeIcon(activity.type)}</span>
                  </div>
                  <p className="text-sm font-medium text-[#4F46E5]">Activity Type</p>
                </div>
                <p className="text-lg font-semibold text-[#1F2937] capitalize">{activity.type}</p>
              </div>

              <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] border border-[#D8B4FE] p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#7C3AED] rounded-md flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#7C3AED]">Estimated Time</p>
                </div>
                <p className="text-lg font-semibold text-[#1F2937]">
                  {activity.durationMinutes || 15} minutes
                </p>
              </div>
            </div>

            {/* Start button */}
            <Link
              href={`/activities/${activity.id}/play`}
              className="w-full py-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold text-lg rounded-lg flex items-center justify-center hover:shadow-lg hover:from-[#4338CA] hover:to-[#6D28D9] transition-all duration-200 border border-transparent"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Learning
              <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related activities */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
            <h2 className="text-xl font-semibold text-[#1F2937]">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {childActivities
              .filter(a => a.id !== activity.id && a.type === activity.type)
              .slice(0, 3)
              .map(relatedActivity => {
                const relatedDifficultyInfo = getDifficultyLabel(relatedActivity.difficulty);
                return (
                  <motion.div
                    key={relatedActivity.id}
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <Link
                      href={`/activities/${relatedActivity.id}`}
                      className="block bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 hover:border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getTypeIcon(relatedActivity.type)}</span>
                            <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-1 rounded-full capitalize">
                              {relatedActivity.type}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${relatedDifficultyInfo.color}`}>
                            {relatedDifficultyInfo.text}
                          </span>
                        </div>

                        <h3 className="font-semibold text-[#1F2937] mb-2 group-hover:text-[#4F46E5] transition-colors">
                          {relatedActivity.title}
                        </h3>

                        <p className="text-sm text-[#6B7280] mb-4 line-clamp-2 leading-relaxed">
                          {relatedActivity.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {relatedActivity.durationMinutes || 15} min
                          </div>
                          <div className="flex items-center text-[#4F46E5] text-sm font-medium group-hover:text-[#4338CA]">
                            View
                            <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>

          {childActivities.filter(a => a.id !== activity.id && a.type === activity.type).length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-[#6B7280]">No similar activities found</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}