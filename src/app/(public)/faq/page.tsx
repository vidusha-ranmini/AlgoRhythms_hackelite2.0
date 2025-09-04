"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// FAQ data
const faqData = [
  {
    question: "What is Readlle and how does it help children with dyslexia?",
    answer: "Readlle is an interactive learning platform designed specifically for children with dyslexia. We use evidence-based methods, engaging activities, and personalized learning paths to help children improve their reading skills. Our approach combines the latest research in neuroscience with fun, interactive technology to make reading enjoyable and accessible."
  },
  {
    question: "How do I know if my child has dyslexia?",
    answer: "Common signs of dyslexia include difficulty with phonological processing, trouble decoding words, slow reading, and spelling challenges. Readlle offers a free dyslexia identification quiz that can help you identify potential signs. However, a formal diagnosis should be made by a qualified professional. If you suspect your child may have dyslexia, we recommend taking our quiz and consulting with an educational psychologist or specialist."
  },
  {
    question: "What age group is Readlle suitable for?",
    answer: "Readlle is designed for children ages 5-12, with content tailored to different reading levels and abilities. Our platform adapts to your child's specific needs and grows with them as they progress in their reading journey."
  },
  {
    question: "How much time should my child spend on Readlle each day?",
    answer: "We recommend 15-20 minute sessions, 3-5 times per week for optimal results. Consistency is more important than duration. Our platform is designed to keep sessions engaging but not overwhelming, as we understand the attention challenges that can come with dyslexia."
  },
  {
    question: "Does Readlle work alongside school curriculum?",
    answer: "Yes! Readlle is designed to complement school learning. Our methods align with educational standards while providing the specialized support that children with dyslexia may not always receive in traditional classroom settings. Many teachers recommend Readlle as a supplementary tool for students who need extra reading support."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff]">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 bg-indigo-100 p-3 rounded-full">
              <span className="text-4xl">❓</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Frequently Asked Questions
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Find answers to common questions about Readlle and how our platform helps children with dyslexia discover the joy of reading.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">{faq.question}</h3>
                  <span className={`text-indigo-600 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-gray-700 bg-indigo-50">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">Still Have Questions?</h3>
            <p className="text-indigo-700 mb-6">Our support team is here to help with any additional questions you might have.</p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}