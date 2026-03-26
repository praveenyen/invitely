"use client";

import SectionLabel from "@/components/ui/SectionLabel";

const testimonials = [
  {
    name: "Sneha R.",
    role: "Bride",
    initials: "SR",
    quote:
      "We shared the link on our wedding WhatsApp group and got 80 RSVPs in a day!",
  },
  {
    name: "James K.",
    role: "Anniversary Planner",
    initials: "JK",
    quote:
      "The AI-generated backdrop was stunning. Saved me hours of searching for the right photo.",
  },
  {
    name: "Priya M.",
    role: "Parent",
    initials: "PM",
    quote:
      "Used it for my daughter's birthday. Guests couldn't believe I made it myself.",
  },
  {
    name: "Tom W.",
    role: "Groom",
    initials: "TW",
    quote:
      "Getting our own domain made the invite feel so premium. Worth every rupee.",
  },
  {
    name: "Ananya B.",
    role: "Event Host",
    initials: "AB",
    quote:
      "The countdown timer on the invite page was a huge hit with our guests.",
  },
  {
    name: "Rahul S.",
    role: "Planner",
    initials: "RS",
    quote:
      "Setup took 10 minutes. The invite looked like it cost 10x more.",
  },
];

function TestimonialCard({
  name,
  role,
  initials,
  quote,
}: (typeof testimonials)[number]) {
  return (
    <div className="bg-white border-[0.5px] border-subtle rounded-xl p-5 min-w-[280px] max-w-[320px] shrink-0">
      <p className="text-warning text-sm mb-3">★★★★★</p>
      <p className="text-[13px] text-slate leading-[1.7] italic mb-4">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-mist text-slate flex items-center justify-center text-[11px] font-medium shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-[13px] font-medium text-ink">{name}</p>
          <p className="text-[12px] text-stone">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center px-6 mb-12">
        <SectionLabel>Loved by thousands</SectionLabel>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.2]">
          Real people, real celebrations
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
          {doubled.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} {...t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="flex gap-4 animate-marquee-reverse hover:[animation-play-state:paused] w-max">
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
