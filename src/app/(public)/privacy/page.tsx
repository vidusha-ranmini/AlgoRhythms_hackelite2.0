"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
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
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
              Privacy Policy
            </h1>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Last Updated: May 15, 2023
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-10">
              <p className="text-blue-800">
                At Readle, protecting your privacy and the privacy of children is our highest priority. This Privacy Policy explains how we collect, use, and safeguard information, particularly for users under 13 years of age, in compliance with the Children&rsquo;s Online Privacy Protection Act (COPPA).
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-indigo-900 border-b border-indigo-100 pb-2">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800">1.1 From Parents/Guardians</h3>
            <p className="mb-4">
              We collect the following information from parents or guardians:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Account preferences</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800">1.2 From Children</h3>
            <p className="mb-4">
              We limit the collection of personal information from children under 13 to what is reasonably necessary for them to participate in our educational activities. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>First name (or a nickname)</li>
              <li>Age or grade level</li>
              <li>Learning progress data</li>
              <li>Reading assessment results</li>
              <li>Time spent on various activities</li>
            </ul>
            <p className="mb-4">
              We do not collect more detailed personal information from children, such as last names, contact information, or precise geolocation, without verifiable parental consent.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-800">1.3 Passive Collection</h3>
            <p className="mb-4">
              Our service automatically collects certain information through cookies and similar technologies:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Device identifiers</li>
              <li>IP addresses</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Access times and dates</li>
              <li>Pages viewed</li>
            </ul>
            <p className="mb-4">
              This information is used to improve our service, maintain security, and analyze usage patterns.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">2. How We Use Information</h2>
            
            <p className="mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our educational platform</li>
              <li>Personalize learning experiences based on reading level and progress</li>
              <li>Process transactions and manage accounts</li>
              <li>Send administrative information, such as updates and security alerts</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Generate anonymized, aggregated data for research on dyslexia and reading interventions</li>
              <li>Protect the security and integrity of our platform</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">3. Information Storage and Security</h2>
            
            <p className="mb-4">
              We implement appropriate physical, technical, and administrative measures to protect the information we collect and maintain:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All data is encrypted in transit and at rest</li>
              <li>Access to personal information is restricted to authorized personnel only</li>
              <li>Regular security assessments and audits are conducted</li>
              <li>Children&apos;s data is stored separately with additional protections</li>
              <li>We retain data only as long as necessary to provide our services or as required by law</li>
            </ul>
            <p className="mb-4">
              While we take all reasonable precautions, no security system is impenetrable. We cannot guarantee the absolute security of your information.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">4. Information Sharing</h2>
            
            <p className="mb-4">
              We do not sell, rent, or trade personal information to third parties. We may share information in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With service providers who help us operate our platform (e.g., hosting, payment processing)</li>
              <li>With schools or educational institutions, if the account is established through them</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a corporate transaction, such as a merger or acquisition</li>
            </ul>
            <p className="mb-4">
              All third-party service providers are contractually obligated to use the information solely for providing services to us and to maintain appropriate security measures.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">5. Parental Rights</h2>
            
            <p className="mb-4">
              Parents/guardians have the right to review, delete, and control the use of personal information collected from their children. You may:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Review the personal information we have collected from your child</li>
              <li>Request that we delete your child&rsquo;s personal information</li>
              <li>Refuse to allow further collection or use of your child&rsquo;s information</li>
              <li>Agree to the collection and use of your child&rsquo;s information but not allow disclosure to third parties</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact our Privacy Team at <a href="mailto:privacy@readle.com" className="text-indigo-600 hover:text-indigo-800">privacy@readle.com</a>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">6. Your Rights</h2>
            
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to certain processing activities</li>
              <li>Data portability</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the information in the &quot;Contact Us&quot; section below.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">7. International Data Transfers</h2>
            
            <p className="mb-4">
              Our services are primarily operated in the United States. If you access our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the U.S. where our servers are located.
            </p>
            <p className="mb-4">
              By using our services, you consent to the transfer of your information to the U.S., which may have different data protection rules than those of your country.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">8. Changes to This Privacy Policy</h2>
            
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this policy.
            </p>
            <p className="mb-4">
              For material changes that impact the collection or use of children&rsquo;s personal information, we will seek parental consent before implementing those changes with respect to information already collected from children.
            </p>
            <p className="mb-4">
              We encourage you to review the Privacy Policy whenever you access our services to stay informed about our information practices.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-900 border-b border-indigo-100 pb-2">9. Contact Us</h2>
            
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            
            <div className="bg-indigo-50 p-6 rounded-xl mt-6">
              <p className="mb-2"><strong>Readle Inc.</strong></p>
              <p className="mb-2">Attn: Privacy Team</p>
              <p className="mb-2">123 Reading Lane</p>
              <p className="mb-2">Literacy City, RC 10101</p>
              <p className="mb-2">United States</p>
              <p className="mb-2">Email: <a href="mailto:privacy@readle.com" className="text-indigo-600 hover:text-indigo-800">privacy@readle.com</a></p>
              <p>Phone: 1-800-READLE-1</p>
            </div>

            <div className="mt-16 text-center">
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-800 font-medium">View our Terms of Service</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}