"use client";

import React, { createContext, useContext } from 'react';

type Messages = Record<string, Record<string, string> | string>;

const TranslationContext = createContext<{ locale: string; messages: Record<string, unknown> }>({
  locale: 'en',
  messages: {},
});

export function TranslationProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={{ locale, messages: messages as Record<string, unknown> }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const ctx = useContext(TranslationContext);

  return (key?: string) => {
    if (!key) return '';
    if (!namespace) {
      const value = ctx.messages[key];
      return typeof value === 'string' ? value : key;
    }
    const ns = ctx.messages[namespace];
    if (typeof ns === 'string') return key;
    return ((ns as Record<string, string>)?.[key]) ?? key;
  };
}

export function useLocale() {
  const ctx = useContext(TranslationContext);
  return ctx.locale;
}
