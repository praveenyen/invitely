"use client";
import { motion } from "framer-motion";
import { Contact } from "@/types/invitation";
import { FloralCorner } from "@/components/card/decorations/FloralDivider";

function ContactCard({ contact, index }: { contact: Contact; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-2xl p-5 flex flex-col items-center gap-2 overflow-hidden"
      style={{ background: "var(--inv-bg-card)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)", boxShadow: "0 2px 16px -4px color-mix(in srgb, var(--inv-accent-primary) 12%, transparent)" }}>
      <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none"><FloralCorner className="w-full h-full" /></div>
      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none"><FloralCorner className="w-full h-full" flip /></div>
      <p className="font-semibold text-base mt-2 text-center" style={{ color: "var(--inv-text-heading)" }}>{contact.name}</p>
      {contact.role && <p className="text-xs italic" style={{ color: "var(--inv-text-muted)" }}>— {contact.role} —</p>}
      <div className="h-px w-16 my-1" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 40%, transparent), transparent)` }} />
      <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "var(--inv-accent-primary)" }}>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        {contact.phone}
      </a>
    </motion.div>
  );
}

export default function ClassicContacts({ contacts }: { contacts: Contact[] }) {
  if (!contacts || contacts.length === 0) return null;

  const starPath = "M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z";

  return (
    <section className="py-10 px-5 flex flex-col items-center gap-6" style={{ background: "var(--inv-bg-page)" }}>
      {/* Top divider */}
      <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-sm flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 40%, transparent))` }} />
        <svg viewBox="0 0 20 20" className="w-4 h-4"><path d={starPath} fill="var(--inv-accent-primary)" opacity="0.5" /></svg>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, color-mix(in srgb, var(--inv-accent-primary) 40%, transparent))` }} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-1">
        <p style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "1.5rem", background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          For Any Assistance
        </p>
        <div className="h-px w-20 mt-1" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 50%, transparent), transparent)` }} />
      </motion.div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        {contacts.map((c, i) => <ContactCard key={c.id} contact={c} index={i} />)}
      </div>

      {/* Bottom divider */}
      <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full max-w-sm flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 40%, transparent))` }} />
        <svg viewBox="0 0 20 20" className="w-4 h-4"><path d={starPath} fill="var(--inv-accent-primary)" opacity="0.5" /></svg>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, color-mix(in srgb, var(--inv-accent-primary) 40%, transparent))` }} />
      </motion.div>
    </section>
  );
}
