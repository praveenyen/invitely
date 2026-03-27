"use client";
import { motion } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { HeartVineDivider } from "@/components/card/decorations/FloralDivider";

function formatDateShort(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  const suffix = ["th", "st", "nd", "rd"][day % 100 > 10 && day % 100 < 14 ? 0 : ([0, 1, 2, 3][day % 10] ?? 0)];
  return `${d.toLocaleDateString("en-US", { month: "long" })} ${day}${suffix}`;
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

const occasionLabel: Record<string, string> = {
  wedding: "Wedding Ceremony", engagement: "Engagement Ceremony",
  anniversary: "Anniversary Celebration", birthday: "Birthday Celebration",
};
const occasionEmoji: Record<string, string> = {
  wedding: "💒", engagement: "💍", anniversary: "🥂", birthday: "🎂",
};

export default function ClassicEvent({ data }: { data: InvitationData }) {
  return (
    <section className="py-10 px-5 flex flex-col items-center gap-6" style={{ background: "var(--inv-bg-page)" }}>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }} className="w-full max-w-sm">
        <HeartVineDivider className="w-full" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="w-full max-w-sm">
        <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px -4px color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)" }}>
          {/* Card bg */}
          <div className="absolute inset-0" style={{ background: "var(--inv-bg-card)" }} />

          {/* Corner mandala */}
          <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx="50" cy="20" rx="5" ry="30" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" transform={`rotate(${i * 45} 50 50)`} />
              ))}
              <circle cx="50" cy="50" r="48" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative z-10 p-5 flex flex-col gap-3">
            <p style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "1.4rem", background: "var(--inv-accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {occasionLabel[data.occasion] ?? data.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{occasionEmoji[data.occasion] ?? "✨"}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--inv-text-heading)" }}>
                  {formatDateShort(data.date)}
                  {data.time && <span className="font-normal" style={{ color: "var(--inv-text-body)" }}> • {formatTime(data.time)}</span>}
                </p>
              </div>
            </div>
            <div className="h-px" style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--inv-accent-primary) 30%, transparent), transparent)` }} />
            <p className="text-sm" style={{ color: "var(--inv-text-body)" }}>{data.venue}</p>
            {([data.brideName, data.groomName].filter(Boolean).join(" & ")) && (
              <p style={{ fontFamily: "var(--inv-font-display)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--inv-text-muted)" }}>
                Hosted by {[data.brideName, data.groomName].filter(Boolean).join(" & ")}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
