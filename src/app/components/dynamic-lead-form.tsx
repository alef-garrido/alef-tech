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
      'w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors font-mono text-base';
    const errorClasses = error ? 'border-red-500 focus:border-red-500' : '';

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
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-700 rounded-lg hover:border-gray-500 transition">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={e => handleChange(e, field)}
                  required={field.required}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="text-gray-300 text-sm font-mono flex-1">{opt.label}</span>
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
        <div className="bg-black border border-gray-700 rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4 font-mono">Thank You!</h2>
          <p className="text-gray-400 mb-6">
            Your information has been received. We'll get back to you within 24 hours.
          </p>
          <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700 rounded-lg w-full max-w-2xl">
        {/* Header with progress */}
        <div className="sticky top-0 bg-black border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Question {currentStep + 1} of {fields.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors ml-4 flex-shrink-0"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 min-h-96 flex flex-col">
          <div className="flex-1">
            {/* Question Label */}
            <label htmlFor={currentField.name} className="block text-lg font-mono text-gray-200 mb-6">
              {currentField.label}
              {currentField.required && <span className="text-red-400 ml-2">*</span>}
            </label>

            {/* Input Field */}
            <div className="mb-2">
              {renderField(currentField)}
            </div>

            {/* Error Message */}
            {errors[currentField.name] && (
              <p className="text-red-400 text-sm font-mono mt-2">{errors[currentField.name]}</p>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mt-4">
                <p className="text-red-400 text-sm font-mono">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono font-medium"
            >
              <ChevronLeft size={20} />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting || !canProceedToNext()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : isLastStep ? (
                'Submit'
              ) : (
                <>
                  Next
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 text-center font-mono mt-4">
            We respect your privacy. Your information will be kept confidential.
          </p>
        </div>
      </div>
    </div>
  );
};
