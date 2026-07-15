import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import Button from '@/components/common/Button';
import TripCard from '@/components/common/TripCard';
import HowItWorks from '@/components/home/HowItWorks';

const heroTrip = {
  from: 'Delhi',
  fromCode: 'DEL',
  to: 'Lucknow',
  toCode: 'LKO',
  date: '2026-07-15',
  transport: 'Flight',
  weight: 2,
  allowedItems: ['Documents', 'Clothes', 'Books'],
  reward: 300,
};

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-600">
          <FiMapPin size={13} /> Now live across India
        </span>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-[3.25rem]">
          Someone is already headed your way.
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
          Hamsafar connects everyday travellers with people who need something
          delivered — a document, a gift, a little piece of home. No courier, no
          warehouse. Just a fellow traveller with a little room to spare.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="primary" size="lg" to="/travellers">
            Find a traveller <FiArrowRight />
          </Button>
          <Button variant="outline" size="lg" to="/upload-trip">
            Post your trip
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-8">
          <div>
            <p className="font-display text-2xl font-semibold text-ink-900">12,400+</p>
            <p className="text-sm text-ink-500">Deliveries carried</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-ink-900">4.8/5</p>
            <p className="text-sm text-ink-500">Average traveller rating</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      >
        <TripCard trip={heroTrip} showTraveller={false} />
      </motion.div>
      </section>

      <HowItWorks />
    </>
  );
}
