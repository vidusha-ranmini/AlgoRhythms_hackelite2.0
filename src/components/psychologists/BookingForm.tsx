"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, X, ChevronDown, MessageSquare, Video, Phone } from 'lucide-react';
import { Psychologist } from '@/lib/psychologists';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingFormProps {
  psychologist: Psychologist;
  isOpen: boolean;
  onClose: () => void;
}

type SessionType = 'Video' | 'Chat' | 'Call';

const BookingForm: React.FC<BookingFormProps> = ({ psychologist, isOpen, onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<SessionType>('Video');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [childName, setChildName] = useState<string>('');
  const [childAge, setChildAge] = useState<string>('');
  const [briefDescription, setBriefDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate fake available dates for the next 14 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Skip weekends for this example
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(format(date, 'yyyy-MM-dd'));
      }
    }
    
    return dates;
  };

  // Generate fake time slots
  const generateTimeSlots = () => {
    return [
      '9:00 AM', '10:00 AM', '11:00 AM', 
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
  };

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Navigate to the confirmation page with query params
      router.push(`/psychologists/booking?psychologistId=${psychologist.id}&sessionType=${sessionType}`);
      onClose();
      setIsSubmitting(false);
    }, 1500);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Early return if not open
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000085] backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Book a Session</h2>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="flex items-center mb-6">
                {[1, 2, 3].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          step > stepNumber ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-900">Select Session Type</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        type="button"
                        onClick={() => setSessionType('Video')}
                        className={`flex items-center p-4 rounded-xl border-2 transition-colors ${
                          sessionType === 'Video'
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                          <Video className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900">Video Session</h4>
                          <p className="text-sm text-gray-600">Face-to-face video conversation</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                          sessionType === 'Video' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {sessionType === 'Video' && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSessionType('Chat')}
                        className={`flex items-center p-4 rounded-xl border-2 transition-colors ${
                          sessionType === 'Chat'
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                          <MessageSquare className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900">Chat Session</h4>
                          <p className="text-sm text-gray-600">Text-based consultation</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                          sessionType === 'Chat' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {sessionType === 'Chat' && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSessionType('Call')}
                        className={`flex items-center p-4 rounded-xl border-2 transition-colors ${
                          sessionType === 'Call'
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                          <Phone className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900">Audio Call</h4>
                          <p className="text-sm text-gray-600">Voice-only conversation</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                          sessionType === 'Call' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {sessionType === 'Call' && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-900">Select Date & Time</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Date
                      </label>
                      <div className="relative">
                        <select
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        >
                          <option value="" disabled>Select a date</option>
                          {availableDates.map((d) => (
                            <option key={d} value={d}>
                              {format(new Date(d), 'EEEE, MMMM d, yyyy')}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Slot
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setTimeSlot(time)}
                            className={`px-3 py-2 rounded-lg border text-center text-sm font-medium ${
                              timeSlot === time
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-900">Session Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Child&apos;s Name
                      </label>
                      <input
                        type="text"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Child&apos;s Age
                      </label>
                      <select
                        value={childAge}
                        onChange={(e) => setChildAge(e.target.value)}
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="" disabled>Select age</option>
                        {Array.from({ length: 15 }, (_, i) => i + 3).map((age) => (
                          <option key={age} value={age.toString()}>
                            {age} years
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brief Description of Concerns (optional)
                      </label>
                      <textarea
                        value={briefDescription}
                        onChange={(e) => setBriefDescription(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] resize-none"
                        placeholder="Please briefly describe your concerns or what you'd like to discuss"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                      <p className="flex items-center font-medium mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Booking Summary
                      </p>
                      <ul className="space-y-1 pl-6 list-disc">
                        <li>Psychologist: {psychologist.name}</li>
                        <li>Session type: {sessionType}</li>
                        {date && <li>Date: {format(new Date(date), 'MMMM d, yyyy')}</li>}
                        {timeSlot && <li>Time: {timeSlot}</li>}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                      disabled={
                        (step === 1 && !sessionType) || 
                        (step === 2 && (!date || !timeSlot))
                      }
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !childName || !childAge}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;