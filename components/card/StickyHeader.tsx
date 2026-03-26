"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
}

export default function StickyHeader({ data }: { data: InvitationData }) {
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
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-[hsl(36_30%_95%)/95] backdrop-blur-sm border-b border-[#B8932A]/15"
        >
          <div>
            <p className="font-semibold text-sm text-[#2C1810] leading-tight" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
              {data.hostNames || data.title}
            </p>
          </div>
          <p className="text-[10px] tracking-[0.15em] text-[#7A5C3A] font-medium">
            {formatDate(data.date)}
          </p>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
