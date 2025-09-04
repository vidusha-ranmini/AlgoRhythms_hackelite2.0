// filepath: d:\Readle\src\app\(public)\terms\page.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("");
  
  // Handle smooth scrolling and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
              <span className="text-4xl">📝</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Terms of Service
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Last Updated: May 15, 2023
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Navigation Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Table of Contents</h3>
                <nav className="space-y-2">
                  {[
                    { id: "agreement", label: "Agreement" },
                    { id: "definitions", label: "Definitions" },
                    { id: "account", label: "Account Creation" },
                    { id: "usage", label: "Usage Rights" },
                    { id: "restrictions", label: "Restrictions" },
                    { id: "payment", label: "Payment Terms" },
                    { id: "cancellation", label: "Cancellation" },
                    { id: "privacy", label: "Privacy Policy" },
                    { id: "disclaimers", label: "Disclaimers" },
                    { id: "liability", label: "Limitation of Liability" },
                    { id: "changes", label: "Changes to Terms" },
                    { id: "contact", label: "Contact Us" }
                  ].map(item => (
                    <a 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block py-2 px-4 rounded-lg cursor-pointer transition-colors ${
                        activeSection === item.id ? 
                        'bg-indigo-600 text-white' : 
                        'hover:bg-indigo-100 text-gray-700'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Terms Content */}
            <div className="lg:w-3/4">
              <div className="prose prose-lg max-w-none">
                <section id="agreement" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">1. Agreement</h2>
                  <p className="mb-4">
                    By accessing or using the Readle platform, website, and services (collectively referred to as the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you disagree with any part of these terms, you may not access the Service.
                  </p>
                  <p className="mb-4">
                    These Terms constitute a legally binding agreement between you and Readle Inc. (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) regarding your use of the Service. The Service is intended for use by individuals who are at least 18 years old or by minors with parental consent.
                  </p>
                </section>

                <section id="definitions" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">2. Definitions</h2>
                  <p className="mb-4">
                    <strong>&ldquo;Content&rdquo;</strong> refers to all materials found on the Service, including text, images, audio, video, graphics, and software.
                  </p>
                  <p className="mb-4">
                    <strong>&ldquo;User&rdquo;</strong> refers to any individual who accesses or uses the Service.
                  </p>
                  <p className="mb-4">
                    <strong>&ldquo;Account&rdquo;</strong> refers to a registered profile on the Service that allows access to features, content, and functionality.
                  </p>
                </section>

                <section id="account" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">3. Account Creation</h2>
                  <p className="mb-4">
                    To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                  </p>
                  <p className="mb-4">
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We encourage you to use &ldquo;strong&rdquo; passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
                  </p>
                  <p className="mb-4">
                    You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </section>

                <section id="usage" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">4. Usage Rights</h2>
                  <p className="mb-4">
                    Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use the Service for its intended purposes.
                  </p>
                  <p className="mb-4">
                    All content provided through the Service is owned by the Company or its licensors and is protected by intellectual property laws. You may not use, copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any content for any other purposes without the prior written consent of the respective owners.
                  </p>
                </section>

                <section id="restrictions" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">5. Restrictions</h2>
                  <p className="mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
                    <li>Violate or encourage others to violate the rights of third parties, including intellectual property rights</li>
                    <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                    <li>Attempt to gain unauthorized access to the Service, user accounts, or computer systems or networks</li>
                    <li>Collect or harvest any information from the Service, including user account information</li>
                    <li>Use automated means, including spiders, robots, crawlers, or data mining tools, to download data from the Service</li>
                  </ul>
                </section>

                <section id="payment" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">6. Payment Terms</h2>
                  <p className="mb-4">
                    Some aspects of the Service may be provided for a fee. You will be required to select a payment plan and provide accurate information regarding your payment method.
                  </p>
                  <p className="mb-4">
                    By submitting such payment information, you automatically authorize us to charge all subscription fees incurred through your account to any such payment instruments. All payments are non-refundable except as expressly set forth in these Terms.
                  </p>
                  <p className="mb-4">
                    We reserve the right to change our pricing at any time. If we do change prices, we will provide notice of the change on the Site or in email to you, at our option, at least 14 days before the change takes effect.
                  </p>
                </section>

                <section id="cancellation" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">7. Cancellation</h2>
                  <p className="mb-4">
                    You may cancel your subscription at any time. Upon cancellation, your access to premium features will continue until the end of your current billing cycle, but you will not receive a refund for any fees already paid.
                  </p>
                </section>

                <section id="privacy" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">8. Privacy Policy</h2>
                  <p className="mb-4">
                    Please refer to our <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</Link> for information about how we collect, use, and disclose information about you.
                  </p>
                </section>

                <section id="disclaimers" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">9. Disclaimers</h2>
                  <p className="mb-4">
                    THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                  </p>
                  <p className="mb-4">
                    The Company does not warrant that: (a) the Service will function uninterrupted, secure, or available at any particular time or location; (b) any errors or defects will be corrected; (c) the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements.
                  </p>
                </section>

                <section id="liability" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">10. Limitation of Liability</h2>
                  <p className="mb-4">
                    IN NO EVENT SHALL THE COMPANY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                  </p>
                </section>

                <section id="changes" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">11. Changes to Terms</h2>
                  <p className="mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&rsquo; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                  <p className="mb-4">
                    By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                  </p>
                </section>

                <section id="contact" className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">12. Contact Us</h2>
                  <p className="mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <p className="mb-2"><strong>Readle Inc.</strong></p>
                    <p className="mb-2">123 Reading Lane</p>
                    <p className="mb-2">Literacy City, RC 10101</p>
                    <p className="mb-2">United States</p>
                    <p className="mb-2">Email: <a href="mailto:legal@readle.com" className="text-indigo-600 hover:text-indigo-800">legal@readle.com</a></p>
                    <p>Phone: 1-800-READLE-1</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}