-- Create leads table for form submissions
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company VARCHAR(255),
  service VARCHAR(50) NOT NULL,
  specific_needs TEXT,
  budget VARCHAR(50),
  timeline VARCHAR(50),
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add indexes for common queries
  CONSTRAINT email_not_empty CHECK (email <> ''),
  CONSTRAINT phone_not_empty CHECK (phone <> '')
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON leads(submitted_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_leads_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at
DROP TRIGGER IF EXISTS update_leads_timestamp_trigger ON leads;
CREATE TRIGGER update_leads_timestamp_trigger
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_leads_timestamp();

-- Enable Row Level Security (RLS) if needed
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from API (you might need to adjust based on your auth setup)
CREATE POLICY "Allow inserts from API" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read/update
CREATE POLICY "Allow service role full access" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);
