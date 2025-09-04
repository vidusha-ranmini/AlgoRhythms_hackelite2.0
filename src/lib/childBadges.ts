export interface Badge {
  id: string;
  title: string;
  category: string;
  icon: string; // Emoji or icon reference
  earnedOn: Date;
  description: string;
  level?: number;
}

export const childBadges: Badge[] = [
  {
    id: 'bdg-001',
    title: 'Phonics Phenom',
    category: 'phonics',
    icon: '🔤',
    earnedOn: new Date('2025-05-10'),
    description: 'Completed 5 phonics activities with high accuracy',
    level: 1
  },
  {
    id: 'bdg-002',
    title: 'Word Wizard',
    category: 'spelling',
    icon: '✨',
    earnedOn: new Date('2025-05-15'),
    description: 'Spelled 20 challenging words correctly in a row',
    level: 2
  },
  {
    id: 'bdg-003',
    title: 'Reading Rocket',
    category: 'reading',
    icon: '🚀',
    earnedOn: new Date('2025-05-18'),
    description: 'Read 5 stories with excellent comprehension',
    level: 1
  },
  {
    id: 'bdg-004',
    title: 'Super Speller',
    category: 'spelling',
    icon: '🏆',
    earnedOn: new Date('2025-05-22'),
    description: 'Achieved perfect score in advanced spelling challenge',
    level: 3
  },
  {
    id: 'bdg-005',
    title: 'Rhyme Master',
    category: 'phonics',
    icon: '🎵',
    earnedOn: new Date('2025-05-25'),
    description: 'Found all rhyming pairs in record time',
    level: 2
  },
  {
    id: 'bdg-006',
    title: 'Bookworm',
    category: 'reading',
    icon: '📚',
    earnedOn: new Date('2025-06-01'),
    description: 'Completed 10 reading sessions',
    level: 2
  },
  {
    id: 'bdg-007',
    title: 'Sight Word Star',
    category: 'reading',
    icon: '⭐',
    earnedOn: new Date('2025-06-05'),
    description: 'Mastered 50 sight words',
    level: 3
  },
  {
    id: 'bdg-008',
    title: 'Reading Rally Champion',
    category: 'achievement',
    icon: '🏅',
    earnedOn: new Date('2025-06-10'),
    description: 'Completed activities for 7 days in a row',
    level: 1
  },
  {
    id: 'bdg-009',
    title: 'Dictionary Detective',
    category: 'vocabulary',
    icon: '🔍',
    earnedOn: new Date('2025-06-15'),
    description: 'Learned and used 25 new vocabulary words',
    level: 2
  },
  {
    id: 'bdg-010',
    title: 'Story Explorer',
    category: 'comprehension',
    icon: '🗺️',
    earnedOn: new Date('2025-06-20'),
    description: 'Answered all comprehension questions correctly in 3 consecutive stories',
    level: 2
  }
];

// Utility function to get badges by category
export const getBadgesByCategory = (category: string): Badge[] => {
  return childBadges.filter(badge => badge.category === category);
};

// Utility function to get recently earned badges (last 30 days)
export const getRecentBadges = (): Badge[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return childBadges.filter(badge => badge.earnedOn >= thirtyDaysAgo);
};