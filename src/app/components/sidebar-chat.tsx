'use client';

import { useState, useRef, useEffect } from 'react';
import { useSidebar } from '../context/sidebar-context';
import LeadCaptureForm from './lead-capture-form';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function SidebarChat() {
  const { isSidebarOpen, closeSidebar, activeFlow, clearFlow, leadData, updateLeadData } = useSidebar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const flowInitializedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Auto-send trigger message when flow is active
  useEffect(() => {
    if (activeFlow && isSidebarOpen && !flowInitializedRef.current) {
      flowInitializedRef.current = true;
      const triggerMsg: Message = {
        sender: 'ai',
        text: activeFlow.triggerMessage,
      };
      setMessages([triggerMsg]);
    }
  }, [activeFlow, isSidebarOpen]);

  // Reset flow initialization when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      flowInitializedRef.current = false;
      setMessages([]);
      clearFlow();
    }
  }, [isSidebarOpen, clearFlow]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          flowId: activeFlow?.id,
          systemPrompt: activeFlow?.systemPrompt,
          leadData: leadData,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage: Message = { sender: 'ai', text: data.text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Sorry, I am having trouble connecting. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-end"
      onClick={closeSidebar}
    >
      <div
        className="relative h-full w-full md:w-1/3 lg:w-1/4 bg-background shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">{activeFlow ? activeFlow.name : 'AI Assistant'}</h2>
          <button onClick={closeSidebar} className="text-foreground">
            &times;
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Lead Capture Form */}
            {activeFlow && <LeadCaptureForm />}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">
                  <p className="text-sm animate-pulse">...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-input text-foreground px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:bg-gray-500"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
