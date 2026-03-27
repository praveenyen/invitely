"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, MapPin, Calendar, Clock } from "lucide-react";
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
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

const occasionLabel: Record<string, string> = {
  wedding: "Wedding", engagement: "Engagement",
  anniversary: "Anniversary", birthday: "Birthday",
};

// Sticky header
function ModernHeader({ data }: { data: InvitationData }) {
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
          <p className="text-sm font-semibold tracking-tight" style={{ fontFamily: "var(--inv-font-display)", color: "var(--inv-text-heading)" }}>
            {[data.brideName, data.groomName].filter(Boolean).join(" & ") || data.title}
          </p>
          <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--inv-text-muted)" }}>
            {data.date ? new Date(data.date + "T00:00:00").getFullYear() : ""}
          </p>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

// Section separator — thin rule with optional label
function Rule({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 w-full max-w-sm mx-auto">
      <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
      {label && <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--inv-text-muted)" }}>{label}</span>}
      <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 25%, transparent)" }} />
    </div>
  );
}

// Contact pill
function ModernContact({ contact, index }: { contact: Contact; index: number }) {
  return (
    <motion.a href={`tel:${contact.phone}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-opacity hover:opacity-70"
      style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 15%, transparent)" }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
        style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 12%, transparent)", color: "var(--inv-accent-primary)" }}>
        {contact.name[0]}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "var(--inv-text-heading)" }}>{contact.name}</p>
        {contact.role && <p className="text-xs truncate" style={{ color: "var(--inv-text-muted)" }}>{contact.role}</p>}
      </div>
      <p className="text-xs ml-auto shrink-0" style={{ color: "var(--inv-accent-primary)" }}>{contact.phone}</p>
    </motion.a>
  );
}

export default function ModernTemplate({ data, slug }: TemplateProps) {
  const theme = useTheme();
  const blessing = blessingByReligion[data.religion] ?? "";
  const names = [data.brideName, data.groomName].filter(Boolean).join(" & ") || data.title;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`;

  return (
    <main className="min-h-screen" style={{ background: "var(--inv-bg-page)" }}>
      <ModernHeader data={data} />

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6 relative overflow-hidden">
        {/* Subtle radial gradient */}
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--inv-accent-primary) 20%, transparent), transparent)` }} />

        {blessing && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-xs tracking-[0.35em] uppercase z-10" style={{ color: "var(--inv-text-muted)" }}>
            {blessing}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }} className="z-10 flex flex-col items-center gap-2">
          <p className="text-[11px] tracking-[0.4em] uppercase" style={{ color: "var(--inv-text-muted)" }}>
            {occasionLabel[data.occasion] ?? "Invitation"}
          </p>
          <h1 style={{ fontFamily: "var(--inv-font-display)", fontSize: "clamp(2.8rem, 12vw, 5rem)", lineHeight: 1.05, color: "var(--inv-text-heading)" }}>
            {data.brideName || data.title}
          </h1>
          {data.groomName && (
            <>
              <div className="w-12 h-px my-1" style={{ background: "var(--inv-accent-primary)" }} />
              <h1 style={{ fontFamily: "var(--inv-font-display)", fontSize: "clamp(2.8rem, 12vw, 5rem)", lineHeight: 1.05, color: "var(--inv-text-heading)" }}>
                {data.groomName}
              </h1>
            </>
          )}
        </motion.div>

        {data.title && data.brideName && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm tracking-wide z-10" style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", color: "var(--inv-text-muted)" }}>
            {data.title}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-4 z-10 text-sm" style={{ color: "var(--inv-text-muted)" }}>
          <span style={{ color: "var(--inv-accent-primary)" }}>◆</span>
          <span>{data.date ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</span>
          <span style={{ color: "var(--inv-accent-primary)" }}>◆</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
            className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
            style={{ borderColor: "color-mix(in srgb, var(--inv-accent-primary) 40%, transparent)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--inv-accent-primary)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Custom card image ── */}
      {data.cardImageUrl && (
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="px-6 py-12 flex flex-col items-center gap-4">
          <Rule label="Invitation Card" />
          <div className="w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl">
            <Image src={data.cardImageUrl} alt="Custom invitation card" width={600} height={800} className="w-full h-auto object-cover" />
          </div>
        </motion.section>
      )}

      {/* ── Event details ── */}
      <section className="px-6 py-12 flex flex-col items-center gap-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full max-w-sm">
          <Rule label="Event Details" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-sm rounded-3xl p-6 flex flex-col gap-4"
          style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 15%, transparent)" }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 12%, transparent)" }}>
              <Calendar className="h-4 w-4" style={{ color: "var(--inv-accent-primary)" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--inv-text-muted)" }}>Date</p>
              <p className="font-semibold" style={{ color: "var(--inv-text-heading)" }}>{formatDate(data.date)}</p>
            </div>
          </div>

          {data.time && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 12%, transparent)" }}>
                <Clock className="h-4 w-4" style={{ color: "var(--inv-accent-primary)" }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--inv-text-muted)" }}>Time</p>
                <p className="font-semibold" style={{ color: "var(--inv-text-heading)" }}>{formatTime(data.time)}</p>
              </div>
            </div>
          )}

          <div className="h-px" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 15%, transparent)" }} />

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "color-mix(in srgb, var(--inv-accent-primary) 12%, transparent)" }}>
              <MapPin className="h-4 w-4" style={{ color: "var(--inv-accent-primary)" }} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--inv-text-muted)" }}>Venue</p>
              <p className="font-semibold" style={{ color: "var(--inv-text-heading)" }}>{data.venue}</p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs mt-1 inline-flex items-center gap-1 underline underline-offset-2 transition-opacity hover:opacity-70" style={{ color: "var(--inv-accent-primary)" }}>
                Open in Maps
              </a>
            </div>
          </div>
        </motion.div>

        {data.message && (
          <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="w-full max-w-sm text-center text-sm leading-relaxed italic border-l-2 pl-4"
            style={{ color: "var(--inv-text-muted)", borderColor: "color-mix(in srgb, var(--inv-accent-primary) 40%, transparent)" }}>
            "{data.message}"
          </motion.blockquote>
        )}
      </section>

      {/* ── Venue QR ── */}
      <section className="px-6 py-10 flex flex-col items-center gap-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full max-w-sm">
          <Rule label="Find Us" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 p-6 rounded-3xl"
          style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 15%, transparent)" }}>
          <QRCodeSVG value={mapsUrl} size={110} fgColor={theme.tokens.qrFgColor} bgColor="transparent" level="M" />
          <p className="text-xs text-center" style={{ color: "var(--inv-text-muted)" }}>Scan to open in Google Maps</p>
          <p className="text-sm font-medium text-center" style={{ color: "var(--inv-text-heading)" }}>{data.venue}</p>
        </motion.div>
      </section>

      {/* ── Contacts ── */}
      {data.contacts?.length > 0 && (
        <section className="px-6 py-10 flex flex-col items-center gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full max-w-sm">
            <Rule label="Assistance" />
          </motion.div>
          <div className="w-full max-w-sm flex flex-col gap-2">
            {data.contacts.map((c, i) => <ModernContact key={c.id} contact={c} index={i} />)}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="px-6 py-14 flex flex-col items-center gap-4 text-center">
        <div className="h-px w-16" style={{ background: "var(--inv-accent-primary)" }} />
        <p style={{ fontFamily: "var(--inv-font-display)", fontSize: "clamp(1.6rem, 7vw, 2.4rem)", color: "var(--inv-text-heading)" }}>
          {names}
        </p>
        <p className="text-xs tracking-widest uppercase" style={{ color: "var(--inv-text-muted)" }}>
          {data.date ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""} — {data.venue}
        </p>
        <div className="h-px w-16" style={{ background: "var(--inv-accent-primary)" }} />
        <p className="text-[10px] tracking-widest uppercase mt-2" style={{ color: "var(--inv-text-muted)", opacity: 0.5 }}>
          Made with <Link href="/">Invitely</Link> ✦
        </p>
      </footer>

      {slug && (
        <div className="flex justify-center pb-8" style={{ background: "var(--inv-bg-page)" }}>
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
