import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiRepeat, FiSearch } from 'react-icons/fi';
import TripCard from '@/components/common/TripCard';
import Button from '@/components/common/Button';
import { TRIPS, TRANSPORT_OPTIONS } from '@/data/trips';

const SORT_OPTIONS = [
  { value: 'date', label: 'Soonest date' },
  { value: 'rating', label: 'Highest rated traveller' },
  { value: 'reward', label: 'Lowest reward' },
];

const FIELD_CLASS =
  'rounded-xl border border-ink-200 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-primary-600 dark:border-ink-700 dark:bg-ink-900 dark:text-white';

export default function FindTraveller() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [transport, setTransport] = useState('Any');
  const [minWeight, setMinWeight] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [rotation, setRotation] = useState(0);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setRotation((r) => r + 180);
  };

  const results = useMemo(() => {
    const filtered = TRIPS.filter((trip) => {
      const matchesFrom = from.trim() === '' || trip.from.toLowerCase().includes(from.trim().toLowerCase());
      const matchesTo = to.trim() === '' || trip.to.toLowerCase().includes(to.trim().toLowerCase());
      const matchesDate = date === '' || trip.date === date;
      const matchesTransport = transport === 'Any' || trip.transport === transport;
      const matchesWeight = minWeight === '' || trip.weight >= Number(minWeight);
      return matchesFrom && matchesTo && matchesDate && matchesTransport && matchesWeight;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'rating') return b.traveller.rating - a.traveller.rating;
      if (sortBy === 'reward') return a.reward - b.reward;
      return 0;
    });
  }, [from, to, date, transport, minWeight, sortBy]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-600 dark:bg-primary-800/40 dark:text-primary-300">
          <FiMapPin size={13} /> Find a traveller
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          Search trips headed your way
        </h1>
        <p className="mt-3 text-ink-500 dark:text-ink-400">
          Tell us where your package needs to go. We'll show every traveller already making that trip.
        </p>
      </div>

      {/* Search form */}
      <div className="mt-10 rounded-3xl border border-ink-100 bg-white p-6 shadow-lg shadow-ink-900/5 dark:border-ink-700 dark:bg-ink-800">
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto_1fr_1fr]">
          <div>
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">From</label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. Delhi"
              className={`mt-1 w-full ${FIELD_CLASS}`}
            />
          </div>

          <motion.button
            type="button"
            onClick={handleSwap}
            animate={{ rotate: rotation }}
            transition={{ duration: 0.3 }}
            className="mb-0.5 grid h-10 w-10 place-items-center self-end rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-primary-600 hover:text-primary-600 dark:border-ink-700 dark:text-ink-400 md:mb-1"
            aria-label="Swap origin and destination"
          >
            <FiRepeat size={16} />
          </motion.button>

          <div>
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">To</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="e.g. Lucknow"
              className={`mt-1 w-full ${FIELD_CLASS}`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`mt-1 w-full ${FIELD_CLASS} dark:[color-scheme:dark]`}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Transport</label>
            <select
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className={`mt-1 ${FIELD_CLASS}`}
            >
              <option>Any</option>
              {TRANSPORT_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Min. weight needed (kg)</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={minWeight}
              onChange={(e) => setMinWeight(e.target.value)}
              placeholder="0"
              className={`mt-1 w-32 ${FIELD_CLASS}`}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`mt-1 ${FIELD_CLASS}`}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" className="ml-auto">
            <FiSearch /> Search
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        <p className="text-sm text-ink-500 dark:text-ink-400">
          {results.length} trip{results.length !== 1 ? 's' : ''} found
        </p>

        {results.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-ink-200 p-12 text-center dark:border-ink-700">
            <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">No trips match yet</p>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              Try widening your search, or check back soon — new trips are posted every day.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {results.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TripCard trip={trip} actionSlot={<Button variant="outline" size="sm">Request delivery</Button>} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}