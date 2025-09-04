"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4 bg-[#E0E7FF] p-3 rounded-full">
                <span className="text-4xl">📚</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                Confident Reading Starts Here
              </h1>
              <p className="text-lg mb-8 text-[#6B7280] leading-relaxed">
                Empower your child with dyslexia to enjoy reading with
                <span className="underline decoration-[#F59E0B] decoration-4"> interactive, proven methods </span>
                designed specifically for their unique learning needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/features" className="group px-8 py-3 border-2 border-[#D1D5DB] bg-white hover:border-[#4F46E5] hover:bg-[#E0E7FF] transition-all duration-300 text-center rounded-xl flex items-center justify-center gap-2">
                  <span>Learn More</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                <Link href="/signup" className="px-8 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 text-center">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/hero-image.png"
              alt="Children enjoying reading"
              width={550}
              height={450}
              className="mx-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-12 lg:px-24 bg-white scroll-mt-16 rounded-t-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-[#D1FAE5] text-[#10B981] px-4 py-1.5 rounded-full">FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2 text-[#1F2937]">How Readlle Helps Your Child</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">Tools designed with dyslexic readers in mind</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#F3F4F6] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-[#E0E7FF] rounded-full flex items-center justify-center p-5 group-hover:bg-[#C7D2FE] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Personalized Assessments</h3>
              <p className="text-[#6B7280]">
                Our specialized quiz analyzes your child&rsquo;s specific reading challenges and creates a personalized learning path.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F3F4F6] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-[#FEF3C7] rounded-full flex items-center justify-center p-5 group-hover:bg-[#FDE68A] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Engaging Activities</h3>
              <p className="text-[#6B7280]">
                Fun, interactive games and exercises designed by experts to improve reading skills while keeping children motivated.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F3F4F6] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-[#D1FAE5] rounded-full flex items-center justify-center p-5 group-hover:bg-[#A7F3D0] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Progress Tracking</h3>
              <p className="text-[#6B7280]">
                Detailed insights on your child&rsquo;s development with visual progress reports and achievement milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24 scroll-mt-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-[#E0E7FF] text-[#4F46E5] px-4 py-1.5 rounded-full">JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2 text-[#1F2937]">How It Works</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">Follow these simple steps to get started with Readlle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-t-4 border-[#4F46E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-[#E0E7FF] p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image.png" alt="Create Account" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#1F2937]">Create Account</h3>
                <p className="text-[#6B7280]">Join Readlle and set up your profile to begin your child&apos;s reading journey.</p>
              </div>
            </div>

            <div className="bg-white p-8 border-t-4 border-[#3B82F6] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-[#DBEAFE] p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image-1.png" alt="Setup Parent" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#1F2937]">Setup Parent</h3>
                <p className="text-[#6B7280]">Customize your dashboard to monitor progress and set preferences for your child.</p>
              </div>
            </div>

            <div className="bg-white p-8 border-t-4 border-[#EF4444] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-[#FEE2E2] p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image-2.png" alt="Setup Child" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#1F2937]">Setup Child</h3>
                <p className="text-[#6B7280]">Create a profile for your child that personalizes their reading experience.</p>
              </div>
            </div>

            <div className="bg-white p-8 border-t-4 border-[#10B981] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-[#D1FAE5] p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image-3.png" alt="Start Learning" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#1F2937]">Start Learning</h3>
                <p className="text-[#6B7280]">
                  Access fun games and activities specifically designed for children with dyslexia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dyslexia Quiz Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto bg-[#F3F4F6] p-10 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-4 text-[#1F2937]">Is Your Child Struggling with Reading?</h2>
              <p className="mb-8 text-lg text-[#6B7280]">Take our internationally recognized dyslexia identification quiz to see if your child might need specialized support.</p>
              <Link href="/quiz/start" className="px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 inline-flex items-center">
                <span>Start Free Quiz</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="md:w-1/3">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Child reading with focused expression"
                width={400}
                height={320}
                className="mx-auto rounded-xl drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 md:px-12 lg:px-24 bg-[#F9FAFB] scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-[#FEF3C7] text-[#F59E0B] px-4 py-1.5 rounded-full">SUCCESS STORIES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2 text-[#1F2937]">What Parents Are Saying</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">Real experiences from families using Readlle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#4F46E5] rounded-full p-4 mr-4 text-white font-bold text-xl">
                  ST
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1F2937]">Sarah Thompson</p>
                  <p className="text-[#6B7280] text-sm">Mother of Alex, 8</p>
                  <div className="flex text-[#F59E0B]">★★★★★</div>
                </div>
              </div>
              <p className="text-[#1F2937] text-lg italic">
                &ldquo;Before Readlle, my son avoided reading at all costs. Now he actively asks to practice! The games make learning fun, and I&rsquo;ve seen remarkable progress in just a few months.&rdquo;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#3B82F6] rounded-full p-4 mr-4 text-white font-bold text-xl">
                  MJ
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1F2937]">Michael Johnson</p>
                  <p className="text-[#6B7280] text-sm">Father of Emily, 10</p>
                  <div className="flex text-[#F59E0B]">★★★★★</div>
                </div>
              </div>
              <p className="text-[#1F2937] text-lg italic">
                &ldquo;The personalized approach makes all the difference. My daughter&rsquo;s teacher has noticed significant improvement in her reading confidence. The progress tracking helps us celebrate every win.&rdquo;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#4F46E5] rounded-full p-4 mr-4 text-white font-bold text-xl">
                  TM
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1F2937]">Tina M.</p>
                  <div className="flex text-[#F59E0B]">★★★★★</div>
                </div>
              </div>
              <p className="text-[#1F2937] text-lg italic">
                &ldquo;My child loves the games and activities! They&rsquo;ve made learning to read enjoyable instead of frustrating.&rdquo;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#10B981] rounded-full p-4 mr-4 text-white font-bold text-xl">
                  MP
                </div>
                <div>
                  <p className="font-bold text-lg text-[#1F2937]">Michael P.</p>
                  <div className="flex text-[#F59E0B]">★★★★★</div>
                </div>
              </div>
              <p className="text-[#1F2937] text-lg italic">
                &ldquo;Great platform for building literacy skills. The dyslexia identification quiz helped us understand our son&rsquo;s challenges.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">Contact Us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">We&apos;re here to help with any questions</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-indigo-50 p-10 shadow-lg rounded-2xl max-w-3xl mx-auto">
            <p className="text-center mb-10 text-lg text-gray-700">
              Have questions about how Readlle can help your child? Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="text-lg">support@Readlle.com</span>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span className="text-lg">1-800-Readlle-1</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#4F46E5] text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Child&rsquo;s Reading Experience?</h2>
          <p className="text-xl mb-10 text-white opacity-90 max-w-2xl mx-auto">
            Join thousands of families who&rsquo;ve discovered the joy of reading with Readlle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/signup" className="px-10 py-4 bg-white text-[#4F46E5] font-medium rounded-xl hover:bg-[#F9FAFB] transition-all duration-300 text-center shadow-lg">
              Sign Up Free
            </Link>
            <Link href="/learn-more" className="px-10 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white hover:text-[#4F46E5] transition-all duration-300 text-center">
              Learn More
            </Link>
          </div>
          <p className="mt-6 text-white opacity-75 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>
    </main>
  );
}