// components/ChatModal.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, MessageCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom Bot Avatar Component
const BotAvatar = () => (
  <div 
    className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden"
    style={{ backgroundColor: 'var(--tertiary)', border: '1px solid var(--border-color)' }}
  >
    <MessageCircle 
      size={16} 
      style={{ color: 'var(--foreground)' }}
    />
    <motion.div
      className="absolute -top-0.5 -right-0.5"
      animate={{
        rotate: [0, 360],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Sparkles size={8} className="text-blue-500" />
    </motion.div>
  </div>
);

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm an AI assistant representing [Your Name]. Ask me anything about my experience, skills, or projects!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[500px] rounded-lg shadow-xl z-50 flex flex-col overflow-hidden"
            style={{ 
              backgroundColor: 'var(--background)', 
              border: '1px solid var(--border-color)' 
            }}
          >
            {/* Header */}
            <div 
              className="text-white p-4 flex justify-between items-center"
              style={{
                background: 'linear-gradient(135deg, #151616ff, #4b4a4eff)'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center relative"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <MessageCircle size={20} className="text-white" />
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Sparkles size={12} className="text-yellow-300" />
                    </motion.div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Chat with AI Me</h3>
                  <p className="text-sm opacity-90">Ask about my experience & skills</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ backgroundColor: 'var(--tertiary)' }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-blue-500 ml-2' : 'mr-2'
                    }`}>
                      {message.sender === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <BotAvatar />
                      )}
                    </div>
                    <div 
                      className={`p-3 rounded-lg shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'rounded-bl-none'
                      }`}
                      style={
                        message.sender === 'bot' 
                          ? { 
                              backgroundColor: 'var(--background)', 
                              color: 'var(--foreground)',
                              border: '1px solid var(--border-color)'
                            }
                          : {}
                      }
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="mr-2">
                      <BotAvatar />
                    </div>
                    <div 
                      className="p-3 rounded-lg shadow-sm rounded-bl-none"
                      style={{ 
                        backgroundColor: 'var(--background)', 
                        border: '1px solid var(--border-color)' 
                      }}
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div 
              className="p-4 border-t"
              style={{ 
                backgroundColor: 'var(--background)',
                borderTopColor: 'var(--border-color)'
              }}
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border-color)'
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}