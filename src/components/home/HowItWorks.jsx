import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSearch, FiMessageCircle, FiPackage, FiStar } from 'react-icons/fi';

const STEPS = [
  {
    icon: FiSearch,
    title: 'Post or search a trip',
    description:
      'Travellers post the route they are already taking. Senders search by that same route and find a match in seconds.',
  },
  {
    icon: FiMessageCircle,
    title: 'Match & agree',
    description:
      'Chat directly, check ratings and verification badges, and agree on the reward and pickup point.',
  },
  {
    icon: FiPackage,
    title: 'Handoff & carry',
    description:
      'The sender hands over the item, and the traveller carries it along a trip they were already making.',
  },
  {
    icon: FiStar,
    title: 'Deliver & rate',
    description:
      'The package arrives, both sides confirm delivery, and rate each other — building trust for the next trip.',
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className="bg-ink-50/60 py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-medium text-primary-600">
            How it works
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            From posted trip to delivered package
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-500">
            Four steps, no warehouses, no couriers — just people already going your way.
          </p>
        </div>

        <div ref={containerRef} className="relative mt-16">
          {/* Track + fill line that grows as you scroll through the steps */}
          <div className="absolute bottom-2 left-6 top-2 w-px bg-ink-200" />
          <motion.div style={{ height: lineHeight }} className="absolute left-6 top-2 w-px bg-primary-600" />

          <div className="space-y-12">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative flex gap-6"
                >
                  <div className="relative z-10 grid h-12 w-12 flex-none place-items-center rounded-full border-2 border-primary-600 bg-white font-display text-sm font-semibold text-primary-600">
                    {index + 1}
                  </div>
                  <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
                    <p className="flex items-center gap-2 font-display text-base font-semibold text-ink-900">
                      <Icon className="text-primary-600" size={16} /> {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
