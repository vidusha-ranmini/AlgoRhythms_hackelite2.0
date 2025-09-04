"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AudioButton from '@/components/ui/AudioButton';
import { childActivities, Activity } from '@/lib/childActivities';
import { childBadges, Badge as BadgeType } from '@/lib/childBadges';
import { useTTS } from '@/hooks/useTTS';

// Simple confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'][i % 7],
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 20, 
            opacity: 0,
            rotate: 360 * 3,
            x: [-20, 20, -20, 20]
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Floating stars animation
const FloatingStars = () => {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-400"
          style={{
            left: `${star.left}%`,
            fontSize: `${star.size}px`,
          }}
          initial={{ y: window.innerHeight + 50, opacity: 0, scale: 0 }}
          animate={{ 
            y: -50, 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: 360
          }}
          transition={{
            duration: 4,
            delay: star.delay,
            ease: "easeOut"
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
};

export default function ActivityCompletePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = typeof params.id === 'string' ? params.id : '';
  
  const score = parseInt(searchParams.get('score') || '0', 10);
  const total = parseInt(searchParams.get('total') || '3', 10);
  
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [earnedBadge, setEarnedBadge] = useState<BadgeType | null>(null);
  const [nextActivity, setNextActivity] = useState<Activity | null>(null);
  const [recommendedActivities, setRecommendedActivities] = useState<Activity[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const { speak, speakSlowly } = useTTS();
  const [hasSpokenResults, setHasSpokenResults] = useState(false);

  // Calculate performance metrics
  const scorePercentage = Math.round((score / total) * 100);
  const stars = scorePercentage >= 90 ? 3 : scorePercentage >= 70 ? 2 : 1;
  
  // Find appropriate badge to award based on activity type and score
  const findBadgeToAward = (activity: Activity, score: number, total: number): BadgeType | null => {
    if (!activity) return null;
    
    const matchingBadges = childBadges.filter(
      badge => badge.category === activity.type && 
      (activity.difficulty === 'advanced' ? badge.level === 3 : 
       activity.difficulty === 'intermediate' ? badge.level === 2 : 
       badge.level === 1)
    );
    
    // Only award badge if score is good enough
    return (score / total >= 0.7) && matchingBadges.length > 0 
      ? matchingBadges[0] 
      : null;
  };

  // Find next activity to suggest
  const findNextActivity = (currentActivity: Activity): Activity | null => {
    const currentIndex = childActivities.findIndex(a => a.id === currentActivity.id);
    return currentIndex < childActivities.length - 1 
      ? childActivities[currentIndex + 1]
      : null;
  };
  
  // Find recommended activities based on current activity type or difficulty
  const findRecommendedActivities = (currentActivity: Activity): Activity[] => {
    return childActivities
      .filter(a => 
        a.id !== currentActivity.id && 
        (a.type === currentActivity.type || a.difficulty === currentActivity.difficulty)
      )
      .slice(0, 2);
  };

  // Fetch activity data
  useEffect(() => {
    if (id) {
      const activityData = childActivities.find(act => act.id === id);
      setActivity(activityData || null);
      
      if (activityData) {
        // Find badge to award
        const badge = findBadgeToAward(activityData, score, total);
        setEarnedBadge(badge);
        
        // Find next activity
        const next = findNextActivity(activityData);
        setNextActivity(next);
        
        // Find recommended activities
        const recommended = findRecommendedActivities(activityData);
        setRecommendedActivities(recommended);
      }
      
      setLoading(false);
      
      // Trigger celebration animation after loading
      setTimeout(() => {
        setShowCelebration(true);
      }, 500);
    }
  }, [id, score, total]);

  // Automatic speaking of results
  useEffect(() => {
    if (activity && !loading && !hasSpokenResults) {
      // Wait for the page to settle before speaking
      setTimeout(() => {
        const scorePercentage = Math.round((score / total) * 100);
        const stars = scorePercentage >= 90 ? 3 : scorePercentage >= 70 ? 2 : 1;
        
        let celebrationMessage = "";
        if (stars === 3) {
          celebrationMessage = "Amazing! You mastered this activity perfectly!";
        } else if (stars === 2) {
          celebrationMessage = "Well done! You did really well on this activity!";
        } else {
          celebrationMessage = "Good job! You completed this activity!";
        }
        
        const scoreMessage = `You scored ${score} out of ${total} points. That's ${scorePercentage} percent!`;
        
        let badgeMessage = "";
        if (earnedBadge) {
          badgeMessage = ` Congratulations! You've earned the ${earnedBadge.title} badge!`;
        }
        
        const fullMessage = `${celebrationMessage} ${scoreMessage}${badgeMessage}`;
        
        // Speak the results with a slight delay to allow animations to start
        speakSlowly(fullMessage);
        setHasSpokenResults(true);
      }, 1200); // Delay to allow celebration animations to start
    }
  }, [activity, loading, hasSpokenResults, score, total, earnedBadge, speak, speakSlowly]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div 
            className="w-16 h-16 border-4 border-indigo-400 border-t-indigo-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="mt-4 text-xl font-medium text-indigo-700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading your results...
          </motion.p>
        </div>
      </div>
    );
  }

  // Show error state if activity not found
  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <motion.div 
            className="mb-6 text-5xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            😢
          </motion.div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Activity Not Found</h1>
          <p className="mb-6 text-gray-600">Sorry, we couldn&apos;t find this activity.</p>
          <Link 
            href="/child-dashboard" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Success feedback messages based on performance
  const celebrationEmoji = stars === 3 ? '🎉' : stars === 2 ? '🌟' : '👍';
  const celebrationTitle = stars === 3 ? 'Amazing!' : stars === 2 ? 'Well Done!' : 'Good Job!';
  const celebrationMessage = stars === 3 
    ? "You mastered this activity perfectly!" 
    : stars === 2 
      ? "You did really well on this activity!" 
      : "You completed this activity!";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      {/* Celebration animations */}
      {showCelebration && stars >= 2 && <Confetti />}
      {showCelebration && stars >= 3 && <FloatingStars />}
      
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Success header */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-8"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="text-6xl mb-4 text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                type: "spring",
                stiffness: 200
              }}
            >
              {celebrationEmoji}
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold mb-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {celebrationTitle}
            </motion.h1>
            
            <motion.p 
              className="text-center text-indigo-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {celebrationMessage}
            </motion.p>
          </motion.div>
          
          {/* Score summary */}
          <motion.div 
            className="p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="mb-8 text-center">
              <motion.div 
                className="flex justify-center gap-2 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                {[1, 2, 3].map((star) => (
                  <motion.div
                    key={star}
                    className={`text-4xl ${star <= stars ? 'text-yellow-400' : 'text-gray-300'}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.3 + (star * 0.1),
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    ⭐
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.p 
                className="text-gray-700 text-lg mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                Your score: <span className="font-bold">{score} out of {total}</span> ({scorePercentage}%)
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <AudioButton 
                  text={`Great job! You scored ${score} out of ${total} points. That's ${scorePercentage} percent!`} 
                  variant="ghost" 
                  size="medium"
                  className="mx-auto"
                />
              </motion.div>
            </div>
            
            {/* Activity summary */}
            <motion.div 
              className="mb-8 bg-indigo-50 p-6 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              <h2 className="font-bold text-lg text-indigo-800 mb-3 flex items-center">
                <span className="mr-2">📝</span>
                What you learned
              </h2>
              <ul className="text-gray-700 space-y-2">
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 2.2 }}
                >
                  <span className="text-indigo-600 mr-2">✓</span>
                  Practice with {activity.type.toLowerCase()} skills
                </motion.li>
                {activity.type === 'phonics' && (
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.3 }}
                  >
                    <span className="text-indigo-600 mr-2">✓</span>
                    Recognizing letter sounds and patterns
                  </motion.li>
                )}
                {activity.type === 'spelling' && (
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.3 }}
                  >
                    <span className="text-indigo-600 mr-2">✓</span>
                    Writing and spelling common words correctly
                  </motion.li>
                )}
                {activity.type === 'reading' && (
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 2.3 }}
                  >
                    <span className="text-indigo-600 mr-2">✓</span>
                    Reading fluency and comprehension
                  </motion.li>
                )}
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 2.4 }}
                >
                  <span className="text-indigo-600 mr-2">✓</span>
                  {stars === 3 ? 'Mastered' : stars === 2 ? 'Advanced skills in' : 'Improved skills in'} {activity.difficulty} level concepts
                </motion.li>
              </ul>
              
              <motion.div 
                className="mt-4 bg-white rounded-lg p-3 border border-indigo-100 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.6 }}
              >
                <p className="text-indigo-700 font-medium">
                  {stars === 3 
                    ? "You mastered this activity! Great job!" 
                    : stars === 2 
                      ? "You're doing really well! Keep practicing." 
                      : "Good start! Try again to improve your score."}
                </p>
              </motion.div>
            </motion.div>
            
            {/* Badge award */}
            {earnedBadge && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 2.8,
                  type: "spring",
                  stiffness: 150
                }}
              >
                <div className="bg-gradient-to-r from-amber-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 text-center">
                  <motion.h2 
                    className="font-bold text-amber-800 mb-4 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="mr-2">🏆</span>
                    You&apos;ve earned a badge!
                  </motion.h2>
                  <motion.div 
                    className="flex justify-center mb-4"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge
                      text={earnedBadge.title}
                      icon={earnedBadge.icon}
                      category={earnedBadge.category}
                      type="reward"
                      size="large"
                    />
                  </motion.div>
                  <p className="text-amber-700 text-sm">{earnedBadge.description}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* What to do next section */}
        <motion.div 
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.0 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2 text-indigo-500">⚡</span>
            What would you like to do next?
          </h2>
          
          <div className="space-y-6">
            {/* Option 1: Retry activity */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 3.2 }}
            >
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 text-xl">
                🔄
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800 mb-1">Try again</h3>
                <p className="text-gray-600 text-sm mb-2">Want to improve your score? Try this activity again!</p>
              </div>
              <Link
                href={`/activities/${activity.id}/play`}
                className="px-5 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium text-center"
              >
                Retry Activity
              </Link>
            </motion.div>
            
            {/* Option 2: Next activity */}
            {nextActivity && (
              <motion.div 
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-purple-50 rounded-xl transition-colors border border-transparent hover:border-purple-100"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 3.4 }}
              >
                <div className="bg-purple-100 p-3 rounded-full text-purple-600 text-xl">
                  ➡️
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800 mb-1">Continue learning</h3>
                  <p className="text-gray-600 text-sm mb-2">Move on to the next activity: <span className="font-medium">{nextActivity.title}</span></p>
                </div>
                <Link
                  href={`/activities/${nextActivity.id}`}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-medium text-center"
                >
                  Next Activity
                </Link>
              </motion.div>
            )}
            
            {/* Option 3: Dashboard */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 3.6 }}
            >
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">
                🏠
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800 mb-1">Back to dashboard</h3>
                <p className="text-gray-600 text-sm mb-2">Return to your dashboard to see all available activities</p>
              </div>
              <Link
                href="/child-dashboard"
                className="px-5 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-center"
              >
                Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Progress summary */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-lg p-8 mb-8 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Your Progress
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 4.0 }}
            >
              <p className="text-indigo-100 mb-1">Activities Completed</p>
              <p className="text-3xl font-bold">
                {Math.floor(Math.random() * 5) + 3}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 4.1 }}
            >
              <p className="text-indigo-100 mb-1">Current Streak</p>
              <p className="text-3xl font-bold">
                {Math.floor(Math.random() * 3) + 1} days
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 4.2 }}
            >
              <p className="text-indigo-100 mb-1">Points Earned</p>
              <p className="text-3xl font-bold">
                {score * 10}
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 4.3 }}
          >
            <div className="flex justify-between mb-1">
              <span>Overall Progress</span>
              <span className="font-bold">
                {38 + Math.floor(Math.random() * 10)}%
              </span>
            </div>
            <div className="h-3 bg-indigo-200/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full" 
                initial={{ width: "0%" }}
                animate={{ width: "42%" }}
                transition={{ duration: 1, delay: 4.5 }}
              />
            </div>
            <p className="text-indigo-100 text-sm mt-2">
              Keep going! Complete more activities to level up.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Recommended activities */}
        {recommendedActivities.length > 0 && (
          <motion.div 
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">✨</span>
              You might also like
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedActivities.map((recActivity, index) => (
                <motion.div
                  key={recActivity.id}
                  className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 4.9 + (index * 0.1) }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      {recActivity.type === 'phonics' ? '🔤' : 
                       recActivity.type === 'spelling' ? '✏️' : 
                       recActivity.type === 'reading' ? '📚' : '📝'}
                    </div>
                    <h3 className="font-bold text-gray-800">{recActivity.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recActivity.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      recActivity.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      recActivity.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {recActivity.difficulty}
                    </span>
                    
                    <Link
                      href={`/activities/${recActivity.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      Start Activity
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Share results */}
        <motion.div 
          className="bg-white rounded-3xl shadow-lg p-8 mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 5.1 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Share your achievement!</h2>
          <p className="text-gray-600 mb-6">Let others know about your progress</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Facebook', 'Twitter', 'WhatsApp', 'Email'].map((platform, index) => (
              <motion.button 
                key={platform}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
                  platform === 'Facebook' ? 'bg-blue-500 hover:bg-blue-600' :
                  platform === 'Twitter' ? 'bg-sky-400 hover:bg-sky-500' :
                  platform === 'WhatsApp' ? 'bg-green-500 hover:bg-green-600' :
                  'bg-gray-800 hover:bg-gray-900'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 5.3 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{platform}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}