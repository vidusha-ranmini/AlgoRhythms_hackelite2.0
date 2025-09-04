"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, MessageCircle, Phone, ArrowLeft, Clock, Globe, CreditCard } from 'lucide-react';
import { psychologists, Psychologist } from '@/lib/psychologists';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import BookingForm from '@/components/psychologists/BookingForm';

// Updated interface to match Next.js's expected PageProps structure
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default function PsychologistProfilePage({ params }: PageProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Handle params being a Promise
  const [id, setId] = useState<string | null>(null);
  // Fix: Replace 'any' with a proper type
  const [psychologist, setPsychologist] = useState<Psychologist | null>(null);
  
  // Extract id from params Promise
  React.useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
        const foundPsychologist = psychologists.find(p => p.id === resolvedParams.id);
        setPsychologist(foundPsychologist || null);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };
    
    resolveParams();
  }, [params]);
  
  // Show loading state until params are resolved
  if (!id || !psychologist) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const { name, specialties, rating, reviews, availability, languages, bio, imageUrl } = psychologist;

  // Sample review data - in a real app, this would come from a database
  const sampleReviews = [
    {
      id: '1',
      author: 'Jennifer M.',
      date: 'April 15, 2025',
      rating: 5,
      content: 'Dr. ' + name.split(' ')[1] + ' was incredibly helpful with our daughter. Within just a few sessions, we saw remarkable improvements in her confidence and social interactions.'
    },
    {
      id: '2',
      author: 'Robert K.',
      date: 'March 22, 2025',
      rating: 4,
      content: 'Very knowledgeable and patient. Provided practical strategies we could implement at home. Would recommend to other parents.'
    }
  ];

  // These would connect to real functionality in a production app
  const handleBookSession = () => {
    setIsBookingModalOpen(true);
    toast.success(`Opening booking dialog for ${name}`);
  };
  
  const handleSendMessage = () => {
    toast.success(`Opening message window for ${name}`);
  };
  
  const handleRequestCall = () => {
    toast.success(`Requesting call from ${name}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Link 
        href="/psychologists" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all psychologists
      </Link>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      >
        {/* Hero section with updated colors */}
        <div className="bg-blue-50 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={imageUrl || '/images/default-avatar.png'}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
            <div className="flex justify-center md:justify-start items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">{rating} ({reviews})</span>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium rounded-md"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          <div className="md:ml-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <button 
                onClick={handleSendMessage}
                className="bg-blue-100 hover:bg-blue-100 text-blue-700 font-medium px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Message
              </button>
              <button 
                onClick={handleRequestCall}
                className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call
              </button>
              <button 
                onClick={handleBookSession}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Session
              </button>
            </div>
          </div>
        </div>
        
        {/* Details section */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{bio}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{rating} out of 5</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {sampleReviews.map((review, index) => (
                    <motion.div 
                      key={review.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.content}</p>
                    </motion.div>
                  ))}
                  
                  {reviews > 2 && (
                    <button className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors flex items-center">
                      View all {reviews} reviews
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Availability</h3>
                    <p className="text-gray-700">{availability}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Languages</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {languages.map((language, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium rounded-md"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Session Information</h3>
                  </div>
                </div>
                
                <div className="space-y-3 pl-12">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Initial consultation:</span>
                    <span className="font-medium text-indigo-700">Free (30 min)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Regular session:</span>
                    <span className="font-medium text-indigo-700">$120 (50 min)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Insurance:</span>
                    <span className="font-medium text-indigo-700">Most plans accepted</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleBookSession}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Calendar className="w-5 h-5" />
                  Book Session
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingForm 
        psychologist={psychologist} 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </motion.div>
  );
}