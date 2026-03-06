'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Bot, Loader } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl?: string; // Optional webhook URL for n8n integration
}

export function ChatModal({ isOpen, onClose, webhookUrl }: ChatModalProps) {
  const [selectedChat, setSelectedChat] = useState<'bot' | 'whatsapp' | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy tu asistente XNORIA. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    window.open('https://wa.me/524493123765', '_blank');
    onClose();
  };

  const handleBotChat = () => {
    setSelectedChat('bot');
    setError(null);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setError(null);

    // Add user message to chat history
    const userMsgId = `user-${Date.now()}`;
    setChatHistory((prev) => [
      ...prev,
      {
        id: userMsgId,
        type: 'user',
        content: userMessage,
        timestamp: new Date(),
      },
    ]);

    // If webhook URL is provided, send to n8n
    if (webhookUrl) {
      setIsLoading(true);
      try {
        const sessionId = sessionStorage.getItem('chatSessionId') || generateSessionId();
        const payload = {
          chatInput: userMessage,
          timestamp: new Date().toISOString(),
          sessionId,
        };
        console.log('🚀 Sending request to n8n:', { url: webhookUrl, payload });
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ n8n Response received:', JSON.stringify(data, null, 2));
        
        // Handle n8n response with LangChain chatHistory format
        let botResponse = 'Lo siento, hubo un error procesando tu mensaje.';
        
        if (data.chatHistory && Array.isArray(data.chatHistory)) {
          console.log('📋 Found chatHistory array with', data.chatHistory.length, 'messages');
          // Find the last AI message in the chat history
          const lastAIMessage = [...data.chatHistory].reverse().find(
            (msg: any) => msg.id && msg.id[msg.id.length - 1] === 'AIMessage'
          );
          console.log('🤖 Last AI Message:', lastAIMessage);
          if (lastAIMessage?.kwargs?.content) {
            botResponse = lastAIMessage.kwargs.content;
            console.log('✨ Extracted response:', botResponse);
          } else {
            console.warn('⚠️ AIMessage found but no content in kwargs');
          }
        } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
          // Fallback: array with objects containing "output" field
          botResponse = data[0].output;
          console.log('📦 Using array output format:', botResponse);
        } else if (data.response) {
          botResponse = data.response;
          console.log('💬 Using response field:', botResponse);
        } else if (data.message) {
          botResponse = data.message;
          console.log('📧 Using message field:', botResponse);
        } else if (data.output) {
          botResponse = data.output;
          console.log('🎯 Using output field:', botResponse);
        } else {
          console.error('❌ No recognized response format. Data structure:', Object.keys(data));
        }

        // Add bot response to chat history
        setChatHistory((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: botResponse,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        console.error('❌ Webhook error:', errorMessage);
        console.error('Full error:', err);
        setError(`No se pudo conectar con el servicio: ${errorMessage}`);

        // Add error message to chat
        setChatHistory((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            type: 'bot',
            content: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo o contacta por WhatsApp.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback: simple echo response if no webhook
      setChatHistory((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: `Recibí tu mensaje: "${userMessage}". Para una respuesta personalizada, por favor usa WhatsApp.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  if (selectedChat === 'bot') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-card rounded-2xl c-cyber-border w-full max-w-md max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0, 255, 178, 0.1)' }}
              >
                <Bot className="w-5 h-5 c-cyber-accent" />
              </div>
              <div>
                <h3 className="font-bold font-mono c-text-primary">XNORIA Assistant</h3>
                <p className="text-xs c-text-tertiary">
                  {webhookUrl ? 'Powered by n8n' : 'Chat Assistant'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary/20 rounded-lg transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg p-3 max-w-xs ${
                    msg.type === 'user'
                      ? 'bg-primary/20 border border-primary/50'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm c-text-primary">{msg.content}</p>
                  <p className="text-xs c-text-tertiary mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex gap-2 items-center">
                  <Loader className="w-4 h-4 c-cyber-accent animate-spin" />
                  <span className="text-sm c-text-primary">Escribiendo...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="p-6 border-t border-border space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu pregunta..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    sendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm c-text-primary placeholder-c-text-tertiary border border-border focus:outline-none focus:border-primary/50 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || isLoading}
                className="px-4 py-2 rounded-lg font-mono font-bold transition disabled:opacity-50 c-cyber-border hover:bg-primary/30"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : '→'}
              </button>
            </div>
            <p className="text-xs c-text-tertiary">
              O continúa con WhatsApp para una conversación más personalizada
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full py-2 px-4 rounded-lg font-mono text-sm transition border border-border hover:bg-primary/10 c-text-secondary"
            >
              💬 Continuar en WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chat option selection modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl c-cyber-border w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold font-mono c-text-primary">
            ¿Cómo quieres chatear?
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/20 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {/* Live Chat Option */}
          <button
            onClick={handleBotChat}
            className="w-full p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/10 transition group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: 'rgba(0, 255, 178, 0.1)' }}
              >
                <Bot className="w-5 h-5 c-cyber-accent" />
              </div>
              <div className="text-left">
                <h3 className="font-bold font-mono c-text-primary group-hover:c-cyber-accent transition">
                  Chat en Vivo
                </h3>
                <p className="text-sm c-text-secondary mt-1">
                  Habla con nuestro asistente IA en tiempo real
                </p>
                <p className="text-xs c-text-tertiary mt-2">
                  ⚡ {webhookUrl ? 'Powered by n8n' : 'Respuesta automática'}
                </p>
              </div>
            </div>
          </button>

          {/* WhatsApp Option */}
          <button
            onClick={handleWhatsApp}
            className="w-full p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/10 transition group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: 'rgba(59, 130, 246, 0.1)' }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: '#3b82f6' }} />
              </div>
              <div className="text-left">
                <h3 className="font-bold font-mono c-text-primary group-hover:c-cyber-accent transition">
                  WhatsApp
                </h3>
                <p className="text-sm c-text-secondary mt-1">
                  Chatea directamente con nuestro equipo
                </p>
                <p className="text-xs c-text-tertiary mt-2">👥 Soporte especializado</p>
              </div>
            </div>
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-card c-text-tertiary">O</span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg font-mono text-sm transition border border-border hover:bg-muted c-text-secondary"
          >
            Cerrar
          </button>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-primary/5 border-t border-border">
          <p className="text-xs c-text-tertiary text-center">
            ¿Preguntas sobre nuestro servicio? Estamos aquí para ayudarte
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate or retrieve session ID
function generateSessionId(): string {
  const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('chatSessionId', sessionId);
  return sessionId;
}
