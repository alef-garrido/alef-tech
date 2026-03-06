type Messages = Record<string, Record<string, string> | string>;

// Server-friendly translator: call from Server Components when you have messages available
export function getServerTranslator(messages: Messages, namespace?: string) {
  return (key?: string) => {
    if (!key) return '';
    if (!namespace) {
      const value = messages[key];
      return typeof value === 'string' ? value : key;
    }
    const ns = messages[namespace];
    if (typeof ns === 'string') return key;
    return ((ns as Record<string, string>)?.[key]) ?? key;
  };
}
