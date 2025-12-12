'use client';

import { useState, useRef, useEffect } from 'react';
import { useSidebar } from '../context/sidebar-context';
import LeadCaptureForm from './lead-capture-form';
import { saveConversation, loadConversation } from '@/lib/conversation-storage';
import DOMPurify from 'dompurify';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export default function SidebarChat() {
  const { isSidebarOpen, closeSidebar, activeFlow, clearFlow, leadData, updateLeadData } = useSidebar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCSRFToken] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const flowInitializedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch('/api/csrf-token', { method: 'GET' });
        const data = await response.json();
        setCSRFToken(data.token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCSRFToken();
  }, []);

  // Load or initialize messages when flow changes
  useEffect(() => {
    if (activeFlow && isSidebarOpen && !flowInitializedRef.current) {
      flowInitializedRef.current = true;
      const storageKey = `sidebar-chat-${activeFlow.id}`;

      // Try localStorage first (for instant load)
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
          return;
        } catch (e) {
          console.error('Failed to parse stored messages');
        }
      }

      // Fall back to API (server-side persistence)
      loadConversation(activeFlow.id).then((messages) => {
        if (messages && messages.length > 0) {
          setMessages(messages);
        } else {
          initializeTriggerMessage();
        }
      });
    }
  }, [activeFlow, isSidebarOpen]);

  // Save messages to both localStorage and API
  useEffect(() => {
    if (activeFlow && messages.length > 0) {
      const storageKey = `sidebar-chat-${activeFlow.id}`;
      // Save locally for instant access
      localStorage.setItem(storageKey, JSON.stringify(messages));
      // Save to server for persistence across browsers
      saveConversation(activeFlow.id, messages);
    }
  }, [messages, activeFlow]);

  const initializeTriggerMessage = () => {
    if (!activeFlow) return;
    const triggerMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: activeFlow.triggerMessage,
      timestamp: Date.now(),
    };
    setMessages([triggerMsg]);
  };

  // Reset flow initialization when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      flowInitializedRef.current = false;
      clearFlow();
    }
  }, [isSidebarOpen, clearFlow]);

  const MAX_INPUT_LENGTH = 1000;
  const MAX_CONVERSATION_LENGTH = 50;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (input.length > MAX_INPUT_LENGTH) {
      alert(`Message limited to ${MAX_INPUT_LENGTH} characters`);
      return;
    }

    if (messages.length > MAX_CONVERSATION_LENGTH) {
      const proceed = confirm(
        'This conversation is getting long. Continue or start fresh?'
      );
      if (!proceed) return;
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          prompt: input,
          messages: messages,
          flowId: activeFlow?.id,
          systemPrompt: activeFlow?.systemPrompt,
          leadData: leadData,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: data.text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I am having trouble connecting. Please try again later.',
        timestamp: Date.now(),
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

            {messages.map((msg) => (
              <div
                key={msg.id}
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
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text) }}
                ></div>
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
