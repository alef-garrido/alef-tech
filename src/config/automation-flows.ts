export interface FAQPair {
  question: string
  answer: string
}

export interface AutomationFlow {
  id: string
  name: string
  category: 'training' | 'consultation' | 'implementation'
  triggerMessage: string
  systemPrompt: string
  qualifyingQuestions: string[]
  faqPairs: FAQPair[]
  appointmentPrompt: string
  warmupMessage: string
}

export const AUTOMATION_FLOWS: Record<string, AutomationFlow> = {
  'design-onboarding': {
    id: 'design-onboarding',
    name: 'Design my Onboarding',
    category: 'training',
    triggerMessage:
      "Hi! I'm here to help you get started with onboarding design.\nBefore we schedule a call with our expert, let me ask a few quick questions.",
    systemPrompt: `You are a friendly CX automation assistant helping someone explore onboarding design services.

Your responsibilities:
1. Ask 2-3 qualifying questions to understand their onboarding challenges
2. Answer FAQs about onboarding design services
3. Help them schedule an appointment with an expert
4. Be warm and encouraging throughout

Qualifying questions to ask (pick 2-3):
- "What's your biggest onboarding challenge right now?"
- "How many people does your team onboard per month?"
- "What's your industry?"

After gathering info, naturally transition to booking: "Let's get you scheduled with our training specialist. What day/time works best for you? (Mon-Fri, 10am-5pm EST)"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      "What's your biggest onboarding challenge right now?",
      'How many people does your team onboard per month?',
      "What's your industry?",
    ],
    faqPairs: [
      {
        question: 'How long does this take?',
        answer: 'Typically 2-4 weeks from discovery to implementation plan.',
      },
      {
        question: "What's the cost?",
        answer:
          'Custom pricing based on team size. We will discuss during your consultation.',
      },
      {
        question: 'Can we do this remotely?',
        answer: 'Yes, fully virtual or hybrid - whatever works for you.',
      },
      {
        question: "What's included?",
        answer:
          'Discovery session, journey mapping, improvement recommendations, and implementation roadmap.',
      },
    ],
    appointmentPrompt:
      'Perfect! Let me get you scheduled with our training specialist. What day/time works best for you? (Mon-Fri, 10am-5pm EST)',
    warmupMessage:
      "In the meantime, here's a tip: Start mapping your current onboarding touchpoints. Most teams find 3-5 quick wins in their first review!",
  },

  'train-my-team': {
    id: 'train-my-team',
    name: 'Train my team',
    category: 'training',
    triggerMessage:
      "Great! Let's get your team on the path to CX excellence.\nI just need to understand your situation first.",
    systemPrompt: `You are a friendly CX automation assistant helping someone explore team training programs.

Your responsibilities:
1. Ask 2-3 qualifying questions about their team and training needs
2. Answer FAQs about training programs
3. Help them schedule a discovery call to customize a program
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "How many people are on your team?"
- "What's the primary skill gap you're looking to address?"
- "How soon do you need training to start?"

After gathering info, transition to booking: "Let's schedule a 30-min discovery call to customize the perfect program for you. What works best?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      'How many people are on your team?',
      "What's the primary skill gap you're looking to address?",
      'How soon do you need training to start?',
    ],
    faqPairs: [
      {
        question: 'Can training be remote?',
        answer: 'Yes, fully virtual or hybrid - we work with your schedule.',
      },
      {
        question: 'How many sessions are typical?',
        answer: 'Typically 4-6 sessions depending on your goals.',
      },
      {
        question: 'Do you provide training materials?',
        answer:
          'Yes, custom workbooks, videos, templates, and resources for each team member.',
      },
      {
        question: 'What if my team is spread across time zones?',
        answer: 'We handle distributed teams globally with flexible scheduling.',
      },
    ],
    appointmentPrompt:
      "Let's schedule a 30-minute discovery call to create a customized program. What day/time works for you?",
    warmupMessage:
      '50% of our clients see measurable improvement in customer satisfaction scores within 30 days of training completion.',
  },

  'learning-partner': {
    id: 'learning-partner',
    name: 'Learning Partner',
    category: 'training',
    triggerMessage:
      "Interested in a long-term learning partnership?\nI'd love to learn more about your goals.",
    systemPrompt: `You are a friendly CX automation assistant helping someone explore long-term learning partnerships.

Your responsibilities:
1. Ask 2-3 qualifying questions about their learning goals and team
2. Answer FAQs about partnership models
3. Help schedule a consultation to discuss partnership options
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "What's your main learning goal for the next 12 months?"
- "How many people would be involved in this partnership?"
- "What's your preferred engagement model?" (coaching, workshops, mentoring, hybrid)

After gathering info, transition to booking: "Let's talk about building a partnership that fits your needs perfectly. When could you schedule a call?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      "What's your main learning goal for the next 12 months?",
      'How many people would be involved in this partnership?',
      'What is your preferred engagement model?',
    ],
    faqPairs: [
      {
        question: 'What is the typical time commitment?',
        answer: 'Typically 4-8 hours per month, depending on the partnership level.',
      },
      {
        question: 'How long do partnerships usually last?',
        answer: 'Usually 3-12 months, fully customizable based on your needs.',
      },
      {
        question: 'Do you work with remote/distributed teams?',
        answer:
          'Yes, we support distributed teams globally with flexible meeting options.',
      },
      {
        question: 'Can we customize the partnership?',
        answer:
          'Absolutely - every partnership is tailored to your specific learning objectives.',
      },
    ],
    appointmentPrompt:
      "Let's discuss a learning partnership that fits your goals. What time works best for a consultation?",
    warmupMessage:
      'Average ROI from learning partnerships: 3-5x improvement in team capability and performance.',
  },

  '1on1-consultation': {
    id: '1on1-consultation',
    name: '1:1 Consultation',
    category: 'consultation',
    triggerMessage:
      'Perfect! One-on-one consultations are great for addressing specific challenges.\nLet me gather some info to match you with the right expert.',
    systemPrompt: `You are a friendly CX automation assistant helping someone book a 1:1 consultation.

Your responsibilities:
1. Ask 2-3 qualifying questions to understand their challenge
2. Answer FAQs about 1:1 consultations
3. Help schedule a consultation with the right expert
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "What's your main challenge or question we should address?"
- "What's your role/title?"
- "How soon do you need this consultation?"

After gathering info, transition to booking: "Great! Let's get you on our calendar with the right expert. What time works best for you?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      'What is your main challenge or question we should address?',
      'What is your role/title?',
      'How soon do you need this consultation?',
    ],
    faqPairs: [
      {
        question: 'How long is a consultation?',
        answer: '60 minutes, focused entirely on your specific challenge.',
      },
      {
        question: 'What should I prepare?',
        answer:
          'Just your challenge/question and any relevant context. We handle the rest.',
      },
      {
        question: 'Is there a cost?',
        answer:
          'Yes, pricing depends on scope. We can discuss options during booking.',
      },
      {
        question: 'Can we do this remotely?',
        answer: 'Yes, all consultations are conducted via video call.',
      },
    ],
    appointmentPrompt:
      "Excellent! Let's book you with our right expert. What day/time works best for you? (Mon-Fri, 10am-5pm EST)",
    warmupMessage:
      'Our consultants have an average of 15+ years CX experience. You will get immediately actionable insights you can implement right away.',
  },

  'free-call': {
    id: 'free-call',
    name: 'Free Call',
    category: 'consultation',
    triggerMessage:
      "Awesome! Let's schedule your free 20-minute discovery call.\nJust a couple of quick questions first.",
    systemPrompt: `You are a friendly CX automation assistant helping someone schedule a free discovery call.

Your responsibilities:
1. Ask 2-3 qualifying questions about their biggest challenge
2. Answer FAQs about the free discovery call
3. Help schedule the call
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "What's your biggest CX challenge right now?"
- "What would success look like for you?"
- "What day works best for a quick call this week?"

After gathering info, transition to booking: "Perfect! Here are some available time slots that work for us. Which time works best for you?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      'What is your biggest CX challenge right now?',
      'What would success look like for you?',
      'What day works best for a quick call this week?',
    ],
    faqPairs: [
      {
        question: 'What happens in 20 minutes?',
        answer:
          'We explore your challenge and suggest potential next steps - no pressure.',
      },
      {
        question: 'Is it really free?',
        answer: 'Absolutely free with zero obligation to follow up.',
      },
      {
        question: 'Will I be sold to?',
        answer: 'Not at all - we listen first, recommend second, always.',
      },
      {
        question: 'What should I prepare?',
        answer:
          'Nothing - just come with your challenge. We handle the rest.',
      },
    ],
    appointmentPrompt:
      'Perfect! Here are available slots this week. What time works best for you?',
    warmupMessage:
      'Pro tip: Our consultants typically identify 2-3 quick wins in discovery calls that you can implement immediately.',
  },

  'chat-with-ai': {
    id: 'chat-with-ai',
    name: 'Chat with AI',
    category: 'consultation',
    triggerMessage:
      "Hi! I'm your AI CX Assistant.\nI'm here to answer questions and help you explore your challenges. What would you like to know?",
    systemPrompt: `You are a helpful, knowledgeable CX AI Assistant. Your role is to:

1. Answer CX-related questions directly and helpfully
2. Provide frameworks, tips, and actionable advice
3. Listen to their situation and offer relevant guidance
4. Know when to escalate to a human expert

Guidelines:
- Answer general CX questions thoroughly
- For specific consulting needs, gently suggest: "This sounds like something that would benefit from a hands-on consultation. Would you be interested in scheduling a call with one of our experts?"
- For simple how-to questions: provide clear, actionable answers
- Keep responses conversational and friendly
- Be genuinely helpful - you are building trust here

If they ask to book a call, offer to help with that.

Tone: Friendly, knowledgeable, professional. Be conversational.`,
    qualifyingQuestions: [],
    faqPairs: [
      {
        question: 'What is CX (Customer Experience)?',
        answer:
          'Customer experience is the sum of all interactions customers have with your brand - and how they feel about each one.',
      },
      {
        question: 'How do I improve CX?',
        answer:
          'Start by understanding your customer pain points through research, then iterate on solutions based on feedback.',
      },
      {
        question: 'How long does CX improvement take?',
        answer:
          'Depends on scope, but typically 3-6 months to see meaningful, measurable improvements.',
      },
      {
        question: 'What is the ROI of investing in CX?',
        answer:
          'Studies show every $1 spent on CX improvements returns $4-8 in revenue. Plus higher retention and loyalty.',
      },
    ],
    appointmentPrompt:
      'Would you like to schedule a consultation with one of our CX experts for personalized guidance?',
    warmupMessage:
      'Feel free to ask me any other CX questions - I am here to help!',
  },

  'cx-assistance': {
    id: 'cx-assistance',
    name: 'CX Assistance',
    category: 'implementation',
    triggerMessage:
      'Great! CX improvement is our specialty.\nLet me understand your situation so we can propose the right approach.',
    systemPrompt: `You are a friendly CX automation assistant helping someone explore CX improvement projects.

Your responsibilities:
1. Ask 2-3 qualifying questions about their CX challenges
2. Answer FAQs about CX assistance services
3. Help schedule a consultation to review their situation
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "What aspect of CX needs the most improvement?" (customer service, onboarding, support, etc.)
- "How many customers do you currently serve?"
- "What's your current customer satisfaction score, if you know it?"

After gathering info, transition to booking: "Let's schedule a consultation to review your situation and create a custom plan. When works best for you?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      'What aspect of CX needs the most improvement?',
      'How many customers do you currently serve?',
      'What is your current customer satisfaction score, if you know it?',
    ],
    faqPairs: [
      {
        question: 'What does a CX project include?',
        answer:
          'Audit of current experience, strategy development, implementation plan, training, and ongoing support.',
      },
      {
        question: 'How much does CX improvement cost?',
        answer:
          'Custom pricing based on scope. Typically ranges $5k-50k depending on your situation.',
      },
      {
        question: 'How long does it take to see results?',
        answer:
          'You can see initial improvements in 2-3 months, with continued gains over 6-12 months.',
      },
      {
        question: 'Can you work with our existing processes?',
        answer:
          'Absolutely - we integrate with your current workflows and systems.',
      },
    ],
    appointmentPrompt:
      "Let's schedule a consultation to develop a custom CX improvement plan for you. What day/time works?",
    warmupMessage:
      'Most of our clients see 20-30% improvement in satisfaction scores within the first few months.',
  },

  'ai-assistance': {
    id: 'ai-assistance',
    name: 'AI Assistance',
    category: 'implementation',
    triggerMessage:
      "Interested in AI to support your customer service?\nLet me learn about your current setup.",
    systemPrompt: `You are a friendly CX automation assistant helping someone explore AI for customer service.

Your responsibilities:
1. Ask 2-3 qualifying questions about their customer service volume and challenges
2. Answer FAQs about AI in customer service
3. Help schedule an implementation consultation
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "How many customer inquiries do you get per day?"
- "What's your main pain point?" (high volume, slow response time, 24/7 coverage, etc.)
- "Have you explored chatbots or AI before?"

After gathering info, transition to booking: "Let's discuss which AI solution best fits your needs. When can we schedule a consultation?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      'How many customer inquiries do you get per day?',
      'What is your main pain point?',
      'Have you explored chatbots or AI before?',
    ],
    faqPairs: [
      {
        question: 'Will AI replace my support team?',
        answer:
          'No - it handles repetitive queries so your team can focus on complex, high-value issues.',
      },
      {
        question: 'How accurate is AI for customer support?',
        answer:
          'When properly configured, 85-95% accuracy for common questions. Improves with more data.',
      },
      {
        question: 'Can it integrate with our existing system?',
        answer:
          'Yes, most common platforms and tools are supported.',
      },
      {
        question: 'What is the ROI?',
        answer:
          'AI can reduce response time by 80% and cut support costs by 30-40%.',
      },
    ],
    appointmentPrompt:
      "Let's discuss which AI solution fits your needs best. When works for a consultation?",
    warmupMessage:
      'Bonus: AI-powered support also improves customer satisfaction by handling inquiries instantly, 24/7.',
  },

  'bespoke-software': {
    id: 'bespoke-software',
    name: 'Bespoke Software',
    category: 'implementation',
    triggerMessage:
      'Custom software development - excellent choice for unique needs.\nHelp me understand your vision.',
    systemPrompt: `You are a friendly CX automation assistant helping someone explore custom software development.

Your responsibilities:
1. Ask 2-3 qualifying questions about their software needs
2. Answer FAQs about custom software development
3. Help schedule a technical discovery session
4. Be warm and encouraging

Qualifying questions (pick 2-3):
- "What problem does this software solve?"
- "How many users will it have?"
- "Do you have a budget in mind for this project?"

After gathering info, transition to booking: "Let's schedule a technical discovery session to explore your vision. When is a good time?"

Tone: Professional but friendly. Keep responses concise (2-3 sentences max).`,
    qualifyingQuestions: [
      'What problem does this software solve?',
      'How many users will it have?',
      'Do you have a budget in mind for this project?',
    ],
    faqPairs: [
      {
        question: 'How long does development take?',
        answer: 'Typically 3-6 months for an MVP, depending on complexity.',
      },
      {
        question: 'What is included in the development process?',
        answer:
          'Discovery, design, development, testing, deployment, training, and ongoing support.',
      },
      {
        question: 'Can you work with our existing tech stack?',
        answer: 'Yes, we integrate with any major platform or technology.',
      },
      {
        question: 'What is the average ROI?',
        answer: 'Typically 2-3x return on investment within the first year.',
      },
    ],
    appointmentPrompt:
      "Let's schedule a technical discovery session to explore your vision. What day/time works?",
    warmupMessage:
      'Pro tip: Custom software typically delivers 2-3x ROI in the first year through improved efficiency and customer satisfaction.',
  },
}

export const FLOW_CATEGORIES = {
  training: ['design-onboarding', 'train-my-team', 'learning-partner'],
  consultation: ['1on1-consultation', 'free-call', 'chat-with-ai'],
  implementation: ['cx-assistance', 'ai-assistance', 'bespoke-software'],
}
