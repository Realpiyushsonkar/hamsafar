import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiRepeat, FiCheckCircle } from 'react-icons/fi';
import { FaPlane, FaTrain, FaBus, FaCar } from 'react-icons/fa';
import TripCard from '@/components/common/TripCard';
import Button from '@/components/common/Button';
import { ITEM_OPTIONS } from '@/data/trips';

const TRANSPORT_MODES = [
  { value: 'Flight', Icon: FaPlane },
  { value: 'Train', Icon: FaTrain },
  { value: 'Bus', Icon: FaBus },
  { value: 'Car', Icon: FaCar },
];

const FIELD_BASE =
  'rounded-xl border px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-primary-600 dark:bg-ink-900 dark:text-white';

const CHIP_BASE = 'rounded-full border px-4 py-2 text-sm font-medium transition-colors';
const CHIP_ACTIVE = 'border-primary-600 bg-primary-50 text-primary-600 dark:bg-primary-800/40 dark:text-primary-300';
const CHIP_INACTIVE = 'border-ink-200 text-ink-500 hover:border-ink-300 dark:border-ink-700 dark:text-ink-400 dark:hover:border-ink-600';

export default function PostTrip() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [transport, setTransport] = useState('Flight');
  const [weight, setWeight] = useState(2);
  const [allowedItems, setAllowedItems] = useState(['Documents']);
  const [reward, setReward] = useState('');
  const [notes, setNotes] = useState('');
  const [rotation, setRotation] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (item) => {
    setAllowedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setRotation((r) => r + 180);
  };

  const previewTrip = useMemo(
    () => ({
      from: from || 'Your city',
      to: to || 'Destination',
      date,
      transport,
      weight,
      allowedItems,
      reward: reward || 0,
    }),
    [from, to, date, transport, weight, allowedItems, reward],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!from.trim()) nextErrors.from = 'Enter your travel origin';
    if (!to.trim()) nextErrors.to = 'Enter your travel destination';
    if (!date) nextErrors.date = 'Pick a travel date';
    if (!reward || Number(reward) <= 0) nextErrors.reward = 'Enter a reward amount';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setFrom('');
    setTo('');
    setDate('');
    setTransport('Flight');
    setWeight(2);
    setAllowedItems(['Documents']);
    setReward('');
    setNotes('');
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center lg:px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-800/40 dark:text-primary-300"
        >
          <FiCheckCircle size={32} />
        </motion.div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-white">Trip posted</h1>
        <p className="mt-2 text-ink-500 dark:text-ink-400">
          Your trip from {previewTrip.from} to {previewTrip.to} is now visible to senders searching that route.
        </p>
        <div className="mt-8 w-full">
          <TripCard trip={previewTrip} showTraveller={false} />
        </div>
        <Button variant="outline" className="mt-8" onClick={resetForm}>
          Post another trip
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-600 dark:bg-primary-800/40 dark:text-primary-300">
          Post your trip
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
          Turn your trip into someone's delivery
        </h1>
        <p className="mt-3 text-ink-500 dark:text-ink-400">
          Tell us your route and how much room you've got. Senders on the same path will find you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-ink-100 bg-white p-6 shadow-lg shadow-ink-900/5 dark:border-ink-700 dark:bg-ink-800"
        >
          {/* Route */}
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Travelling from</label>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Delhi"
                className={`mt-1 w-full ${FIELD_BASE} ${errors.from ? 'border-red-400' : 'border-ink-200 dark:border-ink-700'}`}
              />
              {errors.from && <p className="mt-1 text-xs text-red-500">{errors.from}</p>}
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
              <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Travelling to</label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Lucknow"
                className={`mt-1 w-full ${FIELD_BASE} ${errors.to ? 'border-red-400' : 'border-ink-200 dark:border-ink-700'}`}
              />
              {errors.to && <p className="mt-1 text-xs text-red-500">{errors.to}</p>}
            </div>
          </div>

          {/* Date */}
          <div className="mt-4">
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Travel date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`mt-1 w-full md:w-48 ${FIELD_BASE} dark:[color-scheme:dark] ${
                errors.date ? 'border-red-400' : 'border-ink-200 dark:border-ink-700'
              }`}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>

          {/* Transport mode */}
          <div className="mt-6">
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">How are you travelling?</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TRANSPORT_MODES.map(({ value, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTransport(value)}
                  className={`flex items-center gap-2 ${CHIP_BASE} ${transport === value ? CHIP_ACTIVE : CHIP_INACTIVE}`}
                >
                  <Icon size={13} /> {value}
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Available weight</label>
              <span className="font-mono text-sm font-semibold text-ink-900 dark:text-white">{weight} kg</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="mt-2 w-full accent-primary-600"
            />
            <div className="mt-1 flex justify-between text-xs text-ink-300 dark:text-ink-600">
              <span>0.5 kg</span>
              <span>10 kg</span>
            </div>
          </div>

          {/* Allowed items */}
          <div className="mt-6">
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">What are you willing to carry?</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ITEM_OPTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleItem(item)}
                  className={`${CHIP_BASE} ${allowedItems.includes(item) ? CHIP_ACTIVE : CHIP_INACTIVE}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Reward */}
          <div className="mt-6">
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Reward you'd like to charge</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-sm text-ink-500 dark:text-ink-400">₹</span>
              <input
                type="number"
                min="0"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="300"
                className={`w-32 font-mono ${FIELD_BASE} ${errors.reward ? 'border-red-400' : 'border-ink-200 dark:border-ink-700'}`}
              />
            </div>
            {errors.reward && <p className="mt-1 text-xs text-red-500">{errors.reward}</p>}
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="text-xs font-medium text-ink-500 dark:text-ink-400">Special instructions (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. Can't carry liquids, meet me near the departure gate"
              className={`mt-1 w-full ${FIELD_BASE} border-ink-200 dark:border-ink-700`}
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-8 w-full md:w-auto">
            Post this trip
          </Button>
        </form>

        {/* Live preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-500 dark:text-ink-400">Preview</p>
          <TripCard trip={previewTrip} showTraveller={false} previewLabel="Live preview" />
        </div>
      </div>
    </section>
  );
}