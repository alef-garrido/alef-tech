"use client";

import { useState } from 'react';
import { LeadFormData, ServiceType, FORM_CONFIG, FormField } from '@/app/types/lead';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface DynamicLeadFormProps {
  service: ServiceType;
  onClose: () => void;
  onSubmit?: (data: LeadFormData) => void;
}

export const DynamicLeadForm = ({ service, onClose, onSubmit }: DynamicLeadFormProps) => {
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    service,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fields = FORM_CONFIG[service];
  const currentField = fields[currentStep];
  const isLastStep = currentStep === fields.length - 1;
  const progress = ((currentStep + 1) / fields.length) * 100;

  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value?.trim()) {
      return `${field.label} is required`;
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-+()]+$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    if (field.validation) {
      const result = field.validation(value);
      if (result !== true) {
        return typeof result === 'string' ? result : 'Invalid input';
      }
    }

    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: FormField
  ) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field.name]: value,
    }));

    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field.name]: error || undefined,
    }));
  };

  const canProceedToNext = (): boolean => {
    const value = formData[currentField.name] as string || '';
    const error = validateField(currentField, value);
    return !error;
  };

  const handleNext = () => {
    if (!canProceedToNext()) {
      return;
    }
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string | undefined> = {};
    let isValid = true;

    fields.forEach(field => {
      const value = formData[field.name] as string || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        service: formData.service || service,
      } as LeadFormData;

      if (onSubmit) {
        onSubmit(submitData);
      } else {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        submit: 'Failed to submit form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] as string || '';
    const error = errors[field.name];

    const baseInputClasses =
      'w-full px-4 py-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-md)] text-[var(--text)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] font-mono text-sm';
    const errorClasses = error ? 'border-[var(--alert)] focus:border-[var(--alert)]' : '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            autoFocus
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={`${baseInputClasses} ${errorClasses} resize-none`}
          />
        );

      case 'select':
        return (
          <select
            autoFocus
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            required={field.required}
            className={`${baseInputClasses} ${errorClasses} cursor-pointer`}
          >
            <option value="">Select an option</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map(opt => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer p-3 border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--surface-2)] hover:border-[var(--accent)] transition">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={e => handleChange(e, field)}
                  required={field.required}
                  className="w-4 h-4 cursor-pointer accent-[var(--accent)]"
                />
                <span className="text-[var(--text)] text-sm font-mono flex-1">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            autoFocus
            type={field.type}
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            placeholder={field.placeholder}
            required={field.required}
            className={`${baseInputClasses} ${errorClasses}`}
          />
        );
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="terminal max-w-md w-full mx-4 text-center">
          <h2 className="text-xl font-bold text-[var(--accent)] mb-4 font-mono">// DISPATCH SUCCESSFUL</h2>
          <p className="text-[var(--text-muted)] text-sm mb-6">
            Your telemetry data has been received. Response expected within 24 hours.
          </p>
          <div className="inline-block w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="panel max-w-2xl w-full border border-[var(--accent)] shadow-[var(--glow)]">
        {/* Header with progress */}
        <div className="border-b border-[var(--border)] pb-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="w-full h-1 bg-[var(--surface-3)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="eyebrow mt-3">
              TELEMETRY INPUT · STEP {currentStep + 1} OF {fields.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors ml-4"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="py-6 flex flex-col">
          <div className="field">
            <label htmlFor={currentField.name} className="block text-sm font-mono text-[var(--accent)]">
              {currentField.label}
              {currentField.required && <span className="text-[var(--alert)] ml-1">*</span>}
            </label>

            <div className="my-3">
              {renderField(currentField)}
            </div>

            {errors[currentField.name] && (
              <p className="text-[var(--alert)] text-xs font-mono">{errors[currentField.name]}</p>
            )}

            {errors.submit && (
              <div className="border border-[var(--alert)] rounded-[var(--radius-md)] p-3 mt-4 bg-[var(--surface-2)]">
                <p className="text-[var(--alert)] text-xs font-mono">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-[var(--border)]">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn btn-ghost sm flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              BACK
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting || !canProceedToNext()}
              className="btn btn-primary sm flex-1 flex items-center justify-center gap-1"
            >
              {isSubmitting ? (
                'DISPATCHING...'
              ) : isLastStep ? (
                'SUBMIT TELEMETRY →'
              ) : (
                <>
                  NEXT STEP
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] text-[var(--text-faint)] text-center font-mono mt-4 uppercase">
            CONFIDENTIAL // CAPSULA DYNAMICS HARDWARE SPEC
          </p>
        </div>
      </div>
    </div>
  );
};
