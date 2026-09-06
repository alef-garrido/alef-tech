"use client";

import { useState } from 'react';
import { LeadFormData, ServiceType, FORM_CONFIG, FormField as FormFieldConfig } from '@/app/types/lead';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Input,
  TextArea,
  Select,
  RadioGroup,
  RadioOption,
  FormField as FormFieldContainer,
  FormError,
  ConsentCheckbox,
  PrivacyNoticeDisclaimer,
} from '@/app/components/ui';

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
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const fields = FORM_CONFIG[service];
  const currentField = fields[currentStep];
  const isLastStep = currentStep === fields.length - 1;
  const progress = ((currentStep + 1) / fields.length) * 100;

  const validateField = (field: FormFieldConfig, value: string): string | null => {
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
    field: FormFieldConfig
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
    const value = (formData[currentField.name] as string) || '';
    const error = validateField(currentField, value);
    if (error) return false;

    if (isLastStep && !privacyConsent) {
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (isLastStep && !privacyConsent) {
      setErrors(prev => ({
        ...prev,
        privacyConsent: 'Debe aceptar el Aviso de Privacidad para continuar.',
      }));
      return;
    }

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
      const value = (formData[field.name] as string) || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    if (!privacyConsent) {
      newErrors.privacyConsent = 'Debe aceptar el Aviso de Privacidad para continuar.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData: LeadFormData = {
        ...formData,
        service: formData.service || service,
        privacyConsent: true,
        privacyPolicyVersion: '1.0',
        consentedAt: new Date().toISOString(),
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

  const renderField = (field: FormFieldConfig) => {
    const value = (formData[field.name] as string) || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'textarea':
        return (
          <TextArea
            autoFocus
            id={field.name}
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            placeholder={field.placeholder}
            required={field.required}
            hasError={!!error}
            rows={4}
            className="resize-none"
          />
        );

      case 'select':
        return (
          <Select
            autoFocus
            id={field.name}
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            required={field.required}
            hasError={!!error}
            options={field.options}
            placeholderOption="Select an option"
          />
        );

      case 'radio':
        return (
          <RadioGroup>
            {field.options?.map(opt => (
              <RadioOption
                key={opt.value}
                id={`${field.name}-${opt.value}`}
                name={field.name}
                value={opt.value}
                label={opt.label}
                checked={value === opt.value}
                onChange={e => handleChange(e, field)}
                required={field.required}
              />
            ))}
          </RadioGroup>
        );

      default:
        return (
          <Input
            autoFocus
            id={field.name}
            type={field.type}
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            placeholder={field.placeholder}
            required={field.required}
            hasError={!!error}
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
        <div className="py-8 flex flex-col">
          <FormFieldContainer
            label={currentField.label}
            htmlFor={currentField.name}
            required={currentField.required}
            error={errors[currentField.name]}
          >
            <div className="mt-3 mb-1">
              {renderField(currentField)}
            </div>
          </FormFieldContainer>

          {/* Privacy Consent & Disclaimer on Final Step */}
          {isLastStep && (
            <div className="mt-6 space-y-4">
              <ConsentCheckbox
                id="privacy-consent-checkbox"
                checked={privacyConsent}
                onChange={e => {
                  setPrivacyConsent(e.target.checked);
                  if (e.target.checked) {
                    setErrors(prev => ({ ...prev, privacyConsent: undefined }));
                  }
                }}
                hasError={!!errors.privacyConsent}
                label="Acepto expresamente el tratamiento de mis datos personales para la atención de esta solicitud conforme a la LFPDPPP 2025."
              />
              {errors.privacyConsent && (
                <FormError className="text-xs mt-1">{errors.privacyConsent}</FormError>
              )}
              <PrivacyNoticeDisclaimer noticeUrl="/privacy" />
            </div>
          )}

          {errors.submit && (
            <div className="border border-[var(--alert)] rounded-[var(--radius-md)] p-3 mt-6 bg-[var(--surface-2)]">
              <FormError>{errors.submit}</FormError>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-10 pt-6 border-t border-[var(--border)]">
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

          <p className="text-[10px] text-[var(--text-faint)] text-center font-mono mt-4 uppercase flex items-center justify-center gap-1.5 tracking-wider">
            <span>🔒</span>
            <span>DATA PROTECTED UNDER LFPDPPP 2025 // TLS ENCRYPTED & CONFIDENTIAL</span>
          </p>
        </div>
      </div>
    </div>
  );
};
