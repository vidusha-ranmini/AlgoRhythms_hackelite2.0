"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import blogPosts from '@/data/blogPosts.json';

export default function BlogPage() {
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
              <span className="text-4xl">✏️</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Readlle Blog
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Insights, strategies, and resources for parents and educators supporting children with dyslexia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={post.coverImage}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author.name}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-5 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors inline-flex items-center mt-auto"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-indigo-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-700 mb-8">
            Get the latest articles, resources and tips to help your child succeed with reading.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-5 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button type="submit" className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-500 text-sm">
            &copy; 2025 Readlle. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}