"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// --- FormLabel ---
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label ref={ref} className={cn('field-label', className)} {...props}>
      {children}
      {required && <span className="required-star" aria-hidden="true">*</span>}
    </label>
  )
);
FormLabel.displayName = 'FormLabel';

// --- FormError ---
export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p ref={ref} className={cn('field-error', className)} role="alert" {...props}>
        {children}
      </p>
    );
  }
);
FormError.displayName = 'FormError';

// --- FormHelperText ---
export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormHelperText = forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p ref={ref} className={cn('field-helper', className)} {...props}>
        {children}
      </p>
    );
  }
);
FormHelperText.displayName = 'FormHelperText';

// --- Input ---
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => (
    <input
      ref={ref}
      className={cn('field-input', hasError && 'has-error', className)}
      {...props}
    />
  )
);
Input.displayName = 'Input';

// --- TextArea ---
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn('field-textarea', hasError && 'has-error', className)}
      {...props}
    />
  )
);
TextArea.displayName = 'TextArea';

// --- Select ---
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options?: SelectOption[];
  placeholderOption?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, options = [], placeholderOption, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn('field-select', hasError && 'has-error', className)}
      {...props}
    >
      {placeholderOption && <option value="">{placeholderOption}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
      {children}
    </select>
  )
);
Select.displayName = 'Select';

// --- RadioOption & RadioGroup ---
export interface RadioOptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ className, label, checked, id, value, ...props }, ref) => {
    const optionId = id || `radio-${value}`;
    return (
      <label
        htmlFor={optionId}
        className={cn('field-radio-card', checked && 'is-checked', className)}
      >
        <input
          ref={ref}
          type="radio"
          id={optionId}
          value={value}
          checked={checked}
          className="w-4 h-4 cursor-pointer accent-[var(--accent)]"
          {...props}
        />
        <span className="text-[var(--text)] text-sm font-mono flex-1">{label}</span>
      </label>
    );
  }
);
RadioOption.displayName = 'RadioOption';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-3', className)} {...props}>
      {children}
    </div>
  )
);
RadioGroup.displayName = 'RadioGroup';

// --- FormField ---
export interface FormFieldContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldContainerProps>(
  ({ className, label, htmlFor, required, error, helperText, children, ...props }, ref) => (
    <div ref={ref} className={cn('field', className)} {...props}>
      {label && (
        <FormLabel htmlFor={htmlFor} required={required}>
          {label}
        </FormLabel>
      )}
      {children}
      {error && <FormError>{error}</FormError>}
      {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  )
);
FormField.displayName = 'FormField';
