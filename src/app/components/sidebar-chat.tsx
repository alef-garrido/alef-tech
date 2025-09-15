'use client';

import { useSidebar } from '../context/sidebar-context';
import { useState } from 'react';

export default function SidebarChat() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome! How can I help you today?',
      sender: 'bot',
    },
  ]);

  if (!isSidebarOpen) {
    return null;
  }

  const handleOptionClick = (optionText: string) => {
    // Placeholder for handling option clicks
    console.log(optionText);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={closeSidebar}
    >
      <div
        className="relative h-full w-full md:w-1/2 bg-background shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex-shrink-0">
          <button onClick={closeSidebar} className="text-foreground">
            Close
          </button>
          <h2 className="text-lg font-bold mt-4 text-center">Chat</h2>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 my-2 rounded-lg ${
                message.sender === 'bot'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button
              onClick={() => handleOptionClick('Book a Consultation')}
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-2 px-4 rounded"
            >
              Book a Consultation
            </button>
            <button
              onClick={() => handleOptionClick('Explore Services')}
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-2 px-4 rounded"
            >
              Explore Services
            </button>
            <button
              onClick={() => handleOptionClick('Ask a General Question')}
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-2 px-4 rounded"
            >
              Ask a General Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
