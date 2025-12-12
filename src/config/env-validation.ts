export function validateEnvironmentVariables() {
  // Only validate for actual runtime (not during build)
  if (process.env.TURBOPACK === 'true' || process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }

  const requiredEnvVars = [
    'GOOGLE_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missingEnvVars.join(', ')}`);
  }
}
