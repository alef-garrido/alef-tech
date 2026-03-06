export type Messages = Record<string, Record<string, string> | string>;

// Server-friendly translator: call from Server Components when you have messages available
export function getServerTranslator(messages: Messages, namespace?: string) {
  return (key?: string): string => {
    if (!key) return '';
    if (!namespace) {
      const val = messages[key];
      return typeof val === 'string' ? val : key;
    }
    const namespaceContent = messages[namespace];
    if (typeof namespaceContent === 'object' && namespaceContent && namespaceContent[key]) {
      return namespaceContent[key];
    }
    return key;
  };
}
