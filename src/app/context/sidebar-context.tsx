'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean;
  openSidebar: (message?: string) => void;
  closeSidebar: () => void;
  initialMessage: string | null;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const openSidebar = (message?: string) => {
    setInitialMessage(message || null);
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
    setInitialMessage(null);
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar, initialMessage }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
