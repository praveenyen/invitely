"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { InvitationData } from "@/types/invitation";
import { LeafDivider } from "@/components/card/decorations/FloralDivider";
import { useTheme } from "@/components/templates/shared/ThemeContext";

function LocationQR({ venue, qrColor }: { venue: string; qrColor: string }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
  return (
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-shadow"
        style={{ background: "color-mix(in srgb, var(--inv-bg-page) 60%, white)", border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)", boxShadow: "0 2px 16px -4px color-mix(in srgb, var(--inv-accent-primary) 15%, transparent)" }}>
        <QRCodeSVG value={mapsUrl} size={96} fgColor={qrColor} bgColor="transparent" level="M" />
        <p style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", color: "var(--inv-text-muted)", fontSize: "0.8rem" }}>
          Scan for maps
        </p>
      </div>
    </a>
  );
}

export default function ClassicVenue({ data }: { data: InvitationData }) {
  const theme = useTheme();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue)}`;

  return (
    <section className="py-10 px-5 flex flex-col items-center gap-6" style={{ background: "var(--inv-bg-page)" }}>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-sm">
        <LeafDivider className="w-full" />
      </motion.div>

      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "1.5rem", background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        Venue of the Event
      </motion.p>

      <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 50%, transparent), transparent)` }} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="w-full max-w-sm flex gap-4 items-start">
        <div className="flex-shrink-0 w-36">
          <LocationQR venue={data.venue} qrColor={theme.tokens.qrFgColor} />
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <p style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--inv-text-heading)" }}>
            {data.venue}
          </p>
          <div className="h-px w-24" style={{ background: `linear-gradient(to right, color-mix(in srgb, var(--inv-accent-primary) 30%, transparent), transparent)` }} />
          <p className="text-xs leading-relaxed" style={{ color: "var(--inv-text-muted)" }}>{data.venue}</p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
            style={{ color: "var(--inv-accent-primary)" }}>
            <MapPin className="h-3 w-3" />
            View on Google Maps
          </a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="w-full max-w-sm">
        <LeafDivider className="w-full" />
      </motion.div>
    </section>
  );
}
