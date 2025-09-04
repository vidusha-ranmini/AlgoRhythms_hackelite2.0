"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Psychologist } from '@/lib/psychologists';
import { Star, Calendar, MessageCircle, Phone } from 'lucide-react';
import BookingForm from './BookingForm';

interface PsychologistCardProps {
  psychologist: Psychologist;
  onBook?: () => void;
  onMessage?: () => void;
  onRequestCall?: () => void;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
  onBook,
  onMessage,
  onRequestCall
}) => {
  const { id, name, specialties, rating, reviews, availability, languages, imageUrl } = psychologist;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookClick = () => {
    if (onBook) {
      onBook();
    }
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] p-6">
          <Link href={`/psychologists/${id}`} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white p-1 group-hover:ring-2 group-hover:ring-white transition-all shadow-md">
              <Image
                src={imageUrl || '/images/default-avatar.png'}
                alt={name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-white">
              <h3 className="text-xl font-bold group-hover:underline">{name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-blue-200'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-blue-100">{rating} ({reviews})</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-6">
            <div className="text-sm text-[#6B7280] font-medium mb-3">Specialties:</div>
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white text-xs font-medium rounded-lg"
                >
                  {specialty}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="px-3 py-1.5 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 text-[#6B7280] text-xs font-medium rounded-lg">
                  +{specialties.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-[#6B7280] font-medium">Availability</p>
              <p className="font-bold text-[#1F2937] text-sm">{availability}</p>
            </div>
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-[#6B7280] font-medium">Languages</p>
              <p className="font-bold text-[#1F2937] text-sm">{languages.join(", ")}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-gray-100 p-4 rounded-lg mb-6 flex-grow">
            <p className="text-sm text-[#6B7280] line-clamp-3">
              {psychologist.bio}
            </p>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <div className="flex gap-3">
              <button
                onClick={onMessage}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#10B981] to-[#14B8A6] hover:shadow-md transition-all hover:-translate-y-0.5"
                aria-label="Send message"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onRequestCall}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:shadow-md transition-all hover:-translate-y-0.5"
                aria-label="Request call"
              >
                <Phone className="w-5 h-5 text-white" />
              </button>
            </div>

            <button
              onClick={handleBookClick}
              className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingForm
        psychologist={psychologist}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default PsychologistCard;