export default function TicketDivider({ className = '', tone = 'light' }) {
  const dot = tone === 'dark' ? 'bg-primary-900 border-white/20' : 'bg-white border-ink-200 dark:bg-ink-800 dark:border-ink-700';
  const line = tone === 'dark' ? 'border-white/20' : 'border-ink-200 dark:border-ink-700';

  return (
    <div className={`relative flex items-center ${className}`}>
      <span className={`-ml-2 h-4 w-4 rounded-full border ${dot}`} />
      <div className={`mx-1 flex-1 border-t-2 border-dashed ${line}`} />
      <span className={`-mr-2 h-4 w-4 rounded-full border ${dot}`} />
    </div>
  );
}