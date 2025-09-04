import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  id: string;
  title: string;
  type: 'phonics' | 'spelling' | 'comprehension' | 'reading';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
  imageUrl?: string;
  completedPercentage?: number;
  isNew?: boolean;
  durationMinutes?: number; // Add this line to accept the durationMinutes prop
}

const getTypeIcon = (type: ActivityCardProps['type']) => {
  switch (type) {
    case 'phonics':
      return '🔤';
    case 'spelling':
      return '✏️';
    case 'reading':
      return '📚';
    case 'comprehension':
      return '🧩';
    default:
      return '📝';
  }
};

const getTypeColor = (type: ActivityCardProps['type']) => {
  switch (type) {
    case 'phonics':
      return 'bg-[#4F46E5]';
    case 'spelling':
      return 'bg-[#10B981]';
    case 'reading':
      return 'bg-[#F59E0B]';
    case 'comprehension':
      return 'bg-[#3B82F6]';
    default:
      return 'bg-[#6B7280]';
  }
};

const getDifficultyLabel = (difficulty: ActivityCardProps['difficulty']) => {
  switch (difficulty) {
    case 'beginner':
      return '⭐';
    case 'intermediate':
      return '⭐⭐';
    case 'advanced':
      return '⭐⭐⭐';
    default:
      return '⭐';
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  type,
  difficulty,
  description,
  imageUrl,
  completedPercentage = 0,
  isNew = false
}) => {
  const typeIcon = getTypeIcon(type);
  const typeColor = getTypeColor(type);
  const difficultyLabel = getDifficultyLabel(difficulty);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className={`${typeColor} p-4 text-white relative`}>
        <div className="flex justify-between items-center">
          <span className="text-3xl">{typeIcon}</span>
          <span className="text-sm font-medium opacity-90">{difficultyLabel}</span>
        </div>

        {isNew && (
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <div className="bg-[#F59E0B] text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
              NEW!
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {imageUrl && (
          <div className="mb-3 -mt-6 rounded-lg overflow-hidden border-4 border-white shadow-sm">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={200}
              className="w-full h-32 object-cover"
            />
          </div>
        )}

        <h3 className="font-bold text-lg text-[#1F2937] mb-2">{title}</h3>

        {description && (
          <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">{description}</p>
        )}

        {completedPercentage > 0 && (
          <div className="mb-3">
            <div className="h-2 bg-[#D1FAE5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10B981] rounded-full"
                style={{ width: `${completedPercentage}%` }}
              />
            </div>
            <p className="text-xs text-right mt-1 text-[#6B7280]">{completedPercentage}% complete</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-xs bg-[#F3F4F6] text-[#6B7280] px-2 py-1 rounded-full capitalize">
            {type}
          </span>

          <Link
            href={`/activities/${id}`}
            className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg flex items-center transition-colors font-medium"
          >
            Start
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;