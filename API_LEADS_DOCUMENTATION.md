# Lead Capture API Documentation

## Overview
El API `/api/leads` captura y almacena formularios de leads desde múltiples landing pages (squeeze pages, diagnostic page, etc.) directamente en Supabase, y opcionalmente envía webhooks a n8n para automatización.

## Endpoints

### POST `/api/leads`
Registra un nuevo lead en la base de datos y envía webhook a n8n si aplica.

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

## Webhook Integration with n8n

### Overview
When a lead is captured from the diagnostic page (`/diagnostic`), the API automatically sends the lead data to your n8n workflow via HTTP POST.

### Webhook Payload
The webhook sends the following JSON payload to your n8n endpoint:

```json
{
  "leadId": "12345",
  "name": "Juan García",
  "email": "juan@empresa.com",
  "phone": "+52 555 123 4567",
  "company": "Consultoría García",
  "service": "diagnostic",
  "specific_needs": "XNORIA Clinic - Diagnóstico CX Express",
  "budget": null,
  "timeline": null,
  "notes": null,
  "submitted_at": "2026-02-27T07:06:03.093Z",
  "source": "xnoria-diagnostic",
  "status": "new",
  "capturedAt": "2026-02-27T07:06:03.093Z"
}
```

### Setup Instructions

#### 1. Configure n8n Webhook
1. Create a new workflow in n8n
2. Add an HTTP trigger node:
   - Method: POST
   - Path: `/webhook/diagnostic-leads` (customize as needed)
3. Copy the webhook URL from n8n

#### 2. Set Environment Variable
Add to `.env`:
```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/diagnostic-leads
```

#### 3. Example n8n Workflow
```
HTTP Trigger (POST)
  ↓
Parse JSON
  ↓
Process Lead (your custom logic)
  ↓
Send Email/WhatsApp notification
  ↓
Update CRM
  ↓
Return Response
```

### Features

- **Asynchronous**: Webhook is sent asynchronously, doesn't block user response
- **Non-blocking**: Webhook failure doesn't affect lead capture
- **Service-specific**: Only diagnostic leads trigger n8n webhook
- **Error handling**: Failures are logged but don't interrupt the process
- **Automatic retry**: Configure retry policy in n8n itself

### Webhook Behavior

- ✅ Sent automatically when `service === 'diagnostic'`
- ✅ Includes complete lead data + metadata
- ✅ Async (doesn't block API response)
- ✅ Logged on success/failure
- ✅ Continues even if webhook fails

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

## Source Tracking
Leads are automatically categorized by source:
- `squeeze-page`: Standard service leads (training, consulting, implementation)
- `xnoria-diagnostic`: XNORIA Clinic diagnostic form submissions

## Integration Points

### Diagnostic Page (`/diagnostic`)
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
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/diagnostic-leads
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

✅ **Webhook Integration**
- Automatic n8n webhook on diagnostic leads
- Asynchronous, non-blocking delivery
- Error logging and recovery

✅ **Indexing**
- Optimized queries by email, service, source, status
- Efficient sorting by submission date

✅ **Error Handling**
- Graceful fallback if Supabase fails
- Graceful fallback if webhook fails
- Detailed error logging
- Clear user messages

## Monitoring

### View Submissions
In Supabase Dashboard:
1. Navigate to Table Editor
2. Select `leads` table
3. Filter by status, service, or source as needed

### Monitor Webhooks
In n8n:
1. Open the workflow execution history
2. Check logs for incoming webhook calls
3. Monitor lead processing

### Common Queries
```sql
-- Get all new leads
SELECT * FROM leads WHERE status = 'new' ORDER BY submitted_at DESC;

-- Get diagnostic leads
SELECT * FROM leads WHERE service = 'diagnostic' ORDER BY submitted_at DESC;

-- Get leads by source
SELECT source, COUNT(*) as count FROM leads GROUP BY source;

-- Get leads from last 24 hours
SELECT * FROM leads WHERE submitted_at > NOW() - INTERVAL '24 hours';
```

## Troubleshooting

### Webhook Not Triggering
- Check `N8N_WEBHOOK_URL` is set in `.env`
- Verify service type is `'diagnostic'`
- Check server logs for webhook errors
- Test webhook URL in browser (should return 405 or similar)

### Webhook Retries
- n8n handles retries automatically
- Configure retry policy in n8n webhook trigger settings
- Check n8n logs for specific errors

### Lead Not Saving
- Verify Supabase `leads` table exists
- Check Supabase credentials in `.env`
- Verify RLS policies allow inserts
- Check browser console for API errors

## Future Enhancements

- [ ] Email notification on form submission
- [ ] Lead scoring based on service type and company size
- [ ] CRM integration (HubSpot, Pipedrive)
- [ ] Webhook retry mechanism with exponential backoff
- [ ] Lead follow-up automation
- [ ] Analytics dashboard
- [ ] Custom webhook payload mapping

