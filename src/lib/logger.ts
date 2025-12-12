import * as Sentry from '@sentry/nextjs';

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  info: (message: string, data?: any) => {
    if (isDev) console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error: any) => {
    // Always log to console
    console.error(`[ERROR] ${message}`, error);

    // Send to Sentry in production
    if (!isDev) {
      Sentry.captureException(error, {
        extra: { message },
      });
    }
  },
};
