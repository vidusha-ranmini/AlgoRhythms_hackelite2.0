"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuiz } from '@/context/QuizContext';
import QuestionCard from '@/components/quiz/QuestionCard';
import QuizStepper from '@/components/quiz/QuizStepper';

// Define the Question type
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: string;
}

export default function QuestionPage({ params }: { params: Promise<{ step: string }> }) {
  const router = useRouter();
  const { questions, answers, setAnswer, currentStep, setCurrentStep } = useQuiz();
  const [stepNumber, setStepNumber] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // Resolve params and set step number
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const step = parseInt(resolvedParams.step, 10);
      setStepNumber(step);
      
      const question = questions.find(q => q.id === step);
      setCurrentQuestion(question || null);
      
      // Update current step when navigating directly to a URL
      if (step !== currentStep) {
        setCurrentStep(step);
      }
    };
    
    resolveParams();
  }, [params, questions, currentStep, setCurrentStep]);

  // Show loading while resolving params
  if (stepNumber === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
        <div className="text-2xl font-bold text-indigo-600">Loading...</div>
      </div>
    );
  }

  // Handle if question doesn't exist
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Question not found</h1>
          <p className="mb-6">Sorry, this question doesn&apos;t exist.</p>
          <Link 
            href="/quiz/start" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Back to Quiz Start
          </Link>
        </div>
      </div>
    );
  }

  const handleSelectAnswer = (answer: string) => {
    setAnswer(stepNumber, answer);
    
    // Wait a moment to show the selected option before moving to next question
    setTimeout(() => {
      if (stepNumber < questions.length) {
        router.push(`/quiz/question/${stepNumber + 1}`);
      } else {
        router.push('/quiz/results');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-2xl mx-auto pt-8 pb-16">
        <QuizStepper currentStep={stepNumber} totalSteps={questions.length} />
        
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={answers[stepNumber]}
          onSelect={handleSelectAnswer}
        />
        
        <div className="flex justify-between mt-8">
          {stepNumber > 1 ? (
            <button 
              onClick={() => router.push(`/quiz/question/${stepNumber - 1}`)}
              className="px-5 py-2.5 text-[#4F46E5] hover:text-[#4338CA] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Previous
            </button>
          ) : (
            <div></div>
          )}
          
          <Link 
            href={stepNumber < questions.length ? `/quiz/question/${stepNumber + 1}` : '/quiz/results'}
          className={`px-5 py-2.5 text-[#4F46E5] hover:text-[#4338CA] flex items-center ${!answers[stepNumber] ? 'opacity-50 pointer-events-none' : ''}`}
            aria-disabled={!answers[stepNumber]}
          >
            Skip
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}