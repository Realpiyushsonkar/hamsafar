import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Logo from '@/components/common/Logo';
import TicketDivider from '@/components/common/TicketDivider';

const FOOTER_LINKS = {
  Product: [
    { label: 'Find a traveller', to: '/travellers' },
    { label: 'Post your trip', to: '/upload-trip' },
    { label: 'Send a package', to: '/send-package' },
  ],
  Company: [
    { label: 'About Hamsafar', to: '/about' },
    { label: 'How it works', to: '/#how-it-works' },
    { label: 'Trust & safety', to: '/safety' },
  ],
  Support: [
    { label: 'Help centre', to: '/help' },
    { label: 'Contact us', to: '/contact' },
    { label: 'Community guidelines', to: '/guidelines' },
  ],
};

const SOCIALS = [
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaTwitter, label: 'Twitter' },
  { Icon: FaLinkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Every traveller has a little room to spare. Hamsafar connects people
              already on the move with people who need something delivered.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
                {heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.to} className="text-sm text-white/80 transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <TicketDivider tone="dark" className="opacity-40" />

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Hamsafar. Travel together, deliver together.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white/80">Privacy</a>
            <a href="/terms" className="hover:text-white/80">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
