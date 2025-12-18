'use client';

import { useState } from 'react';
import { LeadFormData, ServiceType, FORM_CONFIG, FormField } from '@/app/types/lead';
import { X } from 'lucide-react';

interface DynamicLeadFormProps {
  service: ServiceType;
  onClose: () => void;
  onSubmit?: (data: LeadFormData) => void;
}

export const DynamicLeadForm = ({ service, onClose, onSubmit }: DynamicLeadFormProps) => {
  console.log('DynamicLeadForm rendering with service:', service);
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    service,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = FORM_CONFIG[service];

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
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submitData = {
        ...formData,
        service: formData.service || service,
      } as LeadFormData;

      // Call optional onSubmit handler
      if (onSubmit) {
        onSubmit(submitData);
      } else {
        // Default: submit to API
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
      'w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors font-mono text-sm';
    const errorClasses = error ? 'border-red-500 focus:border-red-500' : '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            key={field.name}
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
            key={field.name}
            name={field.name}
            value={value}
            onChange={e => handleChange(e, field)}
            required={field.required}
            className={`${baseInputClasses} ${errorClasses} cursor-pointer`}
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div key={field.name} className="space-y-2">
            {field.options?.map(opt => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={e => handleChange(e, field)}
                  required={field.required}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-gray-300 text-sm font-mono">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            key={field.name}
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
      <div className="bg-black border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-mono capitalize">
            {service === 'general' ? 'Get in Touch' : `${service} Inquiry`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm font-mono">{errors.submit}</p>
            </div>
          )}

          {fields.map(field => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-mono text-gray-300">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="text-red-400 text-xs font-mono">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-mono py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center font-mono">
            We respect your privacy. Your information will be kept confidential.
          </p>
        </form>
      </div>
    </div>
  );
};
