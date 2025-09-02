// components/ChatWidget.tsx
'use client';
import React, { useState } from 'react';
import ChatAvatar from './ChatAvatar';
import ChatModal from './ChatModal';

export default function ChatWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ChatAvatar 
        onClick={toggleModal}
        isActive={isModalOpen}
      />
      <ChatModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}