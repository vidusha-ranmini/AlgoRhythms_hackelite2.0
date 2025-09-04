"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';

interface AudioButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'medium',
  label,
  variant = 'primary',
  className = '',
}) => {
  const { speak, stop, isPlaying } = useTTS();

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(text);
    }
  };

  // Size classes
  const sizeClasses = {
    small: 'p-2 text-sm',
    medium: 'p-3',
    large: 'p-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-md',
    secondary: 'bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#3B82F6] border border-[#93C5FD]',
    ghost: 'bg-transparent hover:bg-[#E0E7FF] text-[#4F46E5]',
  };

  return (
    <motion.button
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        rounded-full flex items-center justify-center transition-all
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      aria-label={label || `Listen to ${text.substring(0, 20)}${text.length > 20 ? '...' : ''}`}
    >
      {/* Sound icon with animation */}
      <motion.div
        animate={isPlaying ? {
          scale: [1, 1.2, 1],
          transition: { repeat: Infinity, duration: 1 }
        } : {}}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </motion.div>

      {/* Optional visible label */}
      {label && <span className="ml-2">{label}</span>}
      
      {/* Speech waves animation when playing */}
      {isPlaying && (
        <div className="ml-1 flex items-center space-x-0.5">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="h-4 w-1 bg-current rounded-full"
              initial={{ height: 4 }}
              animate={{ 
                height: [4, 12, 4],
                transition: { 
                  repeat: Infinity, 
                  duration: 0.8,
                  delay: i * 0.2 
                }
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default AudioButton;