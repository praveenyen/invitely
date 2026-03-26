"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { InvitationData } from "@/types/invitation";
import { LeafDivider } from "./decorations/FloralDivider";

function LocationQR({ venue }: { venue: string }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

  return (
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="rounded-2xl bg-white/80 border border-[#B8932A]/20 p-4 flex flex-col items-center gap-2 shadow-[0_2px_16px_-4px_hsl(38_65%_50%/0.15)] hover:shadow-[0_4px_24px_-4px_hsl(38_65%_50%/0.25)] transition-shadow">
        <QRCodeSVG
          value={mapsUrl}
          size={96}
          fgColor="#7A5018"
          bgColor="transparent"
          level="M"
        />
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#7A5C3A", fontSize: "0.8rem" }}>
          Scan for maps
        </p>
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
