"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AudioButton from './AudioButton';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  imageUrl?: string;
}

interface PlayAreaProps {
  question: string;
  questionAudio?: boolean;
  options: Option[];
  onComplete: (correct: boolean, selectedOption: Option) => void;
  layout?: 'grid' | 'list';
  showFeedback?: boolean;
  showAudioButtons?: boolean;
}

const PlayArea: React.FC<PlayAreaProps> = ({
  question,
  questionAudio = true,
  options,
  onComplete,
  layout = 'grid',
  showFeedback = true,
  showAudioButtons = true,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showingResult, setShowingResult] = useState(false);

  const handleOptionSelect = (option: Option) => {
    // Prevent selecting another option while showing result
    if (showingResult) return;
    
    setSelectedId(option.id);
    setShowingResult(true);
    
    // Apply timeout before calling onComplete
    setTimeout(() => {
      onComplete(option.isCorrect, option);
      setShowingResult(false);
      setSelectedId(null);
    }, 2000);
  };

  const getOptionContainerClass = (layout: string) => {
    return layout === 'grid' 
      ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
      : 'flex flex-col space-y-4';
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      {/* Question Area */}
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-3 mb-3">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-800">
            {question}
          </h2>
          {questionAudio && showAudioButtons && (
            <AudioButton text={question} variant="ghost" size="medium" />
          )}
        </div>
        
        {/* Progress indicator could go here */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-300 w-1/2"></div>
        </div>
      </div>
      
      {/* Options Area */}
      <div className={getOptionContainerClass(layout)}>
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const shouldShowResult = showingResult && isSelected;
          
          // Dynamic classes based on selection state
          const baseClasses = "p-5 rounded-xl border-2 cursor-pointer transition-all";
          const hoverClasses = !showingResult ? "hover:border-indigo-400 hover:shadow-md" : "";
          const selectedClasses = isSelected ? "border-indigo-500" : "border-gray-200";
          const resultClasses = shouldShowResult 
            ? (option.isCorrect ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500")
            : "";
            
          return (
            <motion.div
              key={option.id}
              className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${resultClasses}`}
              onClick={() => handleOptionSelect(option)}
              whileHover={{ scale: showingResult ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {option.imageUrl && (
                    <Image 
                      src={option.imageUrl} 
                      alt={option.text}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg" 
                    />
                  )}
                  <span className="text-xl font-medium">{option.text}</span>
                </div>
                
                {showAudioButtons && (
                  <AudioButton 
                    text={option.text} 
                    variant="ghost" 
                    size="small"
                  />
                )}
              </div>
              
              {/* Feedback icons */}
              {shouldShowResult && showFeedback && (
                <div className="mt-2 flex justify-end">
                  {option.isCorrect ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600 text-2xl flex items-center"
                    >
                      <span className="mr-1">Correct!</span> 
                      <span role="img" aria-label="correct">✅</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-red-600 text-2xl flex items-center"
                    >
                      <span className="mr-1">Try again!</span>
                      <span role="img" aria-label="incorrect">❌</span>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayArea;