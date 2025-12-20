"use client";

import React, { createContext, useContext } from 'react';

type Messages = Record<string, any>;

const TranslationContext = createContext<{ locale: string; messages: Messages }>({
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
    <TranslationContext.Provider value={{ locale, messages }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const ctx = useContext(TranslationContext);

  return (key?: string) => {
    if (!key) return '';
    if (!namespace) return ctx.messages[key] ?? key;
    return (ctx.messages[namespace] && ctx.messages[namespace][key]) ?? key;
  };
}

export function useLocale() {
  const ctx = useContext(TranslationContext);
  return ctx.locale;
}
