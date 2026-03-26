import Link from "next/link";

const productLinks = [
  { label: "Templates", href: "#templates" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Examples", href: "#examples" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Help Center", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[12px] font-medium tracking-[0.06em] uppercase text-white/30 mb-4">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-white/50 hover:text-white text-[13px] transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 2L20 12L12 22L4 12L12 2Z"
                  fill="currentColor"
                  fillOpacity="0.9"
                />
                <path
                  d="M12 6L16 12L12 18L8 12L12 6Z"
                  fill="white"
                  fillOpacity="0.15"
                />
              </svg>
              <span className="font-serif text-lg text-white">Invitely</span>
            </Link>
            <p className="text-white/50 text-[13px] leading-[1.6]">
              Beautiful invitations for life&apos;s best moments.
            </p>
          </div>

          <FooterLinkGroup title="Product" links={productLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[12px]">
            © 2026 Invitely. Made with ♥ in India.
          </p>
          <div className="flex items-center gap-4">
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4L10.5 12.5L4 20H6L11.5 14L16 20H20L13 11L19 4H17L12 9.5L8 4H4Z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
