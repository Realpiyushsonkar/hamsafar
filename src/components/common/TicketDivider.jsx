/**
 * Decorative divider styled like the perforation on a boarding pass.
 * This is Hamsafar's signature visual motif — it reappears on every
 * trip / ticket card throughout the app to reinforce the "real travel
 * document" feel of a posted trip.
 */
export default function TicketDivider({ className = '', tone = 'light' }) {
  const dot = tone === 'dark' ? 'bg-primary-900 border-white/20' : 'bg-white border-ink-200';
  const line = tone === 'dark' ? 'border-white/20' : 'border-ink-200';

  return (
    <div className={`relative flex items-center ${className}`}>
      <span className={`-ml-2 h-4 w-4 rounded-full border ${dot}`} />
      <div className={`mx-1 flex-1 border-t-2 border-dashed ${line}`} />
      <span className={`-mr-2 h-4 w-4 rounded-full border ${dot}`} />
    </div>
  );
}
