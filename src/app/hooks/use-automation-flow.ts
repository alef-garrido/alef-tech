import { useCallback } from 'react';
import { useSidebar } from '@/app/context/sidebar-context';
import { AUTOMATION_FLOWS, AutomationFlow } from '@/config/automation-flows';

export function useAutomationFlow() {
  const { activeFlow, openSidebarWithFlow, clearFlow, leadData, updateLeadData } = useSidebar();

  const startFlow = useCallback(
    (flowId: string) => {
      const flow = AUTOMATION_FLOWS[flowId];
      if (flow) {
        openSidebarWithFlow(flow);
      }
    },
    [openSidebarWithFlow]
  );

  const updateLead = useCallback(
    (name: string, value: string) => {
      updateLeadData({ [name]: value } as any);
    },
    [updateLeadData]
  );

  const isFlowActive = !!activeFlow;

  return {
    activeFlow,
    startFlow,
    clearFlow,
    leadData,
    updateLead,
    isFlowActive,
  };
}
