"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function AccountPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "en",
    notifications: {
      childProgress: true,
      newActivities: true,
      tips: true,
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: "Kasun Perera",
        email: user.email || "john.doe@example.com",
        language: user.preferences?.language || "en",
        notifications: (typeof user.preferences?.notifications === 'object') 
          ? user.preferences.notifications 
          : {
              childProgress: true,
              newActivities: true,
              tips: true,
            }
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // In a real app, you would send this to your backend
    console.log("Saving user data:", formData);
    
    setSaveSuccess(true);
    setIsSaving(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-indigo-800">Please log in</h1>
          <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-xl">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const childrenData = [
    { id: 1, name: "Shenaya", initial: "E", age: 7, level: "Beginner" },
    { id: 2, name: "Noah", initial: "N", age: 9, level: "Intermediate" },
    { id: 3, name: "Olivia", initial: "O", age: 6, level: "Beginner" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-1">
            Account Settings
          </h1>
          <p className="text-indigo-600">Manage your profile and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Personal Information */}
          <div className="md:col-span-2 space-y-8">
            {/* Account Form */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
              <form onSubmit={handleSaveChanges} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block mb-2 font-medium text-gray-700">
                    Preferred Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  {saveSuccess && (
                    <span className="text-green-600">Changes saved successfully!</span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-colors"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-gray-800">Child Progress Updates</h3>
                    <p className="text-sm text-gray-600">Receive updates when your child completes activities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      name="childProgress"
                      checked={formData.notifications.childProgress}
                      onChange={handleCheckboxChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">New Activities</h3>
                    <p className="text-sm text-gray-600">Get notified when new reading activities are available</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      name="newActivities"
                      checked={formData.notifications.newActivities}
                      onChange={handleCheckboxChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">Reading Tips & Resources</h3>
                    <p className="text-sm text-gray-600">Receive helpful reading tips for parents/teachers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      name="tips"
                      checked={formData.notifications.tips}
                      onChange={handleCheckboxChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Children & Delete */}
          <div className="md:col-span-1 space-y-8">
            {/* Child Accounts Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Child Accounts</h2>
              <div className="space-y-3">
                {childrenData.map((child) => (
                  <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold text-indigo-700">{child.initial}</span>
                      </div>
                      <div>
                        <p className="font-medium">{child.name}</p>
                        <p className="text-xs text-gray-600">{child.age} years • {child.level}</p>
                      </div>
                    </div>
                    <Link href={`/child/${child.id}`} className="text-indigo-600 hover:text-indigo-800">
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  href="/child-setup" 
                  className="flex items-center justify-center w-full py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Child Account
                </Link>
              </div>
            </div>
            
            {/* Subscription Info */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subscription</h2>
              <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-indigo-800">Family Plan</p>
                    <p className="text-sm text-gray-600">Active until Jun 24, 2026</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                </div>
              </div>
              <Link 
                href="/subscription" 
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                Manage subscription
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Delete Account Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
              <p className="mb-4 text-gray-700 text-sm">
                Deleting your account will permanently remove all your data, including your children&apos;s reading progress.
              </p>
              
              {deleteConfirm ? (
                <div className="border border-red-300 bg-red-50 p-4 rounded-lg">
                  <p className="mb-4 text-sm font-medium">Are you sure? This action cannot be undone.</p>
                  <div className="flex gap-3">
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 text-sm rounded-lg transition-colors"
                      onClick={() => console.log("Account would be deleted here")}
                    >
                      Yes, Delete
                    </button>
                    <button 
                      className="bg-gray-200 hover:bg-gray-300 py-2 px-3 text-sm rounded-lg transition-colors"
                      onClick={() => setDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="text-red-600 border border-red-300 hover:bg-red-50 py-2 px-4 rounded-lg text-sm transition-colors"
                  onClick={() => setDeleteConfirm(true)}
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}