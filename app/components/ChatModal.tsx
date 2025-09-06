// components/ChatModal.tsx
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, MessageCircle, Sparkles, AlertCircle, Shield } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Security configuration
const SECURITY_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  MIN_MESSAGE_LENGTH: 1,
  TYPING_DELAY: 1000, // (kept for reference; no longer throttling keystrokes)
  MAX_MESSAGES_PER_SESSION: 20,
};

// Input sanitization used while typing (do NOT trim here)
function sanitizeForInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

// Input sanitization used right before sending (includes trim)
function sanitizeForSend(input: string): string {
  return sanitizeForInput(input).trim();
}

// Content validation (client-side pre-check)
function validateMessage(message: string): { isValid: boolean; reason?: string } {
  if (message.length < SECURITY_CONFIG.MIN_MESSAGE_LENGTH) {
    return { isValid: false, reason: 'Please enter a message' };
  }
  if (message.length > SECURITY_CONFIG.MAX_MESSAGE_LENGTH) {
    return { isValid: false, reason: `Message too long (max ${SECURITY_CONFIG.MAX_MESSAGE_LENGTH} characters)` };
  }
  // Check for excessive repeated characters
  if (/(.)\1{20,}/.test(message)) {
    return { isValid: false, reason: 'Please avoid excessive repeated characters' };
  }
  return { isValid: true };
}

