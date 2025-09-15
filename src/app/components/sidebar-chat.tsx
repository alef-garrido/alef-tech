'use client';

import { useSidebar } from '../context/sidebar-context';
import { useState, useEffect } from 'react';

// Define the message structure
interface Message {
  id: string;
  content: string;
  role: 'user' | 'agent' | 'system';
  timestamp: Date;
}

// --- Helper Components for Icons (using basic SVG) ---
const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const LoaderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);


export default function SidebarChat() {
  const { isSidebarOpen, closeSidebar, initialMessage } = useSidebar();
  
  // State from the new implementation
  const [webhookUrl, setWebhookUrl] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID().replace(/-/g, ''));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome! How can I help you today? Please set the webhook URL on the left to connect to the agent.',
      role: 'system',
      timestamp: new Date(),
    },
  ]);

  // Add initial message from nav link click
  useEffect(() => {
    if (initialMessage && isSidebarOpen) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: initialMessage,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      // Automatically send this as a query
      handleSendQuery(initialMessage);
    }
  }, [initialMessage, isSidebarOpen]);

  const handleSendQuery = async (currentQuery: string) => {
    if (!webhookUrl.trim()) {
      console.error("Webhook URL Required: Please enter your n8n webhook URL to connect the RAG agent");
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: "Error: Webhook URL is not set. Please configure it on the left panel.",
        role: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      return;
    }

    if (!currentQuery.trim()) {
      console.error("Query Required: Please enter a query to send to the RAG agent");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        sessionId: sessionId,
        action: "sendMessage",
        chatInput: currentQuery
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      const content = responseData.response || responseData.message || 'RAG Agent processed your query.';
      
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: content,
        role: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);

    } catch (error) {
      console.error('Error sending query:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Error: Failed to connect to the RAG agent. Check the webhook URL and console for details.",
        role: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    handleSendQuery(query);
  };

  const handleOptionClick = (optionText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: optionText,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    handleSendQuery(optionText);
  };

  // --- Helper functions for styling ---
  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const getRoleIcon = (role: Message['role']) => role === 'user' ? <UserIcon /> : <BotIcon />;
  const getRoleColor = (role: Message['role']) => role === 'user' ? 'bg-primary/10' : 'bg-secondary/10';

  if (!isSidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={closeSidebar}
    >
      <div
        className="relative h-full w-full md:w-3/4 lg:w-2/3 bg-background shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex-shrink-0 border-b">
          <button onClick={closeSidebar} className="text-foreground float-right">Close</button>
          <h2 className="text-lg font-bold text-center">Chat with our Agent</h2>
        </div>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 overflow-hidden">
          {/* Left Panel: Configuration */}
          <div className="lg:col-span-1 border rounded-lg p-4 flex flex-col">
            <h3 className="text-md font-semibold mb-4 flex items-center gap-2"><BotIcon /> RAG Agent Configuration</h3>
            <div className="space-y-4">
              <label htmlFor="webhookUrl" className="text-sm font-medium mb-1 block">n8n Webhook URL</label>
              <input
                id="webhookUrl"
                type="url"
                placeholder="https://your-n8n-instance.com/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              />
              <p className="text-xs text-gray-500 mt-1">The agent needs this to connect to the knowledge base.</p>
            </div>
          </div>

          {/* Right Panel: Chat Interface */}
          <div className="lg:col-span-2 border rounded-lg flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted h-fit">{getRoleIcon(message.role)}</div>
                  <div className="flex-1 max-w-[85%]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium capitalize">{message.role === 'system' ? 'Agent' : message.role}</span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className={`p-3 rounded-lg ${getRoleColor(message.role)}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted"><BotIcon /></div>
                  <div className="p-3 rounded-lg bg-secondary/10 flex items-center gap-2">
                    <LoaderIcon />
                    <span className="text-sm">Agent is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                  <button onClick={() => handleOptionClick('Book a Consultation')} className="bg-primary/80 hover:bg-primary text-primary-foreground text-sm font-bold py-2 px-3 rounded">Book a Consultation</button>
                  <button onClick={() => handleOptionClick('Explore Services')} className="bg-primary/80 hover:bg-primary text-primary-foreground text-sm font-bold py-2 px-3 rounded">Explore Services</button>
                  <button onClick={() => handleOptionClick('Ask a General Question')} className="bg-primary/80 hover:bg-primary text-primary-foreground text-sm font-bold py-2 px-3 rounded">Ask a General Question</button>
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <textarea
                  placeholder="Or type your message here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={1}
                  className="w-full p-2 border rounded-md resize-none bg-background"
                />
                <button type="submit" disabled={isLoading || !query.trim()} className="bg-primary hover:bg-primary/80 text-primary-foreground p-2 rounded-md disabled:opacity-50">
                  {isLoading ? <LoaderIcon /> : <SendIcon />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}