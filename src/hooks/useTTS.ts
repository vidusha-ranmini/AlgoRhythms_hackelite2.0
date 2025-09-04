import { useTTS as useContextTTS } from '../context/TTSContext';

// This hook is a convenient re-export of the context's useTTS function
// It can be extended with additional functionality specific to hooks if needed
export const useTTS = () => {
  const tts = useContextTTS();
  
  return {
    ...tts,
    // Add any additional hook-specific functionality here
    speakWithHighlight: (text: string, elementId: string) => {
      // Example of extended functionality: highlight text while speaking
      const element = document.getElementById(elementId);
      if (element) {
        element.classList.add('highlight-text');
        
        tts.speak(text, { rate: 0.9 }); // Slightly slower for better clarity
        
        // Remove highlight when done speaking
        const checkIfDone = setInterval(() => {
          if (!tts.isPlaying) {
            element.classList.remove('highlight-text');
            clearInterval(checkIfDone);
          }
        }, 500);
      } else {
        tts.speak(text);
      }
    },
    
    speakSlowly: (text: string) => {
      tts.speak(text, { rate: 0.7, pitch: 1.1 });
    }
  };
};

export default useTTS;