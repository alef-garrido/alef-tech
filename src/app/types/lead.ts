// Lead form types based on service context
export type ServiceType = 'training' | 'consulting' | 'implementation' | 'general';

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: ServiceType;
  specificNeeds: string;
  budget?: string;
  timeline?: string;
  notes?: string;
}

export interface FormField {
  name: keyof LeadFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio';
  placeholder?: string;
  required: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: string) => boolean | string;
}

// Form configurations per service type
export const FORM_CONFIG: Record<ServiceType, FormField[]> = {
  training: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@company.com',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      required: true,
    },
    {
      name: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Your Company',
      required: true,
    },
    {
      name: 'specificNeeds',
      label: 'What training topics interest you most?',
      type: 'select',
      required: true,
      options: [
        { value: 'onboarding', label: 'Onboarding Design' },
        { value: 'cx-adoption', label: 'CX & Digital Adoption Workshops' },
        { value: 'learning-partnership', label: 'Ongoing Learning Partnerships' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'timeline',
      label: 'When do you need this training?',
      type: 'select',
      required: true,
      options: [
        { value: 'asap', label: 'ASAP (Next 30 days)' },
        { value: '30-60', label: '30-60 days' },
        { value: '60-90', label: '60-90 days' },
        { value: 'flexible', label: 'Flexible' },
      ],
    },
    {
      name: 'notes',
      label: 'Additional Details',
      type: 'textarea',
      placeholder: 'Tell us more about your team and training goals...',
      required: false,
    },
  ],
  consulting: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@company.com',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      required: true,
    },
    {
      name: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Your Company',
      required: true,
    },
    {
      name: 'specificNeeds',
      label: 'What consulting services interest you?',
      type: 'select',
      required: true,
      options: [
        { value: 'cx-strategy', label: 'CX Strategy & Audits' },
        { value: 'ai-advisory', label: 'Agentic AI Advisory' },
        { value: 'growth-roadmap', label: 'Growth Roadmaps' },
        { value: 'retention-strategy', label: 'Retention & Growth Strategy' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'budget',
      label: 'Budget Range',
      type: 'select',
      required: true,
      options: [
        { value: 'under-10k', label: 'Under $10K' },
        { value: '10k-25k', label: '$10K - $25K' },
        { value: '25k-50k', label: '$25K - $50K' },
        { value: '50k+', label: '50K+' },
      ],
    },
    {
      name: 'timeline',
      label: 'Project Timeline',
      type: 'select',
      required: true,
      options: [
        { value: 'asap', label: 'ASAP (Next 30 days)' },
        { value: '30-60', label: '30-60 days' },
        { value: '60-90', label: '60-90 days' },
        { value: 'flexible', label: 'Flexible' },
      ],
    },
    {
      name: 'notes',
      label: 'Challenge or Goal Description',
      type: 'textarea',
      placeholder: 'Describe the business challenge you\'re trying to solve...',
      required: false,
    },
  ],
  implementation: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@company.com',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      required: true,
    },
    {
      name: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Your Company',
      required: true,
    },
    {
      name: 'specificNeeds',
      label: 'What implementation project interests you?',
      type: 'select',
      required: true,
      options: [
        { value: 'workflow-automation', label: 'CX Workflow Automation' },
        { value: 'ai-tools', label: 'Bespoke AI-Assisted Tools' },
        { value: 'business-dashboard', label: '360° Business Dashboard' },
        { value: 'full-integration', label: 'Full Agentic Business Engine' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'budget',
      label: 'Budget Range',
      type: 'select',
      required: true,
      options: [
        { value: '25k-50k', label: '$25K - $50K' },
        { value: '50k-100k', label: '$50K - $100K' },
        { value: '100k-250k', label: '$100K - $250K' },
        { value: '250k+', label: '$250K+' },
      ],
    },
    {
      name: 'timeline',
      label: 'Implementation Timeline',
      type: 'select',
      required: true,
      options: [
        { value: 'asap', label: 'ASAP (60-90 days)' },
        { value: '3-6-months', label: '3-6 months' },
        { value: '6-12-months', label: '6-12 months' },
        { value: 'flexible', label: 'Flexible' },
      ],
    },
    {
      name: 'notes',
      label: 'Project Vision & Goals',
      type: 'textarea',
      placeholder: 'Describe your vision for the implementation...',
      required: false,
    },
  ],
  general: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@company.com',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      required: true,
    },
    {
      name: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Your Company',
      required: false,
    },
    {
      name: 'service',
      label: 'I\'m interested in:',
      type: 'radio',
      required: true,
      options: [
        { value: 'training', label: 'Training' },
        { value: 'consulting', label: 'Business Consulting' },
        { value: 'implementation', label: 'Implementation' },
      ],
    },
    {
      name: 'notes',
      label: 'How can I help you?',
      type: 'textarea',
      placeholder: 'Tell us about your needs...',
      required: true,
    },
  ],
};
