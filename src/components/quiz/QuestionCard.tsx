import React from 'react';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer?: string;
  onSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  options, 
  selectedAnswer, 
  onSelect 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1F2937]">{question}</h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center
              ${
                selectedAnswer === option
                  ? 'bg-[#E0E7FF] border-2 border-[#4F46E5] text-[#4F46E5]'
                  : 'bg-[#F3F4F6] border-2 border-[#D1D5DB] hover:border-[#C7D2FE] text-[#1F2937] hover:bg-[#E0E7FF]'
              }
            `}
            aria-pressed={selectedAnswer === option}
          >
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border-2
              ${
                selectedAnswer === option
                  ? 'border-[#4F46E5] bg-[#4F46E5]'
                  : 'border-[#6B7280]'
              }
            `}>
              {selectedAnswer === option && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;