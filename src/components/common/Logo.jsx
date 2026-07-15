import { Link } from 'react-router-dom';

/**
 * Hamsafar wordmark. The mark is a simple travel arc between two points:
 * a blue origin dot and an amber destination dot — the same visual
 * language used across trip cards (route + reward).
 */
export default function Logo({ variant = 'dark', className = '' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const strokeColor = variant === 'light' ? '#FFFFFF' : '#1E5FC4';

  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 24C10 24 10 8 16 8C22 8 22 24 28 24"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="4" cy="24" r="2.5" fill={strokeColor} />
        <circle cx="28" cy="24" r="2.5" fill="#F5A524" />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${textColor}`}>
        Hamsafar
      </span>
    </Link>
  );
}
