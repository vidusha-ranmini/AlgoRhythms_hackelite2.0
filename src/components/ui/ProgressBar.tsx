import React from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';

interface ProgressBarProps {
  progress: number; // 0-100
  level: number;
  animate?: boolean;
  showLevelBadge?: boolean;
  showNextLevelInfo?: boolean;
  theme?: 'default' | 'rainbow' | 'space' | 'ocean';
}

const getThemeStyles = (theme: ProgressBarProps['theme']) => {
  switch (theme) {
    case 'rainbow':
      return 'bg-[#10B981]';
    case 'space':
      return 'bg-[#4F46E5]';
    case 'ocean':
      return 'bg-[#3B82F6]';
    default:
      return 'bg-[#4F46E5]';
  }
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  level,
  animate = true,
  showLevelBadge = true,
  showNextLevelInfo = true,
  theme = 'default'
}) => {
  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  const themeStyles = getThemeStyles(theme);

  // Calculate stars based on progress
  const stars = Math.ceil(validProgress / 20); // 1-5 stars
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        {showLevelBadge ? (
          <Badge 
            text={`Level ${level}`}
            type="level"
            size="small"
          />
        ) : (
          <span className="text-[#4F46E5] font-medium">Level {level}</span>
        )}
        
        <div className="flex items-center">
          {/* Stars representation */}
          <div className="mr-2 flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">
                {i < stars ? '⭐' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-[#4F46E5] font-medium">{validProgress}%</span>
        </div>
      </div>
      
      <div className="h-8 bg-[#D1FAE5] rounded-full overflow-hidden relative">
        {/* Milestone markers */}
        <div className="absolute inset-0 flex justify-between px-2">
          {[20, 40, 60, 80].map((marker) => (
            <div 
              key={marker} 
              className="h-full w-0.5 bg-[#A7F3D0] flex items-center justify-center"
              style={{opacity: marker <= validProgress ? 0.3 : 0.8}}
            >
              {/* Optional: Add icons at milestones */}
              {marker === 60 && marker <= validProgress && (
                <div className="absolute -mt-8 bg-white rounded-full p-1 shadow-sm">
                  <span role="img" aria-label="trophy" className="text-xs">🏆</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress fill */}
        {animate ? (
          <motion.div
            className={`h-full ${themeStyles}`}
            initial={{ width: 0 }}
            animate={{ width: `${validProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Character moves with progress */}
            {validProgress > 10 && (
              <motion.div 
                className="absolute -top-1 transform -translate-y-full"
                style={{ left: `${validProgress - 5}%` }}
              >
                <span role="img" aria-label="character" className="text-xl">
                  {validProgress < 90 ? '🏃‍♂️' : '🎉'}
                </span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div 
            className={`h-full ${themeStyles}`}
            style={{ width: `${validProgress}%` }}
          />
        )}
      </div>
      
      {/* XP to next level */}
      {showNextLevelInfo && (
        <div className="mt-1 text-right text-xs text-[#4F46E5] font-medium">
          {validProgress < 100 ? (
            <span>
              {100 - validProgress} XP to Level {level + 1}
              <span className="ml-1">✨</span>
            </span>
          ) : (
            <span className="text-[#10B981]">Ready to level up!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;