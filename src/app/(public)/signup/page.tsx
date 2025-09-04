"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from '@/components/forms/SignupForm';
import { motion } from 'framer-motion';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl px-8 py-10"
        >
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image src="/images/logo.png" alt="Readlle Logo" width={60} height={60} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join Readlle and help your child improve reading skills</p>
          </div>
          
          {/* Signup Form Component */}
          <SignupForm />
          
          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}