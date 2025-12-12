-- Supabase SQL Migration: Create leads table
-- Run this in your Supabase SQL editor to set up the database

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interested TEXT NOT NULL,
  preferred_time TEXT,
  notes TEXT,
  flow_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_flow_id ON public.leads(flow_id);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_email_flow ON public.leads(email, flow_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (adjust for production)
CREATE POLICY "Allow all leads operations" ON public.leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant access to authenticated and anonymous users
GRANT ALL ON public.leads TO anon, authenticated;
