"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import blogPostsData from '@/data/blogPosts.json';

type ContentBlock = {
  type: string;
  level?: number;
  content?: string; // Make content optional
  style?: string;
  items?: string[];
};

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  category: string;
  coverImage: string;
  excerpt: string;
  content: ContentBlock[];
};

const getRelatedPosts = (currentSlug: string, count: number = 2): BlogPost[] => {
  return (blogPostsData as BlogPost[])
    .filter((post: BlogPost) => post.slug !== currentSlug)
    .slice(0, count);
};

const formatReadingTime = (content: ContentBlock[]): string => {
  // Calculate approximate reading time based on content
  let totalWords = 0;
  
  content.forEach(block => {
    if (block.content) {
      totalWords += block.content.split(' ').length;
    }
    if (block.items) {
      block.items.forEach(item => {
        totalWords += item.split(' ').length;
      });
    }
  });
  
  // Average reading speed: 200 words per minute
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [readingTime, setReadingTime] = useState<string>('');

  useEffect(() => {
    // Find the post with the current slug
    const currentPost = (blogPostsData as BlogPost[]).find((p: BlogPost) => p.slug === slug) || null;
    setPost(currentPost);

    // Get related posts
    if (currentPost) {
      setRelatedPosts(getRelatedPosts(slug));
      setReadingTime(formatReadingTime(currentPost.content));
    }
  }, [slug]);

  // If post doesn't exist, show a 404 page
  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">Post not found</h1>
          <Link href="/blog" className="mt-8 inline-block text-indigo-600 hover:text-indigo-800">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'lead':
        return (
          <p key={index} className="text-xl leading-relaxed text-gray-700 mb-8 font-medium">
            {block.content}
          </p>
        );
      case 'heading':
        if (!block.content) return null;
        const HeadingTag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
        const headingClasses = block.level === 2 
          ? "text-2xl font-bold text-gray-800 mt-10 mb-4"
          : "text-xl font-bold text-gray-800 mt-8 mb-3";
        return (
          <HeadingTag key={index} className={headingClasses}>
            {block.content}
          </HeadingTag>
        );
      case 'paragraph':
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {block.content}
          </p>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-indigo-500 pl-6 italic text-gray-700 my-8 py-2">
            <p className="text-lg">{block.content}</p>
          </blockquote>
        );
      case 'list':
        if (block.style === 'ordered') {
          return (
            <ol key={index} className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
              {block.items?.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
              ))}
            </ol>
          );
        } else {
          return (
            <ul key={index} className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              {block.items?.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
              ))}
            </ul>
          );
        }
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff]">
      {/* Back to Blog Link */}
      <div className="pt-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
      
      {/* Article Header */}
      <header className="py-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="text-sm font-medium bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="relative w-12 h-12 mr-4">
                <Image 
                  src={post.author.image} 
                  alt={post.author.name} 
                  fill
                  sizes="48px"
                  className="rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <div>
                <div className="font-medium text-gray-800">{post.author.name}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{readingTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* Featured Image */}
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <article className="px-6 md:px-12 lg:px-24 py-8 bg-white rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents - only show if article has at least 3 headings */}
          {post.content.filter(block => block.type === 'heading' && block.level === 2 && block.content).length >= 3 && (
            <div className="bg-gray-50 p-6 rounded-xl mb-12">
              <h3 className="font-bold text-gray-800 mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-indigo-600">
                {post.content
                  .filter(block => block.type === 'heading' && block.level === 2 && block.content)
                  .map((heading, i) => (
                    <li key={i} className="hover:text-indigo-800 transition-colors">
                      <a href={`#${heading.content!.toLowerCase().replace(/\s+/g, '-')}`}>
                        {heading.content}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          
          {/* Article body */}
          <div className="article-content mb-12">
            {post.content.map((block, index) => renderContentBlock(block, index))}
          </div>
          
          {/* Share buttons */}
          <div className="border-t border-gray-200 pt-6 mb-12">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Share this article</div>
              <div className="flex space-x-4">
                <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="border-t border-gray-200 pt-10 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-indigo-50 p-6 rounded-2xl">
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <Image 
                  src={post.author.image} 
                  alt={post.author.name} 
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{post.author.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{post.author.role}</p>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-gray-200 pt-12 mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.slug} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <Image 
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 hover:text-indigo-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <div className="text-sm text-gray-500 mb-2">{relatedPost.date}</div>
                        <p className="text-gray-700 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Back to Blog Link */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </article>

      {/* Newsletter Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-indigo-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Enjoy this article?</h2>
          <p className="text-gray-700 mb-8">
            Subscribe to our newsletter to receive the latest insights on dyslexia, reading strategies, and educational resources.
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