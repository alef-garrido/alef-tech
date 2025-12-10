'use client';

import { useState } from 'react';
import { useSidebar } from '../context/sidebar-context';

export default function LeadCaptureForm() {
  const { leadData, updateLeadData, activeFlow } = useSidebar();
  const [isExpanded, setIsExpanded] = useState(false);

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
        <button
          onClick={() => setIsExpanded(false)}
          className="text-xs text-secondary-foreground/70 hover:text-secondary-foreground"
        >
          minimize
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={leadData.name || ''}
          onChange={(e) => updateLeadData({ name: e.target.value })}
          className="w-full px-3 py-1.5 bg-input text-foreground text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="email"
          placeholder="Email"
          value={leadData.email || ''}
          onChange={(e) => updateLeadData({ email: e.target.value })}
          className="w-full px-3 py-1.5 bg-input text-foreground text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
        />
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
