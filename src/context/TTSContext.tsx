"use client";

import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';

interface TTSContextType {
  speak: (text: string, options?: SpeechOptions) => void;
  stop: () => void;
  isPaused: boolean;
  isPlaying: boolean;
  pause: () => void;
  resume: () => void;
  supported: boolean;
}

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

const TTSContext = createContext<TTSContextType>({
  speak: () => {},
  stop: () => {},
  isPaused: false,
  isPlaying: false,
  pause: () => {},
  resume: () => {},
  supported: false
});

interface TTSProviderProps {
  children: ReactNode;
}

export const TTSProvider = ({ children }: TTSProviderProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(false);

  // Check if speech synthesis is supported
  useEffect(() => {
    const isSpeechSynthesisSupported = 'speechSynthesis' in window;
    setSupported(isSpeechSynthesisSupported);
  }, []);

  const speak = useCallback((text: string, options?: SpeechOptions) => {
    if (!supported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options if provided
    if (options) {
      if (options.rate) utterance.rate = options.rate;
      if (options.pitch) utterance.pitch = options.pitch;
      if (options.volume) utterance.volume = options.volume;
      if (options.voice) utterance.voice = options.voice;
    }
    
    // Set default voice to be more child-friendly if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.includes('en'));
    if (englishVoices.length > 0) {
      // Try to find a female voice for a more gentle tone
      const femaleVoice = englishVoices.find(voice => voice.name.includes('female') || voice.name.includes('girl'));
      utterance.voice = femaleVoice || englishVoices[0];
    }
    
    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  }, [supported]);
  
  const stop = useCallback(() => {
    if (!supported) return;
    
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, [supported]);
  
  const pause = useCallback(() => {
    if (!supported || !isPlaying) return;
    
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [supported, isPlaying]);
  
  const resume = useCallback(() => {
    if (!supported || !isPaused) return;
    
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [supported, isPaused]);
  
  const value = {
    speak,
    stop,
    isPaused,
    isPlaying,
    pause,
    resume,
    supported
  };
  
  return (
    <TTSContext.Provider value={value}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);

export default TTSContext;