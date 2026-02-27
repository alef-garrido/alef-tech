# Lead Capture API Documentation

## Overview
El API `/api/leads` captura y almacena formularios de leads desde múltiples landing pages (squeeze pages, diagnostic page, etc.) directamente en Supabase.

## Endpoints

### POST `/api/leads`
Registra un nuevo lead en la base de datos.

#### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required, must be valid email)",
  "phone": "string (required)",
  "company": "string (optional)",
  "service": "training | consulting | implementation | general | diagnostic (required)",
  "specificNeeds": "string (optional)",
  "budget": "string (optional)",
  "timeline": "string (optional)",
  "notes": "string (optional)"
}
```

#### Success Response (201)
```json
{
  "success": true,
  "message": "Thank you for your submission. We will be in touch soon.",
  "leadId": "lead-1708951200000"
}
```

#### Error Responses

**400 - Missing Required Fields**
```json
{
  "error": "Missing required fields"
}
```

**400 - Invalid Email Format**
```json
{
  "error": "Invalid email format"
}
```

**500 - Processing Error**
```json
{
  "error": "Failed to process lead submission",
  "code": "LEAD_SUBMISSION_ERROR",
  "details": "Error details here"
}
```

## Database Schema

### `leads` table
```sql
- id (BIGSERIAL PRIMARY KEY)
- name (VARCHAR 255)
- email (VARCHAR 255) - indexed
- phone (VARCHAR 20)
- company (VARCHAR 255)
- service (VARCHAR 50) - indexed [training|consulting|implementation|general|diagnostic]
- specific_needs (TEXT)
- budget (VARCHAR 50)
- timeline (VARCHAR 50)
- notes (TEXT)
- submitted_at (TIMESTAMP WITH TIME ZONE)
- source (VARCHAR 100) - indexed [squeeze-page|xnoria-diagnostic]
- status (VARCHAR 50) - default: 'new', indexed
- created_at (TIMESTAMP WITH TIME ZONE)
- updated_at (TIMESTAMP WITH TIME ZONE) - auto-updates on modification
```

## Implementation Details

### Source Tracking
Leads are automatically categorized by source:
- `squeeze-page`: Standard service leads (training, consulting, implementation)
- `xnoria-diagnostic`: XNORIA Clinic diagnostic form submissions

### Service-Specific Behavior
- **diagnostic**: Minimal form with business name + WhatsApp focus
- **other services**: Full lead qualification form

### Integration Points

#### Diagnostic Page (`/diagnostic`)
```typescript
const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.businessName,
    phone: formData.whatsapp,
    email: `lead-${Date.now()}@xnoriaclinic.local`,
    company: formData.businessName,
    service: 'diagnostic',
    specificNeeds: 'XNORIA Clinic - Diagnóstico CX Express',
  }),
});
```

## Setup Instructions

### 1. Create Supabase Table
Execute `supabase_schema.sql` in your Supabase SQL editor:
1. Go to Supabase Dashboard → SQL Editor
2. Create new query
3. Paste contents of `supabase_schema.sql`
4. Run the query

### 2. Environment Variables
Required variables (already configured):
```
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (optional, uses anon key if not provided)
```

### 3. Verify Setup
Test the endpoint:
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "phone": "+1234567890",
    "service": "diagnostic",
    "company": "Test Company"
  }'
```

## Features

✅ **Validation**
- Required field checking
- Email format validation
- Phone number acceptance

✅ **Data Storage**
- Automatic timestamp on submission
- Source tracking for attribution
- Status field for workflow tracking

✅ **Indexing**
- Optimized queries by email, service, source, status
- Efficient sorting by submission date

✅ **Error Handling**
- Graceful fallback if Supabase fails
- Detailed error logging
- Clear user messages

## Monitoring

### View Submissions
In Supabase Dashboard:
1. Navigate to Table Editor
2. Select `leads` table
3. Filter by status, service, or source as needed

### Common Queries
```sql
-- Get all new leads
SELECT * FROM leads WHERE status = 'new' ORDER BY submitted_at DESC;

-- Get diagnostic leads
SELECT * FROM leads WHERE service = 'diagnostic' ORDER BY submitted_at DESC;

-- Get leads by source
SELECT source, COUNT(*) as count FROM leads GROUP BY source;
```

## Future Enhancements

- [ ] Email notification on form submission
- [ ] Lead scoring based on service type and company size
- [ ] CRM integration (HubSpot, Pipedrive)
- [ ] Webhook for real-time processing
- [ ] Lead follow-up automation
- [ ] Analytics dashboard
