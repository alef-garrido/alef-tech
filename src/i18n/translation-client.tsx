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

  return (key?: string): string => {
    if (!key) return '';
    if (!namespace) {
      const val = ctx.messages[key];
      return typeof val === 'string' ? val : key;
    }
    const namespaceContent = ctx.messages[namespace];
    if (typeof namespaceContent === 'object' && namespaceContent && typeof namespaceContent === 'object') {
      const content = namespaceContent as Record<string, string>;
      return content[key] || key;
    }
    return key;
  };
}

export function useLocale() {
  const ctx = useContext(TranslationContext);
  return ctx.locale;
}
