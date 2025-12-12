'use client';

import { useState, useEffect } from 'react';
import { useSidebar } from '../context/sidebar-context';

export default function LeadCaptureForm() {
  const { leadData, updateLeadData, activeFlow } = useSidebar();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (leadData.email) {
      setIsSaved(false);
    }
  }, [leadData.email]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (value: string) => {
    updateLeadData({ email: value });
    if (value && !validateEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  if (!activeFlow || !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/80 transition-colors mb-4"
      >
        Capture your info (optional)
      </button>
    );
  }

  return (
    <div className="bg-secondary/50 p-4 rounded-md mb-4 border border-secondary">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-secondary-foreground">Your Information</h3>
        <div className="flex items-center gap-2">
          {isSaved && <span className="text-xs text-green-500">✓ Saved</span>}
          <button
            onClick={() => setIsExpanded(false)}
            className="text-xs text-secondary-foreground/70 hover:text-secondary-foreground"
          >
            minimize
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={leadData.name || ''}
          onChange={(e) => updateLeadData({ name: e.target.value })}
          className="w-full px-3 py-1.5 bg-input text-foreground text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div>
          <input
            type="email"
            placeholder="Email"
            value={leadData.email || ''}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`w-full px-3 py-1.5 bg-input text-foreground text-sm rounded border focus:outline-none focus:ring-1 ${
              emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-primary'
            }`}
          />
          {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
        </div>
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={leadData.phone || ''}
          onChange={(e) => updateLeadData({ phone: e.target.value })}
          className="w-full px-3 py-1.5 bg-input text-foreground text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="Company (optional)"
          value={leadData.company || ''}
          onChange={(e) => updateLeadData({ company: e.target.value })}
          className="w-full px-3 py-1.5 bg-input text-foreground text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <p className="text-xs text-secondary-foreground/60 mt-3">
        We'll use this to schedule your appointment and follow up.
      </p>
    </div>
  );
}
