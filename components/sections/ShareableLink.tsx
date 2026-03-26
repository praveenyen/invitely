import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Badge from "@/components/ui/Badge";

export default function ShareableLink() {
  return (
    <section className="bg-offwhite py-20 px-6 md:px-16" id="examples">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — Free tier */}
        <RevealOnScroll>
          <div>
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-normal leading-[1.2] mb-4">
              Your invite, live in seconds
            </h2>
            <p className="text-slate text-[15px] leading-[1.7] mb-6">
              Every invitation you create gets its own shareable link. Send it
              via WhatsApp, embed it in an email, or post it anywhere. Guests
              RSVP right on the page.
            </p>

            {/* Mock URL bar */}
            <div className="bg-white border-[0.5px] border-subtle rounded-lg px-4 py-2.5 flex items-center gap-2 mb-6">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888780"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12H22" />
                <path d="M12 2C14.5 4.7 16 8.2 16 12C16 15.8 14.5 19.3 12 22C9.5 19.3 8 15.8 8 12C8 8.2 9.5 4.7 12 2Z" />
              </svg>
              <span className="text-[13px] font-mono text-stone">
                yourname.invitely.app/wedding
              </span>
            </div>

            {/* Mini invite preview */}
            <div className="bg-[#F5EDE8] rounded-xl border-[0.5px] border-subtle p-6 text-center mb-4">
              <p className="text-[9px] tracking-[0.15em] uppercase text-stone mb-2">
                You&apos;re invited
              </p>
              <p className="font-serif text-[18px] text-ink">Priya & Arjun</p>
              <p className="text-[11px] text-stone mt-1">
                Dec 14 • The Grand Pavilion
              </p>
              <div className="mt-3 inline-block bg-ink text-white rounded-md px-3 py-1 text-[10px]">
                RSVP
              </div>
            </div>

            {/* RSVP counter */}
            <span className="inline-flex items-center bg-[#EAF3DE] text-success rounded-pill px-3 py-1 text-[12px] font-medium">
              ✓ 14 guests confirmed
            </span>
          </div>
        </RevealOnScroll>

        {/* Vertical divider — desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[var(--border-subtle)]" />

        {/* Right — Premium tier */}
        <RevealOnScroll delay={150}>
          <div className="lg:border-l-[0.5px] lg:border-subtle lg:pl-12">
            <Badge label="PREMIUM" color="amber" />
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-normal leading-[1.2] mt-3 mb-4">
              Your own domain. Your brand.
            </h2>
            <p className="text-slate text-[15px] leading-[1.7] mb-6">
              Make your invitation unforgettable with a custom domain. Your
              guests will see a professional URL that matches your celebration
              perfectly.
            </p>

            {/* Mock URL bar with padlock */}
            <div className="bg-white border-[0.5px] border-subtle rounded-lg px-4 py-2.5 flex items-center gap-2 mb-6">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D9E75"
                strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V11" />
              </svg>
              <span className="text-[13px] font-mono text-ink font-medium">
                sarah-and-arjun.com
              </span>
            </div>

            {/* Mini invite preview — premium */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 text-center mb-4">
              <p className="text-[9px] tracking-[0.15em] uppercase text-[#D4AF6A]/60 mb-2">
                You&apos;re invited
              </p>
              <p className="font-serif text-[18px] text-[#D4AF6A]">
                Sarah & Arjun
              </p>
              <p className="text-[11px] text-[#D4AF6A]/40 mt-1">
                Custom-branded experience
              </p>
            </div>

            <a
              href="#pricing"
              className="text-[14px] font-medium text-ink hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Connect your domain →
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
