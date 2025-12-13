-- Enable Row-Level Security for conversations table
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read only their own conversations
CREATE POLICY "users_read_own_conversations"
ON conversations
FOR SELECT
USING (session_id = current_setting('request.jwt.claims')::jsonb ->> 'sub'
  OR session_id IS NOT NULL); -- Allow access if session_id is set

-- Policy: Users can create conversations
CREATE POLICY "users_create_conversations"
ON conversations
FOR INSERT
WITH CHECK (session_id IS NOT NULL);

-- Policy: Users can update their own conversations
CREATE POLICY "users_update_own_conversations"
ON conversations
FOR UPDATE
USING (session_id = current_setting('request.jwt.claims')::jsonb ->> 'sub'
  OR session_id IS NOT NULL);

-- Policy: Users can delete their own conversations
CREATE POLICY "users_delete_own_conversations"
ON conversations
FOR DELETE
USING (session_id = current_setting('request.jwt.claims')::jsonb ->> 'sub'
  OR session_id IS NOT NULL);

---

-- Enable Row-Level Security for leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Public/Anonymous can create leads (lead capture)
CREATE POLICY "public_create_leads"
ON leads
FOR INSERT
WITH CHECK (true);

-- Policy: Users can read their own leads
CREATE POLICY "users_read_own_leads"
ON leads
FOR SELECT
USING (session_id = current_setting('request.jwt.claims')::jsonb ->> 'sub'
  OR session_id IS NOT NULL);

-- Policy: Users can update their own leads
CREATE POLICY "users_update_own_leads"
ON leads
FOR UPDATE
USING (session_id = current_setting('request.jwt.claims')::jsonb ->> 'sub'
  OR session_id IS NOT NULL);

-- Policy: Users can delete their own leads
CREATE POLICY "users_delete_own_leads"
ON leads
FOR DELETE
USING (session_id = current_setting('request.jwt.claims')::jsonb ->> 'sub'
  OR session_id IS NOT NULL);
