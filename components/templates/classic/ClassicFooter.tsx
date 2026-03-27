"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { InvitationData } from "@/types/invitation";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function ClassicFooter({ data }: { data: InvitationData }) {
  return (
    <footer className="py-12 px-5 flex flex-col items-center gap-3" style={{ background: "var(--inv-bg-page)" }}>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="w-32 h-px mb-2" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 50%, transparent), transparent)` }} />

      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xs italic tracking-wide" style={{ color: "var(--inv-text-muted)" }}>
        With love & blessings
      </motion.p>

      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "1.6rem", background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {[data.brideName, data.groomName].filter(Boolean).join(" & ") || data.title}
      </motion.p>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xs tracking-wide text-center" style={{ color: "var(--inv-text-muted)" }}>
        {formatDate(data.date)} • {data.venue}
      </motion.p>

      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
        className="w-32 h-px mt-2" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 50%, transparent), transparent)` }} />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
        className="text-[10px] tracking-widest uppercase mt-2" style={{ color: "var(--inv-text-muted)", opacity: 0.6 }}>
        Made with <Link href="/">Invitely</Link> ✦
      </motion.p>
    </footer>
  );
}
