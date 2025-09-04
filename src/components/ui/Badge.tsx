import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  type?: 'achievement' | 'level' | 'reward';
  size?: 'small' | 'medium' | 'large';
  withAnimation?: boolean;
  icon?: string;
  category?: string;
  title?: string;
  className?: string;
}

const getTypeStyles = (type: BadgeProps['type']) => {
  switch (type) {
    case 'achievement':
      return 'bg-[#4F46E5] text-white';
    case 'level':
      return 'bg-[#3B82F6] text-white';
    case 'reward':
      return 'bg-[#F59E0B] text-white';
    default:
      return 'bg-[#10B981] text-white';
  }
};

const getSizeStyles = (size: BadgeProps['size']) => {
  switch (size) {
    case 'small':
      return 'text-xs py-1 px-2';
    case 'large':
      return 'text-lg py-3 px-6';
    default: // medium
      return 'text-sm py-2 px-4';
  }
};

const Badge: React.FC<BadgeProps> = ({ 
  text,
  type = 'achievement',
  size = 'medium',
  withAnimation = false,
  icon,
  category,
  title,
  className = ''
}) => {
  const baseStyles = "rounded-full font-bold shadow-md inline-flex items-center justify-center";
  const typeStyles = getTypeStyles(type);
  const sizeStyles = getSizeStyles(size);
  
  // Use title or text as display text
  const displayText = title || text;
  // Use icon from prop or extract emoji from beginning of text if present
  const displayIcon = icon || (text.match(/^\p{Emoji}/u) ? text.match(/^\p{Emoji}/u)![0] : '');
  const textWithoutEmoji = displayIcon ? text.replace(/^\p{Emoji}/u, '').trim() : text;
  
  const badgeContent = (
    <div className={`${baseStyles} ${typeStyles} ${sizeStyles} ${className}`}>
      {displayIcon && <span className="mr-1">{displayIcon}</span>}
      <span>{displayIcon ? textWithoutEmoji : displayText}</span>
      
      {/* Optional category indicator */}
      {category && (
        <span className="ml-1 bg-white bg-opacity-30 text-xs px-1.5 py-0.5 rounded-full">
          {category}
        </span>
      )}
    </div>
  );
  
  if (withAnimation) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        whileHover={{ scale: 1.05 }}
        className="inline-block"
      >
        {badgeContent}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="inline-block"
    >
      {badgeContent}
    </motion.div>
  );
};

export default Badge;