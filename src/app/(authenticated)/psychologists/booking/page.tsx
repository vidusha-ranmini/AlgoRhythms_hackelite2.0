"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Check, Clock, ArrowLeft, Video, MessageSquare, Phone } from 'lucide-react';
import { psychologists } from '@/lib/psychologists';
import { format } from 'date-fns';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const psychologistId = searchParams.get('psychologistId') || '';
  const sessionType = searchParams.get('sessionType') || 'Video';
  
  // Find psychologist from our list - in a real app, you would fetch this from an API
  const psychologist = psychologists.find(p => p.id === psychologistId);
  
  // Default name if psychologist not found
  const psychologistName = psychologist?.name || 'Dr. Sarah Williams';
  
  // Generate a random booking ID
  const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Generate a date for the session (2 days from now)
  const twoDateFromNow = new Date();
  twoDateFromNow.setDate(twoDateFromNow.getDate() + 2);
  const sessionDate = format(twoDateFromNow, "EEEE, MMMM do, yyyy");
  
  // Session time (random between 9am and 4pm)
  const hour = Math.floor(Math.random() * 8) + 9;
  const sessionTime = `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;

  // Session type icon
  const getSessionTypeIcon = () => {
    switch(sessionType) {
      case 'Video':
        return <Video className="h-5 w-5" />;
      case 'Chat':
        return <MessageSquare className="h-5 w-5" />;
      case 'Call':
        return <Phone className="h-5 w-5" />;
      default:
        return <Video className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/psychologists" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all psychologists
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 flex items-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mr-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold">Booking Confirmed!</h1>
              <p className="text-green-50">Your session has been successfully scheduled</p>
            </div>
          </div>
          
          {/* Booking details section */}
          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-green-800 mb-6">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-700" />
                    <div>
                      <div className="text-sm text-green-700">Session Date</div>
                      <div className="font-medium text-green-900">{sessionDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-700" />
                    <div>
                      <div className="text-sm text-green-700">Session Time</div>
                      <div className="font-medium text-green-900">{sessionTime} (50 minutes)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getSessionTypeIcon()}
                    <div>
                      <div className="text-sm text-green-700">Session Type</div>
                      <div className="font-medium text-green-900">{sessionType} Session</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {psychologist && (
                      <div className="relative w-10 h-10 overflow-hidden rounded-full bg-indigo-100">
                        <Image 
                          src={psychologist.imageUrl || '/images/default-avatar.png'}
                          alt={psychologist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-green-700">Psychologist</div>
                      <div className="font-medium text-green-900">{psychologistName}</div>
                    </div>
                  </div>
                  
                  <div className="pl-2">
                    <div className="text-sm text-green-700">Booking ID</div>
                    <div className="font-medium text-green-900">{bookingId}</div>
                  </div>
                  
                  <div className="pl-2">
                    <div className="text-sm text-green-700">Session Fee</div>
                    <div className="font-medium text-green-900">$120 <span className="text-xs font-normal text-green-700">(Insurance may apply)</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-medium text-gray-900 mb-3">What happens next?</h3>
              
              <ol className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mr-3 mt-0.5">1</span>
                  <div className="text-gray-700">
                    <p>You&apos;ll receive an email confirmation with all the session details.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mr-3 mt-0.5">2</span>
                  <div className="text-gray-700">
                    <p>You&apos;ll get a reminder 24 hours before your scheduled appointment.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mr-3 mt-0.5">3</span>
                  <div className="text-gray-700">
                    <p>{sessionType === 'Video' || sessionType === 'Call' ? 
                      `Click the join link in your email 5 minutes before the session starts.` : 
                      `Open the chat window from your dashboard 5 minutes before the session starts.`}
                    </p>
                  </div>
                </li>
              </ol>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/dashboard/sessions" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
                >
                  View Your Sessions
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-xl transition-colors text-center"
                >
                  Return to Dashboard
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Cancellation policy footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Need to reschedule? You can cancel or reschedule up to 24 hours before your appointment.
        </motion.div>
      </div>
    </div>
  );
}