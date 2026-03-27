"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { InvitationData, blessingByReligion, Contact } from "@/types/invitation";
import type { Theme } from "@/lib/themes";
import { useTheme } from "@/components/templates/shared/ThemeContext";

export interface TemplateProps {
  data: InvitationData;
  theme: Theme;
  slug?: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

// Corner filigree SVG
function Filigree({ flip = false, rotate = 0 }: { flip?: boolean; rotate?: number }) {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})` }}>
      <path d="M4 4 Q40 4 76 40" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.5" />
      <path d="M4 4 Q4 40 40 76" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.5" />
      <path d="M4 4 Q20 4 36 16 Q50 28 40 44" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" opacity="0.35" />
      <path d="M4 4 Q4 20 16 36 Q28 50 44 40" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" opacity="0.35" />
      <ellipse cx="16" cy="12" rx="4" ry="8" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.15" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" transform="rotate(-30 16 12)" />
      <ellipse cx="12" cy="16" rx="4" ry="8" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.15" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" transform="rotate(-60 12 16)" />
      <ellipse cx="36" cy="18" rx="3" ry="6" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.1" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" transform="rotate(-15 36 18)" />
      <circle cx="6" cy="6" r="3" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.6" />
      <circle cx="6" cy="6" r="5" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// Sticky header
function RoyalHeader({ data }: { data: InvitationData }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.header initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md"
          style={{ background: "var(--inv-bg-header)", borderBottom: "1px solid var(--inv-header-border)" }}>
          <p className="text-sm tracking-widest uppercase" style={{ fontFamily: "var(--inv-font-display)", color: "var(--inv-accent-primary)", letterSpacing: "0.15em" }}>
            {[data.brideName, data.groomName].filter(Boolean).join(" · ") || data.title}
          </p>
          <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--inv-text-muted)" }}>
            {data.date ? new Date(data.date + "T00:00:00").getFullYear() : ""}
          </p>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

// Contact card
function RoyalContact({ contact, index }: { contact: Contact; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl p-4 flex flex-col items-center gap-2 text-center overflow-hidden"
      style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }}>
      <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none opacity-60"><Filigree /></div>
      <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none opacity-60"><Filigree flip /></div>
      <p className="font-semibold text-sm mt-2" style={{ color: "var(--inv-text-heading)" }}>{contact.name}</p>
      {contact.role && <p className="text-xs italic" style={{ color: "var(--inv-text-muted)" }}>{contact.role}</p>}
      <a href={`tel:${contact.phone}`} className="text-xs font-medium transition-opacity hover:opacity-70" style={{ color: "var(--inv-accent-primary)" }}>{contact.phone}</a>
    </motion.div>
  );
}

export default function RoyalTemplate({ data, slug }: TemplateProps) {
  const theme = useTheme();
  const blessing = blessingByReligion[data.religion] ?? "";
  const names = [data.brideName, data.groomName].filter(Boolean).join(" & ") || data.title;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`;

  return (
    <main className="min-h-screen" style={{ background: "var(--inv-bg-page)" }}>
      <RoyalHeader data={data} />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-16 text-center gap-8">
        {/* Radial accent glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--inv-accent-primary) 12%, transparent), transparent)` }} />

        {/* Corner filigrees */}
        {[
          { top: 0, left: 0, r: 0, f: false },
          { top: 0, right: 0, r: 0, f: true },
          { bottom: 0, left: 0, r: 180, f: true },
          { bottom: 0, right: 0, r: 180, f: false },
        ].map((pos, i) => (
          <div key={i} className="absolute w-20 h-20 pointer-events-none"
            style={{ top: pos.top, left: pos.left, right: (pos as {right?: number}).right, bottom: (pos as {bottom?: number}).bottom }}>
            <Filigree flip={pos.f} rotate={pos.r} />
          </div>
        ))}

        {/* Outer border frame */}
        <div className="absolute inset-4 rounded-none pointer-events-none"
          style={{ border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)" }} />
        <div className="absolute inset-6 rounded-none pointer-events-none"
          style={{ border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 10%, transparent)" }} />

        {blessing && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="text-[11px] tracking-[0.4em] uppercase z-10" style={{ color: "var(--inv-text-muted)" }}>
            {blessing}
          </motion.p>
        )}

        {/* Circular emblem */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
          className="z-10 relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="96" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.5" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.4" opacity="0.3" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="100" y1="10" x2="100" y2="22" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4"
                transform={`rotate(${i * 30} 100 100)`} />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse key={i} cx="100" cy="30" rx="6" ry="14" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.6" opacity="0.25"
                transform={`rotate(${i * 60} 100 100)`} />
            ))}
          </svg>
          <div className="z-10 flex flex-col items-center">
            <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--inv-text-muted)" }}>✦</p>
            <p style={{ fontFamily: "var(--inv-font-display)", fontSize: "0.75rem", color: "var(--inv-accent-primary)", letterSpacing: "0.15em" }}>
              {data.occasion?.toUpperCase()}
            </p>
          </div>
        </motion.div>

        {/* Names */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }}
          className="z-10 flex flex-col items-center gap-2">
          <p style={{ fontFamily: "var(--inv-font-display)", fontSize: "clamp(2.2rem, 10vw, 3.5rem)", lineHeight: 1.1, background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {data.brideName || data.title}
          </p>
          {data.groomName && (
            <>
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 30%, transparent)" }} />
                <span className="text-base" style={{ color: "var(--inv-accent-primary)" }}>✦</span>
                <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 30%, transparent)" }} />
              </div>
              <p style={{ fontFamily: "var(--inv-font-display)", fontSize: "clamp(2.2rem, 10vw, 3.5rem)", lineHeight: 1.1, background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {data.groomName}
              </p>
            </>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="z-10 flex flex-col items-center gap-2">
          {data.title && data.brideName && (
            <p className="text-xs tracking-widest uppercase" style={{ color: "var(--inv-text-muted)" }}>{data.title}</p>
          )}
          <p className="text-sm font-medium" style={{ color: "var(--inv-text-muted)" }}>
            {formatDate(data.date)}{data.time ? ` at ${formatTime(data.time)}` : ""}
          </p>
        </motion.div>
      </section>

      {/* ── Custom card ── */}
      {data.cardImageUrl && (
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative px-8 py-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 w-full max-w-sm">
            <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--inv-text-muted)" }}>Invitation Card</span>
            <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
          </div>
          <div className="w-full max-w-xs rounded-2xl overflow-hidden"
            style={{ border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)", boxShadow: "0 20px 60px -12px color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)" }}>
            <Image src={data.cardImageUrl} alt="Custom invitation card" width={600} height={800} className="w-full h-auto object-cover" />
          </div>
        </motion.section>
      )}

      {/* ── Event details ── */}
      <section className="relative px-8 py-12 flex flex-col items-center gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
          style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }}>
          {/* Corner filigrees on card */}
          <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none opacity-50"><Filigree /></div>
          <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-50"><Filigree flip /></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none opacity-50"><Filigree rotate={180} flip /></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none opacity-50"><Filigree rotate={180} /></div>

          <p className="text-center text-xs tracking-[0.35em] uppercase" style={{ color: "var(--inv-text-muted)" }}>The Celebration</p>
          <p className="text-center" style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "1.4rem", background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {formatDate(data.date)}
          </p>
          {data.time && <p className="text-center text-sm" style={{ color: "var(--inv-text-muted)" }}>{formatTime(data.time)}</p>}
          <div className="h-px mx-8" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
          <p className="text-center text-sm font-medium" style={{ color: "var(--inv-text-heading)" }}>{data.venue}</p>
          {data.message && (
            <p className="text-center text-xs leading-relaxed italic mt-2" style={{ color: "var(--inv-text-muted)" }}>"{data.message}"</p>
          )}
        </motion.div>

        {/* QR */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-3 p-5 rounded-2xl"
          style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)" }}>
          <QRCodeSVG value={mapsUrl} size={90} fgColor={theme.tokens.qrFgColor} bgColor="transparent" level="M" />
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70" style={{ color: "var(--inv-accent-primary)" }}>
            <MapPin className="h-3 w-3" /> View Venue
          </a>
        </motion.div>
      </section>

      {/* ── Contacts ── */}
      {data.contacts?.length > 0 && (
        <section className="px-8 py-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 w-full max-w-sm">
            <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--inv-text-muted)" }}>For Assistance</span>
            <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
          </div>
          <div className="w-full max-w-sm grid grid-cols-2 gap-3">
            {data.contacts.map((c, i) => <RoyalContact key={c.id} contact={c} index={i} />)}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="relative px-8 py-14 flex flex-col items-center gap-4 text-center">
        <div className="absolute top-0 left-0 w-16 h-16"><Filigree /></div>
        <div className="absolute top-0 right-0 w-16 h-16"><Filigree flip /></div>
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--inv-text-muted)" }}>With blessings</p>
        <p style={{ fontFamily: "var(--inv-font-display)", fontSize: "clamp(1.8rem, 8vw, 2.6rem)", background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {names}
        </p>
        <p className="text-xs tracking-widest uppercase" style={{ color: "var(--inv-text-muted)" }}>
          {formatDate(data.date)} — {data.venue}
        </p>
        <p className="text-[10px] tracking-widest uppercase mt-3" style={{ color: "var(--inv-text-muted)", opacity: 0.5 }}>
          Made with <Link href="/">Invitely</Link> ✦
        </p>
      </footer>

      {slug && (
        <div className="flex justify-center pb-8">
          <Link href={`/i/${slug}/stats`} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-opacity hover:opacity-70"
            style={{ border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 30%, transparent)", color: "var(--inv-text-muted)" }}>
            <BarChart2 className="h-3.5 w-3.5" />
            Stats & Edit
          </Link>
        </div>
      )}
    </main>
  );
}
