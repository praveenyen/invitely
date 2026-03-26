"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

type EventType = "birthday" | "wedding" | "anniversary";

const eventTypes: { type: EventType; emoji: string; label: string }[] = [
  { type: "birthday", emoji: "🎂", label: "Birthday" },
  { type: "wedding", emoji: "💍", label: "Wedding" },
  { type: "anniversary", emoji: "🥂", label: "Anniversary" },
];

interface TemplateCard {
  type: EventType;
  name: string;
  bg: string;
  textColor: string;
  accentColor: string;
  content: React.ReactNode;
}

const templates: TemplateCard[] = [
  {
    type: "wedding",
    name: "Elegant Garden",
    bg: "bg-[#F5EDE8]",
    textColor: "text-ink",
    accentColor: "text-stone",
    content: (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="text-[9px] tracking-[0.2em] uppercase text-stone/70 mb-4">
          You are invited
        </p>
        <p className="font-serif text-[24px] text-ink leading-tight">Priya</p>
        <p className="text-stone text-[11px] italic my-1">&</p>
        <p className="font-serif text-[24px] text-ink leading-tight mb-4">
          Arjun
        </p>
        <div className="w-8 h-[0.5px] bg-stone/30 mb-4" />
        <p className="text-[10px] text-stone">December 14, 2026</p>
        <p className="text-[10px] text-stone">Udaipur</p>
      </div>
    ),
  },
  {
    type: "wedding",
    name: "Minimal Classic",
    bg: "bg-[#EAE4E0]",
    textColor: "text-ink",
    accentColor: "text-stone",
    content: (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="border-[0.5px] border-stone/30 rounded-lg p-8 w-full">
          <p className="text-[9px] tracking-[0.15em] uppercase text-stone mb-6">
            Wedding Invitation
          </p>
          <p className="font-serif text-[22px] text-ink leading-tight mb-1">
            Meera & Raj
          </p>
          <div className="w-6 h-[0.5px] bg-stone/40 mx-auto my-4" />
          <p className="text-[10px] text-stone">March 22, 2026</p>
          <p className="text-[10px] text-stone mt-1">Jaipur Palace Gardens</p>
        </div>
      </div>
    ),
  },
  {
    type: "birthday",
    name: "Confetti Burst",
    bg: "bg-[#FFFBEA]",
    textColor: "text-ink",
    accentColor: "text-warning",
    content: (
      <div className="relative flex flex-col items-center justify-center h-full px-6 text-center overflow-hidden">
        {/* Confetti dots */}
        <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-warning/40" />
        <div className="absolute top-10 right-8 w-1.5 h-1.5 rounded-full bg-accent/40" />
        <div className="absolute top-16 left-12 w-1 h-1 rounded-full bg-danger/30" />
        <div className="absolute bottom-12 right-10 w-2 h-2 rounded-full bg-success/30" />
        <div className="absolute bottom-20 left-8 w-1.5 h-1.5 rounded-full bg-info/30" />
        <div className="absolute top-24 right-16 w-1 h-1 rounded-full bg-warning/50" />

        <p className="text-[9px] tracking-[0.2em] uppercase text-warning mb-3">
          You&apos;re invited to
        </p>
        <p className="font-serif text-[32px] text-ink leading-tight mb-2">
          Aarav&apos;s
        </p>
        <p className="text-[40px] font-serif text-warning/30 leading-none mb-2">
          5th
        </p>
        <p className="text-[13px] font-medium text-ink tracking-wide uppercase mb-4">
          Birthday Party
        </p>
        <p className="text-[10px] text-stone">Oct 8 • 3:00 PM</p>
      </div>
    ),
  },
  {
    type: "birthday",
    name: "Bold Date",
    bg: "bg-[#FFF0F0]",
    textColor: "text-ink",
    accentColor: "text-danger",
    content: (
      <div className="relative flex flex-col items-center justify-center h-full px-6 text-center overflow-hidden">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-serif text-danger/8 leading-none select-none">
          30
        </p>
        <p className="text-[9px] tracking-[0.15em] uppercase text-stone mb-2 relative z-10">
          Celebrate with us
        </p>
        <p className="font-serif text-[22px] text-ink relative z-10 mb-1">
          Nisha&apos;s 30th
        </p>
        <div className="w-6 h-[0.5px] bg-stone/30 my-3 relative z-10" />
        <p className="text-[10px] text-stone relative z-10">
          June 15 • 7 PM
        </p>
        <p className="text-[10px] text-stone relative z-10">
          Skyline Lounge, Mumbai
        </p>
      </div>
    ),
  },
  {
    type: "anniversary",
    name: "Golden Night",
    bg: "bg-[#1a1a1a]",
    textColor: "text-[#D4AF6A]",
    accentColor: "text-[#D4AF6A]",
    content: (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#D4AF6A]/60 mb-4">
          Celebrating
        </p>
        <p className="font-serif text-[36px] text-[#D4AF6A] leading-tight mb-1">
          25
        </p>
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4AF6A]/60 mb-4">
          Years Together
        </p>
        <div className="w-8 h-[0.5px] bg-[#D4AF6A]/30 mb-4" />
        <p className="font-serif text-[18px] text-[#D4AF6A]/80 mb-1">
          Sunita & Vikram
        </p>
        <p className="text-[10px] text-[#D4AF6A]/40 mt-3">
          Jan 20 • The Gold Room
        </p>
      </div>
    ),
  },
  {
    type: "anniversary",
    name: "Deep Roses",
    bg: "bg-[#2a2020]",
    textColor: "text-[#E8C4C4]",
    accentColor: "text-[#E8C4C4]",
    content: (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#E8C4C4]/50 mb-4">
          Anniversary Celebration
        </p>
        <p className="font-serif text-[22px] text-[#E8C4C4] leading-tight mb-1">
          Anita & Deepak
        </p>
        <p className="text-[11px] text-[#E8C4C4]/40 italic mb-4">
          Ten beautiful years
        </p>
        <div className="w-8 h-[0.5px] bg-[#E8C4C4]/20 mb-4" />
        <p className="text-[10px] text-[#E8C4C4]/40">
          Feb 14 • Rose Garden Estate
        </p>
      </div>
    ),
  },
];