// Custom Bot Avatar Component
const BotAvatar = () => (
  <div
    className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden"
    style={{ backgroundColor: 'var(--tertiary)', border: '1px solid var(--border-color)' }}
  >
    <MessageCircle size={16} style={{ color: 'var(--foreground)' }} />
    <motion.div
      className="absolute -top-0.5 -right-0.5"
      animate={{ rotate: [0, 360], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      <Sparkles size={8} className="text-blue-500" />
    </motion.div>
  </div>
);

// Loading animation component
const TypingIndicator = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  </div>
);

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text:
        "Hi there! 👋 I'm an AI assistant representing Ayush Jha, a Software Engineer with 2+ years of experience. Feel free to ask me about my skills, projects, experience, or anything related to my professional background!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitEndTime, setRateLimitEndTime] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Body scroll lock effect (preserves layout without fighting inner scroll)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Rate limit countdown
  useEffect(() => {
    if (isRateLimited && rateLimitEndTime > 0) {
      const interval = setInterval(() => {
        const now = Date.now();
        if (now >= rateLimitEndTime) {
          setIsRateLimited(false);
          setRateLimitEndTime(0);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRateLimited, rateLimitEndTime]);

  // Handle input change — no throttling, no trim (fixes spacebar)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeForInput(e.target.value);
    setInput(value);
  };

  // Use onKeyDown instead of onKeyPress (fixes Enter handling + browser quirks)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input || isLoading || isRateLimited) return;

    // Check message count limit
    if (messageCount >= SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "You've reached the maximum number of messages for this session. Please refresh to continue.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Sanitize + trim only at send time
    const messageText = sanitizeForSend(input);
    const validation = validateMessage(messageText);
    if (!validation.isValid) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: validation.reason || 'Invalid message',
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setMessageCount((prev) => prev + 1);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setIsRateLimited(true);
          if (data.retryAfter) {
            setRateLimitEndTime(Date.now() + data.retryAfter * 1000);
          }
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (data.success && data.reply) {
        const sanitizedReply = sanitizeForInput(data.reply).trim();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: sanitizedReply,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'No response received');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);

      let errorMessage = "I'm having trouble connecting right now. Please try again in a moment!";
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again with a shorter message.';
      } else if (error.message?.includes('401')) {
        errorMessage = "I'm experiencing authentication issues. Please try again later.";
      } else if (error.message?.includes('429')) {
        errorMessage = error.message.includes('Rate limit')
          ? error.message
          : "I'm receiving too many requests right now. Please wait a moment and try again.";
      } else if (error.message?.includes('Failed to fetch')) {
        errorMessage = "I can't connect to the server right now. Please check your internet connection and try again.";
      } else if (error.message?.includes('blocked')) {
        errorMessage = 'Your access has been temporarily limited. Please try again later.';
      }

      const errorBotMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Chat cleared! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setMessageCount(0);
    setIsRateLimited(false);
    setRateLimitEndTime(0);
  };

  // Sample questions for users
  const sampleQuestions = [
    "What's your experience with React?",
    'Tell me about your projects',
    'What technologies do you work with?',
    "What's your background?",
  ];

  const handleSampleQuestion = (question: string) => {
    if (isLoading || isRateLimited) return;
    setInput(question);
    inputRef.current?.focus();
  };

  // Calculate remaining time for rate limit
  const getRemainingTime = () => {
    if (!isRateLimited || rateLimitEndTime === 0) return 0;
    return Math.max(0, Math.ceil((rateLimitEndTime - Date.now()) / 1000));
  };

  const isInputDisabled = isLoading || isRateLimited || messageCount >= SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION;

  // Handle backdrop click - close only if clicked on backdrop, not modal content
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6"
          style={{
            background: 'rgba(20, 20, 30, 0.25)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          }}
          onClick={handleBackdropClick}
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-2xl h-[85vh] sm:h-[75vh] rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl"
            style={{
              background: 'rgba(30, 30, 40, 0.65)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-white px-6 py-4 flex justify-between items-center border-b border-white/10 bg-transparent">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center relative"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <MessageCircle size={20} className="text-white" />
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={12} className="text-yellow-300" />
                    </motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">Chat with AI Ayush</h3>
                    <span title="Secured with rate limiting and input validation">
                      <Shield size={14} className="text-green-400" />
                    </span>
                  </div>
                  <p className="text-sm opacity-90">
                    Ask about experience, skills & projects ({messageCount}/{SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION})
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg白/20 transition-colors"
                  disabled={isLoading}
                >
                  Clear
                </button>
                <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Rate limit warning */}
            {isRateLimited && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-2 bg-orange-500/20 border-b border-orange-500/30"
              >
                <div className="flex items-center space-x-2 text-orange-200">
                  <AlertCircle size={16} />
                  <span className="text-sm">Rate limited. Please wait {getRemainingTime()} seconds before sending another message.</span>
                </div>
              </motion.div>
            )}

            {/* Messages (scrollable area) */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-transparent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30"
              style={{
                // Ensures smooth, momentum scrolling on iOS and proper wheel behavior on desktop
                WebkitOverflowScrolling: 'touch',
                touchAction: 'manipulation',
                // You can remove this if it interferes with nested scroll on some Android browsers:
                // overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' ? 'bg-blue-500 ml-2' : 'mr-2'
                      }`}
                    >
                      {message.sender === 'user' ? <User size={16} className="text-white" /> : <BotAvatar />}
                    </div>
                    <div
                      className={`p-3 rounded-lg shadow-sm ${
                        message.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : `rounded-bl-none ${message.isError ? 'border-red-300' : ''}`
                      }`}
                      style={
                        message.sender === 'bot'
                          ? {
                              backgroundColor: message.isError ? 'rgba(254, 226, 226, 0.1)' : 'var(--background)',
                              color: message.isError ? '#ef4444' : 'var(--foreground)',
                              border: `1px solid ${message.isError ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-color)'}`,
                            }
                          : {}
                      }
                    >
                      {message.isError && (
                        <div className="flex items-center space-x-1 mb-1">
                          <AlertCircle size={12} className="text-red-400" />
                          <span className="text-xs text-red-400">Error</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="mr-2">
                      <BotAvatar />
                    </div>
                    <div className="p-3 rounded-lg shadow-sm rounded-bl-none" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border-color)' }}>
                      <TypingIndicator />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Sample Questions */}
              {messages.length === 1 && !isLoading && !isRateLimited && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="px-2">
                  <p className="text-white/70 text-sm mb-2">Try asking:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSampleQuestion(question)}
                        className="text-left p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isInputDisabled}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Session limit warning */}
              {messageCount >= SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION - 3 &&
                messageCount < SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2 mx-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                    <div className="flex items-center space-x-2 text-yellow-200">
                      <AlertCircle size={16} />
                      <span className="text-sm">
                        You have {SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION - messageCount} messages left in this session.
                      </span>
                    </div>
                  </motion.div>
                )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-white/10 bg-transparent">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isRateLimited
                      ? `Rate limited - wait ${getRemainingTime()}s...`
                      : messageCount >= SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION
                      ? 'Session limit reached - refresh to continue'
                      : 'Ask me anything about my professional experience...'
                  }
                  className={`flex-1 rounded-xl px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 border transition-all ${
                    isInputDisabled ? 'bg-white/5 border-white/5 cursor-not-allowed' : 'bg-white/10 border-white/10 focus:ring-blue-400'
                  }`}
                  disabled={isInputDisabled}
                  maxLength={SECURITY_CONFIG.MAX_MESSAGE_LENGTH}
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input || isInputDisabled}
                  className={`text-white p-3 rounded-xl transition-all flex items-center justify-center min-w-[48px] ${
                    isInputDisabled || !input ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  title={
                    isRateLimited ? 'Rate limited' : messageCount >= SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION ? 'Session limit reached' : 'Send message'
                  }
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-1 flex justify-between text-white/50 text-xs">
                <span>
                  {isRateLimited && `Rate limited for ${getRemainingTime()}s`}
                  {messageCount >= SECURITY_CONFIG.MAX_MESSAGES_PER_SESSION && 'Session limit reached'}
                </span>
                <span>{input.length}/{SECURITY_CONFIG.MAX_MESSAGE_LENGTH}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}