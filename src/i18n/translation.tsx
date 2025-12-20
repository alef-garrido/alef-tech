type Messages = Record<string, any>;

// Server-friendly translator: call from Server Components when you have messages available
export function getServerTranslator(messages: Messages, namespace?: string) {
  return (key?: string) => {
    if (!key) return '';
    if (!namespace) return messages[key] ?? key;
    return (messages[namespace] && messages[namespace][key]) ?? key;
  };
}
