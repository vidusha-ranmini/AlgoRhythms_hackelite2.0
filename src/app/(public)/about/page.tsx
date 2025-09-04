"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff]">
      {/* Hero/Title Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 bg-indigo-100 p-3 rounded-full">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              About Readlle
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We&apos;re on a mission to transform reading experiences for children with dyslexia through 
              technology, compassion, and evidence-based methods.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story/Mission Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Story/Mission Content */}
            <div className="md:w-1/2">
              <span className="text-sm font-medium bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full mb-4 inline-block">OUR STORY</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforming Reading for All Children</h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  Readlle began with a simple observation: traditional learning methods often leave children with dyslexia behind. Founded in 2020 by a team of educators, cognitive scientists, and parents of dyslexic children, we set out to create something different.
                </p>
                
                <p className="text-lg">
                  Our platform combines the latest research in neuroscience, evidence-based teaching methods, and engaging technology to create a learning experience that&apos;s both effective and enjoyable for children with diverse learning needs.
                </p>

                <h3 className="text-xl font-bold text-indigo-700 mt-8">Our Mission</h3>
                <p className="text-lg">
                  We believe that every child deserves to experience the joy and empowerment that comes from confident reading. Our mission is to ensure that learning differences never stand in the way of a child&apos;s potential.
                </p>

                <p className="text-lg font-medium text-indigo-600">
                  Through personalized, accessible, and engaging approaches, we&apos;re building a world where all children can develop literacy skills at their own pace and in their own way.
                </p>
              </div>
            </div>
            
            {/* Image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                <Image 
                  src="/about-image.jpg" 
                  alt="Team collaborating on educational materials" 
                  width={600} 
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium bg-green-100 text-green-700 px-4 py-1.5 rounded-full">OUR PEOPLE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">Meet The Team</h2>
            <p className="text-gray-600 max-w-xl mx-auto">The passionate individuals behind Readlle&apos;s mission</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-400 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/team/emily-parker.jpg" 
                    alt="Emily Parker" 
                    width={200} 
                    height={200}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Emily Parker, Ph.D.</h3>
                <p className="text-indigo-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">Former educator with 15+ years experience in special education and cognitive science research</p>
                <div className="flex justify-center mt-4 space-x-3 text-gray-400">
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-teal-400 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/team/michael-rodriguez.jpg" 
                    alt="Michael Rodriguez" 
                    width={200} 
                    height={200}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Michael Rodriguez</h3>
                <p className="text-indigo-600 font-medium mb-3">CTO</p>
                <p className="text-gray-600 text-sm">Software engineer with expertise in educational technology and accessibility</p>
                <div className="flex justify-center mt-4 space-x-3 text-gray-400">
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-pink-400 to-red-400 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/team/sarah-johnson.jpg" 
                    alt="Sarah Johnson" 
                    width={200} 
                    height={200}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Johnson, M.Ed</h3>
                <p className="text-indigo-600 font-medium mb-3">Head of Curriculum</p>
                <p className="text-gray-600 text-sm">Literacy specialist with background in developing educational content for diverse learners</p>
                <div className="flex justify-center mt-4 space-x-3 text-gray-400">
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-400 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/team/david-chen.jpg" 
                    alt="David Chen" 
                    width={200} 
                    height={200}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">David Chen</h3>
                <p className="text-indigo-600 font-medium mb-3">UX Research Lead</p>
                <p className="text-gray-600 text-sm">Human-computer interaction expert focused on creating accessible interfaces for all users</p>
                <div className="flex justify-center mt-4 space-x-3 text-gray-400">
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="#" className="hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">What We Stand For</h2>
            <p className="text-gray-600 max-w-xl mx-auto">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Innovative</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We embrace new ideas and technologies to constantly improve and adapt our reading solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Inclusive</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We believe in equal access to learning for all children, regardless of their challenges or backgrounds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Empathetic</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We approach every child&apos;s learning journey with compassion and understanding, recognizing their unique struggles and triumphs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#eef9ff] to-[#f8f4ff] rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <span className="text-sm font-medium bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full inline-block">JOIN US</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Get Involved with Readlle</h2>
            <p className="text-gray-700 text-lg max-w-xl mx-auto">
              Be a part of our mission to make a difference in the lives of children with dyslexia. There are many ways to get involved:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Involvement Option 1 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
              <div className="text-indigo-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21c-4.418 0 -8 -3.582 -8 -8 0 -4.418 3.582 -8 8 -8 4.418 0 8 3.582 8 8 0 4.418 -3.582 8 -8 8z" />
                  <path d="M12 3v18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Donate</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Your contributions help us continue our research and development, and provide resources to children who need them.
              </p>
              <Link href="/donate" className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300">
                Make a Donation
              </Link>
            </div>

            {/* Involvement Option 2 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
              <div className="text-green-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-handshake" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 12h16" />
                  <path d="M4 16h16" />
                  <path d="M4 8h16" />
                  <path d="M10 4h4v4h-4z" />
                  <path d="M10 20h4v-4h-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Partner with Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We are looking for partners who share our vision and can help us reach more children and families.
              </p>
              <Link href="/partnerships" className="inline-block bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 transition-all duration-300">
                Explore Partnership Opportunities
              </Link>
            </div>

            {/* Involvement Option 3 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
              <div className="text-red-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-circle" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12c0 4.418 3.582 8 8 8h6l4 4v-4a8 8 0 0 0 0 -16h-6a8 8 0 0 0 -8 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Spread the Word</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Help us raise awareness about dyslexia and the innovative solutions Readlle offers.
              </p>
              <Link href="/resources" className="inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-700 transition-all duration-300">
                Access Resources to Share
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-8 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
            <div className="text-gray-600 text-sm">
              &copy; 2023 Readlle. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-gray-600 text-sm hover:text-indigo-600 transition-all duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-600 text-sm hover:text-indigo-600 transition-all duration-300">Terms of Service</Link>
            </div>
          </div>
          
          <div className="text-gray-500 text-xs">
            Made with ❤️ by the Readlle Team
          </div>
        </div>
      </footer> */}
    </main>
  );
}