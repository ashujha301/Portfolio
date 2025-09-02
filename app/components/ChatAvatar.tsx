// components/ChatAvatar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ChatAvatarProps {
  onClick: () => void;
  isActive: boolean;
}

export default function ChatAvatar({ onClick, isActive }: ChatAvatarProps) {
  const [isWaving, setIsWaving] = useState(false);

  // Wave every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000); // Wave for 2 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={isActive ? { y: -10 } : { y: 0 }}
      onClick={onClick}
    >
      <div className="relative">
        <div 
          className="rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
          style={{
            background: 'var(--background)',
            border: '2px solid var(--border-color)'
          }}
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* AI Bot Icon */}
            <div 
              className="relative w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--tertiary)' }}
            >
              <MessageCircle 
                size={24} 
                style={{ color: 'var(--foreground)' }}
              />
              
              {/* AI Sparkles Effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={isWaving ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  transition: { duration: 1, repeat: 1 }
                } : {
                  rotate: [0, 360],
                  transition: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
              >
                <Sparkles 
                  size={16} 
                  className="text-blue-500"
                />
              </motion.div>
              
              {/* Pulsing AI indicator */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-blue-400"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white font-bold">!</span>
        </motion.div>
      </div>
    </motion.div>
  );
}