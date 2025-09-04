export interface Psychologist {
  id: string;
  name: string;
  specialties: string[];
  availability: string;
  rating: number;
  reviews: number;
  languages: string[];
  bio: string;
  imageUrl: string;
}

export const psychologists: Psychologist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialties: ["Child Development", "Anxiety", "Family Therapy"],
    availability: "Mon-Wed, 9AM-5PM",
    rating: 4.9,
    reviews: 127,
    languages: ["English", "Spanish"],
    bio: "Dr. Johnson specializes in child development and family therapy with over 15 years of experience. She uses evidence-based approaches to help families navigate challenges and build stronger relationships.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialties: ["Early Childhood", "Behavioral Issues", "Parenting Support"],
    availability: "Tues-Fri, 10AM-6PM",
    rating: 4.8,
    reviews: 98,
    languages: ["English", "Mandarin"],
    bio: "Dr. Chen is passionate about early childhood development and helping parents understand their child's unique needs. He specializes in behavioral strategies that foster positive growth.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Dr. Amira Patel",
    specialties: ["Learning Disabilities", "ADHD", "School Adjustment"],
    availability: "Mon-Thurs, 8AM-4PM",
    rating: 4.7,
    reviews: 83,
    languages: ["English", "Hindi", "Gujarati"],
    bio: "With expertise in learning disabilities and ADHD, Dr. Patel works with families to develop personalized strategies for academic success and emotional well-being.",
    imageUrl: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialties: ["Emotional Regulation", "Social Skills", "Teen Counseling"],
    availability: "Wed-Sat, 11AM-7PM",
    rating: 4.6,
    reviews: 74,
    languages: ["English", "French"],
    bio: "Dr. Wilson focuses on helping children and teens develop emotional intelligence and social skills. His approach combines cognitive behavioral techniques with compassionate support.",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Dr. Elena Rodriguez",
    specialties: ["Trauma", "Family Transitions", "Grief Counseling"],
    availability: "Mon-Fri, 9AM-3PM",
    rating: 4.9,
    reviews: 115,
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Dr. Rodriguez specializes in helping families navigate difficult transitions, trauma, and loss. She creates a safe space for healing and provides tools for resilience.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Dr. David Kim",
    specialties: ["Autism Spectrum", "Developmental Milestones", "Parent Coaching"],
    availability: "Tues-Sat, 8AM-6PM",
    rating: 4.8,
    reviews: 91,
    languages: ["English", "Korean"],
    bio: "Dr. Kim has extensive experience working with children on the autism spectrum and their families. He offers practical strategies and compassionate guidance.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Dr. Olivia Thompson",
    specialties: ["Play Therapy", "Attachment", "Adoption Support"],
    availability: "Mon-Wed, 10AM-8PM",
    rating: 4.7,
    reviews: 86,
    languages: ["English"],
    bio: "Dr. Thompson uses play therapy and attachment-based approaches to support children through various challenges. She has special expertise in adoption-related issues.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Dr. Marcus Williams",
    specialties: ["School Psychology", "Testing & Assessment", "Academic Planning"],
    availability: "Wed-Fri, 9AM-5PM",
    rating: 4.8,
    reviews: 79,
    languages: ["English"],
    bio: "Dr. Williams provides comprehensive assessments and practical guidance for educational planning. He collaborates with schools to create supportive learning environments.",
    imageUrl: "https://images.unsplash.com/photo-1563807894768-f28bee0d37b6?q=80&w=300&auto=format&fit=crop"
  },
];