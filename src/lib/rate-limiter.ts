import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

// Create a new ratelimiter, allowing 5 requests per 10 seconds per IP address.
// This is a global ratelimiter for general API abuse protection.
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '10s'),
  analytics: true,
  /**
   * Optional: A value that will be used as an identifier for the client for debugging purposes. If options.analytics is true, a separate set of analytics will be created where the vercelId is used as a fiels.
   */
  // @ts-ignore - vercel comes from process.env which is typed to NodeJS.ProcessEnv
  // but it works fine, so ignoring the type error for now.
  // vercel: process.env.VERCEL_ID || 'development',
});

// Specific ratelimiter for AI chat to prevent excessive token usage
export const chatRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, '60s'), // 3 requests per 60 seconds per IP for chat
  analytics: true,
});

// Specific ratelimiter for lead submissions
export const leadRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, '30s'), // 1 request per 30 seconds per IP for leads
  analytics: true,
});

// Helper function to get IP address from request
export function getIp(request: Request) {
  const xff = request.headers.get('x-forwarded-for');
  return xff ? xff.split(',')[0] : '127.0.0.1'; // Fallback for local development
}
