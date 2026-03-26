"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay: delay / 1000 },
  };
}

function InviteCard() {
  return (
    <div className="relative w-[300px] sm:w-[340px] h-[420px] sm:h-[460px] mx-auto group cursor-pointer">
      {/* Card stack layers */}
      <div className="absolute inset-0 bg-[#EAE4E0] rounded-xl border-[0.5px] border-subtle transform rotate-[-4deg] translate-x-[-8px] translate-y-[6px] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:translate-x-[-14px]" />
      <div className="absolute inset-0 bg-[#F0EBE7] rounded-xl border-[0.5px] border-subtle transform rotate-[2deg] translate-x-[6px] translate-y-[4px] transition-transform duration-300 group-hover:rotate-[4deg] group-hover:translate-x-[12px]" />

      {/* Main card */}
      <div className="relative bg-[#F5EDE8] rounded-xl border-[0.5px] border-subtle h-full flex flex-col items-center justify-center px-8 py-10 text-center transition-transform duration-300 group-hover:translate-y-[-2px]">
        {/* Decorative top ornament */}
        <svg
          width="40"
          height="20"
          viewBox="0 0 40 20"
          className="mb-6 text-stone/40"
        >
          <path
            d="M0 10C8 10 12 2 20 2C28 2 32 10 40 10"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M0 14C8 14 12 6 20 6C28 6 32 14 40 14"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        <p className="text-[11px] tracking-[0.15em] uppercase text-stone mb-6">
          Together with their families
        </p>

        <h3 className="font-serif text-[28px] sm:text-[32px] text-ink leading-tight mb-1">
          Priya
        </h3>
        <p className="text-stone text-[13px] italic mb-1">&</p>
        <h3 className="font-serif text-[28px] sm:text-[32px] text-ink leading-tight mb-6">
          Arjun
        </h3>

        <p className="text-[11px] tracking-[0.12em] uppercase text-stone mb-2">
          Request the honour of your presence
        </p>

        <div className="w-12 h-[0.5px] bg-stone/30 my-4" />

        <p className="text-[14px] text-slate font-medium mb-1">
          Saturday, December 14th
        </p>
        <p className="text-[12px] text-stone mb-1">at half past four</p>
        <p className="text-[12px] text-stone mb-6">
          The Grand Pavilion, Udaipur
        </p>

        <div className="bg-ink text-white rounded-lg px-5 py-2 text-[12px] font-medium">
          RSVP
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-[140px] pb-[100px] px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Pill label */}
        <motion.div {...fadeUp(0)} className="mb-6">
          <span className="inline-flex items-center gap-2 bg-mist text-slate rounded-pill px-4 py-1.5 text-[13px]">
            <span className="text-accent">✦</span>
            Beautiful invitations, built in minutes
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(80)}
          className="font-serif text-[clamp(40px,6vw,72px)] font-normal leading-[1.15] mb-6"
        >
          Create Invitations
          <br />
          People Actually{" "}
          <span className="relative inline-block">
            Open
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 120 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C20 2 40 10 60 6C80 2 100 10 118 4"
                stroke="#534AB7"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(160)}
          className="text-[17px] text-slate leading-[1.7] max-w-xl mx-auto mb-8"
        >
          Design stunning digital invitations for birthdays, weddings, and
          anniversaries. Pick a template, personalize it, share a link — done.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(240)}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <Button variant="primary" className="!px-8 !py-3.5 text-[16px]">
            Start Designing Free
          </Button>
          <Button variant="ghost">See Examples →</Button>
        </motion.div>

        {/* Social proof */}
        <motion.p {...fadeUp(320)} className="text-[13px] text-stone mb-16">
          <span className="text-warning">★★★★★</span>
          {"  "}Loved by 12,000+ couples, parents & planners
        </motion.p>
      </div>

      {/* Hero invite card */}
      <motion.div {...fadeUp(400)}>
        <InviteCard />
      </motion.div>
    </section>
  );
}
