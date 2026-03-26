"use client";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { InvitationData } from "@/types/invitation";
import { LeafDivider } from "./decorations/FloralDivider";

// Simple QR-like decorative location card
function LocationQR({ venue }: { venue: string }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

  return (
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative rounded-2xl bg-white/80 border border-[#B8932A]/20 p-5 flex flex-col items-center gap-3 shadow-[0_2px_16px_-4px_hsl(38_65%_50%/0.15)] hover:shadow-[0_4px_24px_-4px_hsl(38_65%_50%/0.25)] transition-shadow">
        {/* QR grid visual */}
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 80 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Outer corners */}
            <rect x="2" y="2" width="22" height="22" rx="3" fill="none" stroke="#B8932A" strokeWidth="2.5" />
            <rect x="6" y="6" width="14" height="14" rx="1.5" fill="#B8932A" opacity="0.7" />
            <rect x="56" y="2" width="22" height="22" rx="3" fill="none" stroke="#B8932A" strokeWidth="2.5" />
            <rect x="60" y="6" width="14" height="14" rx="1.5" fill="#B8932A" opacity="0.7" />
            <rect x="2" y="56" width="22" height="22" rx="3" fill="none" stroke="#B8932A" strokeWidth="2.5" />
            <rect x="6" y="60" width="14" height="14" rx="1.5" fill="#B8932A" opacity="0.7" />
            {/* Data dots */}
            {[
              [32, 4], [38, 4], [44, 4],
              [32, 10], [44, 10],
              [32, 16], [38, 16], [44, 16],
              [4, 32], [10, 32], [16, 32], [22, 32], [28, 32],
              [4, 38], [16, 38], [28, 38], [34, 38], [46, 38], [52, 38], [58, 38], [64, 38], [70, 38], [76, 38],
              [4, 44], [10, 44], [22, 44], [34, 44], [46, 44],
              [32, 56], [38, 56], [50, 56], [62, 56], [68, 56],
              [44, 62], [56, 62], [74, 62],
              [32, 68], [50, 68], [62, 68],
              [38, 74], [44, 74], [56, 74], [68, 74],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#B8932A" opacity={0.4 + (i % 3) * 0.2} />
            ))}
            {/* Center pin icon */}
            <circle cx="40" cy="36" r="8" fill="#B8932A" opacity="0.15" />
            <circle cx="40" cy="36" r="5" fill="#B8932A" opacity="0.5" />
            <circle cx="40" cy="36" r="2.5" fill="white" />
          </svg>
        </div>
        <p
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#7A5C3A", fontSize: "0.9rem" }}
        >
          Location
        </p>
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="h-4 w-4 text-[#B8932A]" />
        </div>
      </div>
    </a>
  );
}

export default function VenueSection({ data }: { data: InvitationData }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`;

  return (
    <section className="bg-[hsl(36_30%_95%)] py-10 px-5 flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm"
      >
        <LeafDivider className="w-full" />
      </motion.div>

      {/* Section title */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "1.5rem",
          background: "linear-gradient(135deg, #7A5018 0%, #B8932A 50%, #7A5018 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Venue of the Event
      </motion.p>

      <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#B8932A]/50 to-transparent" />

      {/* QR + Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-sm flex gap-4 items-start"
      >
        <div className="flex-shrink-0 w-36">
          <LocationQR venue={data.venue} />
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#2C1810",
            }}
          >
            {data.venue}
          </p>
          <div className="h-px bg-gradient-to-r from-[#B8932A]/30 to-transparent w-24" />
          <p className="text-xs text-[#7A5C3A] leading-relaxed">{data.venue}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#B8932A] underline underline-offset-2 hover:text-[#8B6914] transition-colors"
          >
            <MapPin className="h-3 w-3" />
            View on Google Maps
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-sm"
      >
        <LeafDivider className="w-full" />
      </motion.div>
    </section>
  );
}
