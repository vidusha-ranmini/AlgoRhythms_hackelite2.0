"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ReadleChatbot from './ReadleChatbot';

const FloatingChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 1
                }}
            >
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(true)}
                            className="w-16 h-16 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
                        >
                            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform z-10" />

                            {/* Pulse animation */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#4F46E5]"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.4, 0.1, 0.4],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Tooltip */}
                            <motion.div
                                className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#1F2937] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                            >
                                Ask Readle AI Assistant
                                <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1F2937]"></div>
                            </motion.div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Chatbot Modal - Slide in from bottom-right */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-end justify-end p-4 md:p-6"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{
                                x: "100%",
                                y: "100%",
                                scale: 0.8,
                                opacity: 0
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 1,
                                opacity: 1
                            }}
                            exit={{
                                x: "100%",
                                y: "100%",
                                scale: 0.8,
                                opacity: 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.5
                            }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[500px] md:h-[600px] flex flex-col overflow-hidden border border-gray-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            {/* <div className="bg-[#4F46E5] text-white p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Readle AI Assistant</h3>
                                        <p className="text-sm text-white opacity-80">Here to help you</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div> */}

                            {/* Content */}
                            <div className="flex-1 overflow-hidden">
                                <ReadleChatbot isOpen={true} onClose={() => setIsOpen(false)} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingChatbot;
