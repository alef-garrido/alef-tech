'use client';

import { useState } from 'react';
import { ServiceType } from '@/app/types/lead';
import { DynamicLeadForm } from './dynamic-lead-form';

interface LeadCaptureProps {
  service?: ServiceType;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export const LeadCapture = ({ service = 'general', trigger, onSuccess }: LeadCaptureProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
    onSuccess?.();
  };

  if (trigger) {
    return (
      <>
        <div onClick={() => setShowForm(true)} className="cursor-pointer">
          {trigger}
        </div>
        {showForm && <DynamicLeadForm service={service} onClose={handleClose} />}
      </>
    );
  }

  return showForm ? (
    <DynamicLeadForm service={service} onClose={handleClose} />
  ) : null;
};
