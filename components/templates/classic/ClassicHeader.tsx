"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
}

export default function ClassicHeader({ data }: { data: InvitationData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 backdrop-blur-sm"
          style={{
            background: "var(--inv-bg-header)",
            borderBottom: "1px solid var(--inv-header-border)",
          }}
        >
          <p
            className="font-semibold text-sm leading-tight"
            style={{
              fontFamily: "var(--inv-font-display)",
              fontStyle: "italic",
              color: "var(--inv-text-heading)",
            }}
          >
            {[data.brideName, data.groomName].filter(Boolean).join(" & ") || data.title}
          </p>
          <p className="text-[10px] tracking-[0.15em] font-medium" style={{ color: "var(--inv-text-muted)" }}>
            {formatDate(data.date)}
          </p>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
