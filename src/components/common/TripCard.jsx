import { FiArrowRight, FiStar, FiCheckCircle } from 'react-icons/fi';
import { FaPlane, FaTrain, FaBus, FaCar } from 'react-icons/fa';
import TicketDivider from './TicketDivider';

const TRANSPORT_ICONS = {
  Flight: FaPlane,
  Train: FaTrain,
  Bus: FaBus,
  Car: FaCar,
};

function formatDate(dateStr) {
  if (!dateStr) return 'Date TBC';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/**
 * The boarding-pass style trip card — Hamsafar's core content unit.
 * Reused on the Home hero, the Find a Traveller results list, and the
 * Post Your Trip live preview, so the "ticket" motif stays identical
 * everywhere a trip is shown.
 */
export default function TripCard({ trip, showTraveller = true, actionSlot, previewLabel }) {
  const TransportIcon = TRANSPORT_ICONS[trip.transport] || FaPlane;

  return (
    <div className="relative rounded-3xl border border-ink-100 bg-white p-6 shadow-xl shadow-ink-900/5">
      {previewLabel && (
        <span className="absolute -top-3 left-6 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
          {previewLabel}
        </span>
      )}

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-500">
          <TransportIcon size={11} /> Trip · {trip.transport}
        </p>
        <p className="font-mono text-xs text-ink-500">{formatDate(trip.date)}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-ink-900">{trip.from}</p>
          {trip.fromCode && <p className="text-xs text-ink-500">{trip.fromCode}</p>}
        </div>
        <FiArrowRight className="text-ink-300" size={20} />
        <div className="text-right">
          <p className="font-display text-2xl font-semibold text-ink-900">{trip.to}</p>
          {trip.toCode && <p className="text-xs text-ink-500">{trip.toCode}</p>}
        </div>
      </div>

      <div className="my-6">
        <TicketDivider tone="light" />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-ink-500">Available weight</p>
          <p className="font-mono font-semibold text-ink-900">{trip.weight || 0} kg</p>
        </div>
        <div className="max-w-[40%]">
          <p className="text-ink-500">Allowed</p>
          <p className="font-semibold text-ink-900">{(trip.allowedItems || []).join(', ') || '—'}</p>
        </div>
        <div className="text-right">
          <p className="text-ink-500">Reward</p>
          <p className="font-mono font-semibold text-amber-600">₹{trip.reward || 0}</p>
        </div>
      </div>

      {showTraveller && trip.traveller && (
        <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-50 font-display text-sm font-semibold text-primary-600">
              {trip.traveller.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-ink-900">
                {trip.traveller.name}
                {trip.traveller.verified && <FiCheckCircle className="text-primary-600" size={14} />}
              </p>
              <p className="flex items-center gap-1 text-xs text-ink-500">
                <FiStar className="text-amber-600" size={12} /> {trip.traveller.rating} · {trip.traveller.completedDeliveries} delivered
              </p>
            </div>
          </div>
          {actionSlot}
        </div>
      )}
    </div>
  );
}
