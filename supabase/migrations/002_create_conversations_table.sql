
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id text NOT NULL,
  session_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),

  UNIQUE (flow_id, session_id)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations" ON conversations
  FOR SELECT USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Users can insert their own conversations" ON conversations
  FOR INSERT WITH CHECK (session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Users can update their own conversations" ON conversations
  FOR UPDATE USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

CREATE POLICY "Users can delete their own conversations" ON conversations
  FOR DELETE USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

