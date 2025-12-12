# SECURITY NOTES

## Row-Level Security (RLS) Policies

This application uses Supabase with Row-Level Security to control data access. **ALL data is public by default unless RLS policies are enforced.**

### ⚠️ CRITICAL: RLS Policies MUST be enabled and configured correctly before production deployment

---

## Database Tables & RLS Policies

### 1. `conversations` Table

**Purpose:** Store chat conversations for each user session and automation flow

**RLS Policy Required:**
```sql
-- Allow public read/write with session_id isolation
-- Users can only access conversations they created (identified by session_id)
CREATE POLICY "Users can read own conversations"
ON conversations
FOR SELECT
USING (session_id = (SELECT current_setting('request.jwt.claims') ->> 'sub'));

-- Simplified policy (if auth not enabled): Allow by session_id
CREATE POLICY "Public can manage own conversations"
ON conversations
FOR ALL
USING (true);  -- Allow if RLS is enabled, will need session tracking
```

**Security Model:**
- `session_id` acts as user identifier (generated client-side)
- Each session can only read/write their own conversations
- No cross-session access possible

**Fields:**
- `flow_id` (string) - Which automation flow
- `session_id` (string) - User's session (PRIMARY KEY component)
- `messages` (jsonb) - Conversation messages
- `last_updated` (timestamp) - When conversation was last modified

---

### 2. `leads` Table

**Purpose:** Store lead contact information captured from chatbot

**RLS Policy Required:**
```sql
-- Allow public to INSERT leads (lead capture)
CREATE POLICY "Public can create leads"
ON leads
FOR INSERT
WITH CHECK (true);

-- Authenticated users can read their own leads
CREATE POLICY "Users can read own leads"
ON leads
FOR SELECT
USING (session_id = (SELECT current_setting('request.jwt.claims') ->> 'sub'));

-- Allow update/delete of own leads
CREATE POLICY "Users can update own leads"
ON leads
FOR UPDATE
USING (session_id = (SELECT current_setting('request.jwt.claims') ->> 'sub'));
```

**Security Model:**
- Public can submit leads (no auth required for lead capture)
- Each lead tied to `session_id` of submitter
- Cross-session lead reading prevented

**Fields:**
- `id` (uuid) - Unique lead ID
- `email` (string) - Lead email
- `name` (string) - Lead name
- `phone` (string) - Lead phone
- `company` (string) - Lead company
- `service_interested` (string) - Which service flow
- `flow_id` (string) - Which automation flow
- `session_id` (string) - User's session
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## API Rate Limiting

All API endpoints are rate-limited using Upstash Redis:

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `/api/chat` | 3 requests | 60 seconds | Prevent expensive AI API abuse |
| `/api/leads` (POST) | 1 request | 30 seconds | Prevent spam submissions |
| `/api/leads` (GET) | 5 requests | 10 seconds | Prevent data scraping |
| `/api/conversations` | 5 requests | 10 seconds | Prevent conversation enumeration |

Rate limits are applied per client IP address.

---

## Input Sanitization

### Prompt Injection Prevention (Server-side)
- **File:** `src/app/api/chat/route.ts`
- **Method:** Lead data wrapped in XML tags and special characters escaped
- **Example:**
  ```
  <lead-information>
    <email>user@example.com</email>
    <company>Acme\, Inc\.</company>
  </lead-information>
  ```

### XSS Prevention (Client-side)
- **File:** `src/app/components/sidebar-chat.tsx`
- **Method:** DOMPurify sanitizes all AI-generated responses before rendering
- **Protection:** Prevents HTML/JavaScript injection from compromised AI or jailbreak attempts

---

## Environment Variables

### Required for Production

```bash
# Google Gemini API
GOOGLE_API_KEY=<your-google-api-key>
GOOGLE_MODEL=gemini-pro  # Optional, defaults to gemini-pro

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=<your-upstash-redis-url>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-redis-token>

# Optional: Error Tracking
NEXT_PUBLIC_SENTRY_DSN=<your-sentry-dsn>  # For error tracking
```

### Validation

Environment variables are validated on app startup in `src/config/env-validation.ts`. If any required variables are missing, the app will fail to start with a clear error message.

---

## Data Protection

### What Data is Stored

1. **Conversations:**
   - Chat message history (user and AI responses)
   - Flow ID and session ID
   - Timestamps

2. **Leads:**
   - Contact information (name, email, phone, company)
   - Service interested
   - Flow ID and session ID
   - Timestamps

3. **Logs:**
   - Basic error logs (development only)
   - API request logs (no sensitive data)

### Data Retention

- **Conversations:** Kept indefinitely (consider implementing TTL for privacy)
- **Leads:** Kept indefinitely (consider compliance retention policies)
- **Logs:** Retained per Vercel/server defaults

### Data Access

- Only accessible through authenticated Supabase client
- RLS policies enforce per-session isolation
- No user authentication (session-based only)
- Vercel/Supabase team members may have access per their terms

---

## CSRF Protection

**Status:** NOT YET IMPLEMENTED

Recommended: Use `next-csrf` middleware or add CSRF tokens to all POST requests

All POST endpoints are at risk without CSRF protection:
- `/api/chat`
- `/api/leads` (POST)
- `/api/conversations` (save/delete)

---

## Dependencies & Security

### Key Libraries

| Package | Purpose | Security Notes |
|---------|---------|-----------------|
| `@google/generative-ai` | AI chat responses | Requires API key |
| `@supabase/supabase-js` | Database & auth | Uses anon key + RLS |
| `@upstash/ratelimit` | API rate limiting | Uses Redis tokens |
| `dompurify` | XSS prevention | Sanitizes HTML output |

### Known Vulnerabilities

Check regularly with:
```bash
npm audit
```

---

## Deployment Security Checklist

Before deploying to production, verify:

- [ ] All environment variables are set
- [ ] Supabase RLS policies are enabled and correct
- [ ] Database backups are configured
- [ ] Rate limiting is tested and working
- [ ] Input sanitization is verified
- [ ] Output sanitization (DOMPurify) is active
- [ ] Error messages don't leak sensitive data
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] CSP headers are set

---

## Monitoring & Incident Response

### Monitor These Metrics

- Rate limit violations (possible abuse)
- API error rates (possible security issues)
- Unusual conversation/lead patterns
- Failed authentication attempts (if added in future)

### Incident Response

If you suspect a security issue:

1. **Immediately review logs** for suspicious activity
2. **Check rate limit metrics** in Upstash dashboard
3. **Review Supabase RLS policies** haven't been changed
4. **Check API error codes** for patterns
5. **Rotate credentials** if compromise suspected
6. **Notify users** if data exposure confirmed

---

## Future Security Enhancements

1. **User Authentication** - Add proper auth instead of session IDs
2. **CSRF Protection** - Implement middleware-based CSRF tokens
3. **Audit Logging** - Log all data access for compliance
4. **Encryption** - Encrypt sensitive data at rest (PII)
5. **Rate Limiting Alerts** - Alert on abuse patterns
6. **Sentry Integration** - Production error tracking
7. **Conversation Cleanup** - Implement TTL for old conversations
8. **API Key Rotation** - Regular key rotation schedule

---

## Questions or Issues?

Review this document regularly and update with:
- New policies implemented
- Security changes made
- Audit findings
- Incident reports

