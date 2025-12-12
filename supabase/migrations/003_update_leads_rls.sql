-- Supabase SQL Migration: Update RLS policies for leads table

-- Drop the permissive policy
DROP POLICY IF EXISTS "Allow all leads operations" ON public.leads;

-- Create restrictive policies based on session_id
CREATE POLICY "Users can insert their own leads" ON public.leads
  FOR INSERT
  WITH CHECK (session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Users can update their own leads" ON public.leads
  FOR UPDATE
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Optional: If you want to allow users to view their own leads
-- CREATE POLICY "Users can view their own leads" ON public.leads
--   FOR SELECT
--   USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');
