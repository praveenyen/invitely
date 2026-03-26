"use client";
import { motion } from "framer-motion";
import { InvitationData } from "@/types/invitation";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function CardFooter({ data }: { data: InvitationData }) {
  return (
    <footer className="bg-[hsl(36_30%_95%)] py-12 px-5 flex flex-col items-center gap-3">
      {/* Top thin divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-[#B8932A]/50 to-transparent mb-2"
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xs text-[#7A5C3A] italic tracking-wide"
      >
        With love & blessings
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "1.6rem",
          background: "linear-gradient(135deg, #7A5018 0%, #C8A030 50%, #7A5018 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {data.hostNames || data.title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xs text-[#7A5C3A] tracking-wide"
      >
        {formatDate(data.date)} • {data.venue}
      </motion.p>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-[#B8932A]/50 to-transparent mt-2"
      />

      {/* Invitely watermark */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-[10px] text-[#B8A090] tracking-widest uppercase mt-2"
      >
        Made with Invitely ✦
      </motion.p>
    </footer>
  );
}
