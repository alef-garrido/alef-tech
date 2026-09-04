export default function SubstackIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3.5" width="18" height="2.8" rx="0.5" fill="currentColor" />
      <rect x="3" y="8.8" width="18" height="2.8" rx="0.5" fill="currentColor" />
      <path d="M3 14.1h18l-9 6.4-9-6.4z" fill="currentColor" />
    </svg>
  );
}
