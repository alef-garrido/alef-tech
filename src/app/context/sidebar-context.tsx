'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { AutomationFlow } from '@/config/automation-flows';

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service_interested?: string;
  preferred_time?: string;
  notes?: string;
}

interface SidebarContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  
  // Flow management
  activeFlow: AutomationFlow | null;
  openSidebarWithFlow: (flow: AutomationFlow) => void;
  clearFlow: () => void;
  
  // Lead data management
  leadData: LeadData;
  setLeadData: (data: Partial<LeadData>) => void;
  updateLeadData: (data: Partial<LeadData>) => void;
  clearLeadData: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const defaultLeadData: LeadData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service_interested: '',
  preferred_time: '',
  notes: '',
};

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<AutomationFlow | null>(null);
  const [leadData, setLeadDataState] = useState<LeadData>(defaultLeadData);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  
  const openSidebarWithFlow = (flow: AutomationFlow) => {
    setActiveFlow(flow);
    setLeadDataState((prev) => ({
      ...prev,
      service_interested: flow.name,
    }));
    setSidebarOpen(true);
  };
  
  const clearFlow = () => setActiveFlow(null);
  
  const setLeadData = (data: Partial<LeadData>) => {
    setLeadDataState((prev) => ({
      ...defaultLeadData,
      ...data,
    }));
  };
  
  const updateLeadData = (data: Partial<LeadData>) => {
    setLeadDataState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  
  const clearLeadData = () => setLeadDataState(defaultLeadData);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        activeFlow,
        openSidebarWithFlow,
        clearFlow,
        leadData,
        setLeadData,
        updateLeadData,
        clearLeadData,
      }}
    >
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