export default function EventSelectorWithGallery() {
  const [active, setActive] = useState<EventType>("wedding");

  return (
    <section className="py-16 px-6" id="templates">
      {/* Event selector strip */}
      <div className="flex items-center justify-center gap-3 mb-12">
        {eventTypes.map((event) => (
          <button
            key={event.type}
            onClick={() => setActive(event.type)}
            className={clsx(
              "px-5 py-2.5 rounded-pill text-[14px] font-medium transition-all duration-200 cursor-pointer border-[0.5px]",
              active === event.type
                ? "bg-ink text-white border-ink"
                : "bg-white text-slate border-subtle hover:border-default"
            )}
          >
            {event.emoji} {event.label}
          </button>
        ))}
      </div>

      {/* Section heading */}
      <div className="text-center mb-10">
        <SectionLabel>Templates</SectionLabel>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.2]">
          Start with a stunning template
        </h2>
      </div>

      {/* Template grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, i) => (
          <RevealOnScroll key={template.name} delay={i * 80}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "aspect-[3/4] rounded-xl border-[0.5px] overflow-hidden relative cursor-pointer transition-all duration-200",
                template.bg,
                active === template.type
                  ? "opacity-100 border-subtle hover:border-default"
                  : "opacity-35 scale-[0.98] border-subtle"
              )}
            >
              {/* Event badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-medium bg-white/80 text-slate backdrop-blur-sm">
                  {eventTypes.find((e) => e.type === template.type)?.emoji}{" "}
                  {template.type}
                </span>
              </div>

              {/* Card content */}
              {template.content}

              {/* Bottom name + hover button */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/10 to-transparent">
                <p className="text-[13px] font-medium text-ink/80">
                  {template.name}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 hover:bg-ink/5 transition-colors duration-200 flex items-end justify-center pb-14 opacity-0 hover:opacity-100">
                <span className="bg-white text-ink rounded-lg px-4 py-2 text-[12px] font-medium shadow-sm">
                  Use Template →
                </span>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
