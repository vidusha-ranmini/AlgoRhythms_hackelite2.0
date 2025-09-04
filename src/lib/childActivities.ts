export type ActivityType = 'phonics' | 'spelling' | 'reading' | 'comprehension';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  difficulty: DifficultyLevel;
  description: string;
  thumbnailUrl: string;
  durationMinutes: number;
}

export const childActivities: Activity[] = [
  {
    id: 'act-001',
    title: 'Letter Sounds Adventure',
    type: 'phonics',
    difficulty: 'beginner',
    description: 'Learn to recognize and pronounce basic letter sounds through interactive games.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    durationMinutes: 15
  },
  {
    id: 'act-002',
    title: 'Word Builder Challenge',
    type: 'spelling',
    difficulty: 'intermediate',
    description: 'Construct words from phonetic components using visual and audio cues.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
    durationMinutes: 20
  },
  {
    id: 'act-003',
    title: 'Story Time Explorer',
    type: 'reading',
    difficulty: 'beginner',
    description: 'Read along with highlighted text and audio support in engaging short stories.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    durationMinutes: 25
  },
  {
    id: 'act-004',
    title: 'Rhyme Time',
    type: 'phonics',
    difficulty: 'beginner',
    description: 'Match rhyming words to improve phonological awareness and sound recognition.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    durationMinutes: 10
  },
  {
    id: 'act-005',
    title: 'Sight Words Sprint',
    type: 'reading',
    difficulty: 'intermediate',
    description: 'Practice recognizing common sight words with timed challenges and rewards.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    durationMinutes: 15
  },
  {
    id: 'act-006',
    title: 'Sentence Scramble',
    type: 'spelling',
    difficulty: 'advanced',
    description: 'Rearrange words to form correct sentences, focusing on grammar and context clues.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
    durationMinutes: 20
  },
  {
    id: 'act-007',
    title: 'Reading Comprehension Quest',
    type: 'comprehension',
    difficulty: 'advanced',
    description: 'Answer questions about short passages to improve understanding and recall.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=250&fit=crop',
    durationMinutes: 30
  },
  {
    id: 'act-008',
    title: 'Sound Blending Blocks',
    type: 'phonics',
    difficulty: 'intermediate',
    description: 'Combine phonetic sounds to create words using interactive building blocks.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    durationMinutes: 15
  }
];