"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AudioButton from '@/components/ui/AudioButton';
import Badge from '@/components/ui/Badge';
import { useTTS } from '@/hooks/useTTS';
import { childActivities, Activity } from '@/lib/childActivities';
import Image from 'next/image';

interface GameQuestion {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    imageUrl?: string;
  }[];
  instructions?: string;
}

// Custom PlayArea component without embedded audio buttons
const GamePlayArea: React.FC<{
  question: string;
  options: GameQuestion['options'];
  onComplete: (correct: boolean) => void;
  layout?: 'grid' | 'list';
}> = ({ question, options, onComplete, layout = 'grid' }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (answered) return;

    setSelectedOption(optionId);
    setShowFeedback(true);
    setAnswered(true);

    const isCorrect = options.find(opt => opt.id === optionId)?.isCorrect || false;

    setTimeout(() => {
      onComplete(isCorrect);
    }, 1500);
  };

  const getOptionStyle = (option: GameQuestion['options'][0]) => {
    if (!showFeedback) {
      return "bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-300";
    }

    if (option.id === selectedOption) {
      return option.isCorrect
        ? "bg-green-100 border-2 border-green-400 text-green-800"
        : "bg-red-100 border-2 border-red-400 text-red-800";
    }

    if (option.isCorrect) {
      return "bg-green-100 border-2 border-green-400 text-green-800";
    }

    return "bg-gray-100 border-2 border-gray-300 text-gray-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {question}
        </h2>
      </div>

      {/* Options */}
      <div className={`grid gap-4 ${layout === 'grid' && options.length <= 4
          ? options.length === 2 ? 'grid-cols-1 md:grid-cols-2'
            : options.length === 3 ? 'grid-cols-1 md:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1'
        }`}>
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={answered}
            className={`p-6 rounded-xl transition-all duration-200 ${getOptionStyle(option)} ${answered ? 'cursor-default' : 'cursor-pointer hover:scale-105'
              }`}
            whileHover={!answered ? { scale: 1.02 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
          >
            {option.imageUrl && (
              <div className="mb-4 relative h-32">
                <Image
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full h-full object-cover rounded-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            )}
            <span className="text-lg font-medium">{option.text}</span>

            {showFeedback && option.id === selectedOption && (
              <div className="mt-2">
                {option.isCorrect ? (
                  <span className="text-green-600 text-sm">✓ Correct!</span>
                ) : (
                  <span className="text-red-600 text-sm">✗ Try again next time!</span>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Feedback message */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${options.find(opt => opt.id === selectedOption)?.isCorrect
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}>
            {options.find(opt => opt.id === selectedOption)?.isCorrect ? (
              <>
                <span className="mr-2">🎉</span>
                Great job!
              </>
            ) : (
              <>
                <span className="mr-2">💪</span>
                Keep trying!
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function ActivityPlayPage() {
  const params = useParams();
  const router = useRouter();
  const { speak, speakSlowly } = useTTS();
  const id = typeof params.id === 'string' ? params.id : '';

  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Generate dummy questions based on activity type
  const generateQuestions = (activity: Activity): GameQuestion[] => {
    switch (activity.type) {
      case 'phonics':
        return [
          {
            question: "What sound does 'ball' start with?",
            // instructions: "Listen to each word and choose the correct starting sound.",
            options: [
              { id: "p1-a", text: "B", isCorrect: true },
              { id: "p1-b", text: "P", isCorrect: false },
              { id: "p1-c", text: "D", isCorrect: false },
              { id: "p1-d", text: "T", isCorrect: false }
            ]
          },
          {
            question: "What sound does 'cat' start with?",
            options: [
              { id: "p2-a", text: "K", isCorrect: false },
              { id: "p2-b", text: "C", isCorrect: true },
              { id: "p2-c", text: "S", isCorrect: false },
              { id: "p2-d", text: "T", isCorrect: false }
            ]
          },
          {
            question: "Which word rhymes with 'hat'?",
            options: [
              { id: "p3-a", text: "Hit", isCorrect: false },
              { id: "p3-b", text: "Hot", isCorrect: false },
              { id: "p3-c", text: "Cat", isCorrect: true },
              { id: "p3-d", text: "Hut", isCorrect: false }
            ]
          }
        ];
      case 'spelling':
        return [
          {
            question: "Spell the word: CAT",
            instructions: "Listen to each word and choose the correct spelling.",
            options: [
              { id: "s1-a", text: "CAT", isCorrect: true },
              { id: "s1-b", text: "KAT", isCorrect: false },
              { id: "s1-c", text: "CET", isCorrect: false },
              { id: "s1-d", text: "KET", isCorrect: false }
            ]
          },
          {
            question: "Spell the word: DOG",
            options: [
              { id: "s2-a", text: "DOG", isCorrect: true },
              { id: "s2-b", text: "DAG", isCorrect: false },
              { id: "s2-c", text: "DUG", isCorrect: false },
              { id: "s2-d", text: "DOK", isCorrect: false }
            ]
          },
          {
            question: "Spell the word: FISH",
            options: [
              { id: "s3-a", text: "FISH", isCorrect: true },
              { id: "s3-b", text: "PHISH", isCorrect: false },
              { id: "s3-c", text: "FESH", isCorrect: false },
              { id: "s3-d", text: "PHESH", isCorrect: false }
            ]
          }
        ];
      case 'reading':
        return [
          {
            question: "Read and choose: The cat sat on the...",
            instructions: "Read each sentence and choose the word that completes it correctly.",
            options: [
              { id: "r1-a", text: "mat", isCorrect: true, imageUrl: "https://images.unsplash.com/photo-1589012372673-78a611a3c8d5?w=300&q=80&auto=format" },
              { id: "r1-b", text: "hat", isCorrect: false, imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&q=80&auto=format" },
              { id: "r1-c", text: "bat", isCorrect: false, imageUrl: "https://images.unsplash.com/photo-1521731404615-8c0b6aaabe96?w=300&q=80&auto=format" }
            ]
          },
          {
            question: "What color is the sky?",
            options: [
              { id: "r2-a", text: "Blue", isCorrect: true, imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=300&q=80&auto=format" },
              { id: "r2-b", text: "Green", isCorrect: false, imageUrl: "https://images.unsplash.com/photo-1551444836-22725a5a5a61?w=300&q=80&auto=format" },
              { id: "r2-c", text: "Red", isCorrect: false, imageUrl: "https://images.unsplash.com/photo-1532264523420-888cc4fde11a?w=300&q=80&auto=format" }
            ]
          }
        ];
      case 'comprehension':
      default:
        return [
          {
            question: "The dog ran to the park. The dog played with a ball. What did the dog play with?",
            instructions: "Read the short story and answer the question.",
            options: [
              { id: "c1-a", text: "A bone", isCorrect: false },
              { id: "c1-b", text: "A ball", isCorrect: true },
              { id: "c1-c", text: "A toy", isCorrect: false },
              { id: "c1-d", text: "A stick", isCorrect: false }
            ]
          },
          {
            question: "Sam has a red bike. Tom has a blue bike. What color is Sam's bike?",
            options: [
              { id: "c2-a", text: "Red", isCorrect: true },
              { id: "c2-b", text: "Blue", isCorrect: false },
              { id: "c2-c", text: "Green", isCorrect: false },
              { id: "c2-d", text: "Yellow", isCorrect: false }
            ]
          }
        ];
    }
  };

  const [questions, setQuestions] = useState<GameQuestion[]>([]);

  // Fetch activity data
  useEffect(() => {
    if (id) {
      const activityData = childActivities.find(act => act.id === id);
      setActivity(activityData || null);

      if (activityData) {
        setQuestions(generateQuestions(activityData));
      }

      setLoading(false);
    }
  }, [id]);

  // Auto-read instructions when first question is shown
  useEffect(() => {
    if (gameStarted && questions.length > 0 && currentQuestionIndex === 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion.instructions) {
        setTimeout(() => {
          speakSlowly(currentQuestion.instructions!);
        }, 500);
      }
    }
  }, [gameStarted, questions, currentQuestionIndex, speakSlowly]);

  const handleGameStart = () => {
    setGameStarted(true);
    speak("Let's start the game! Good luck!");
  };

  const handleQuestionComplete = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }

    setQuestionsAnswered(questionsAnswered + 1);

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1000);
    } else {
      // All questions answered - navigate to complete page
      setTimeout(() => {
        router.push(`/activities/${id}/complete?score=${score + (correct ? 1 : 0)}&total=${questions.length}`);
      }, 1500);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-400 border-t-indigo-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-indigo-700">Loading activity...</p>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Activity Not Found</h1>
          <p className="mb-6">Sorry, we couldn&apos;t find this activity.</p>
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

  // Game intro screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6 flex items-center justify-center">
        <motion.div
          className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activity.thumbnailUrl && (
            <div className="h-48 w-full relative">
              <Image
                src={activity.thumbnailUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <Badge
                text={activity.type}
                type="achievement"
                size="small"
              />
              <Badge
                text={activity.difficulty}
                type="level"
                size="small"
              />
            </div>

            <h1 className="text-3xl font-bold mb-4 text-gray-800">{activity.title}</h1>
            <p className="text-gray-600 mb-8">{activity.description}</p>

            <div className="bg-indigo-50 p-4 rounded-xl mb-8 flex items-start">
              <span className="text-xl mr-3">💡</span>
              <div>
                <h3 className="font-bold text-indigo-700 mb-1">Instructions</h3>
                <p className="text-indigo-600 text-sm">
                  {questions[0]?.instructions ||
                    "Listen carefully, read the questions, and select the correct answers. Have fun!"}
                </p>
                <AudioButton
                  text={questions[0]?.instructions ||
                    "Listen carefully, read the questions, and select the correct answers. Have fun!"}
                  variant="secondary"
                  size="small"
                  className="mt-2"
                  label="Listen to instructions"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/activities/${id}`}
                className="px-6 py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Back
              </Link>
              <button
                onClick={handleGameStart}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Start Game
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main game screen - NO HEADER HERE FOR FOCUS
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Simple top bar with minimal info */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            href={`/activities/${id}`}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Exit
          </Link>

          <div className="flex items-center gap-4">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Score: {score}
            </span>
          </div>
        </div>

        {/* Audio controls outside the game area */}
        {currentQuestion && (
          <div className="mb-4 flex justify-center gap-3">
            <AudioButton
              text={currentQuestion.question}
              size="medium"
              variant="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              label="🔊 Listen to Question"
            />
            {currentQuestion.instructions && (
              <AudioButton
                text={currentQuestion.instructions}
                size="medium"
                variant="secondary"
                className="bg-purple-500 hover:bg-purple-600 text-white"
                label="💡 Listen to Instructions"
              />
            )}
          </div>
        )}

        {/* Game area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentQuestion && (
              <GamePlayArea
                question={currentQuestion.question}
                options={currentQuestion.options}
                onComplete={handleQuestionComplete}
                layout={currentQuestion.options.length <= 3 ? 'grid' : 'list'}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: questions.length }).map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors ${idx === currentQuestionIndex ? 'bg-indigo-600' :
                    idx < currentQuestionIndex ? 'bg-green-400' :
                      'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}