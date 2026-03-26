"use client";
import { motion } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import { DiamondDivider, HeartVineDivider } from "./decorations/FloralDivider";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateShort(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 100 > 10 && day % 100 < 14 ? 0 : ([0, 1, 2, 3][day % 10] ?? 0)
  ];
  return `${d.toLocaleDateString("en-US", { month: "long" })} ${day}${suffix}`;
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

const occasionLabel: Record<string, string> = {
  wedding: "Wedding Ceremony",
  engagement: "Engagement Ceremony",
  anniversary: "Anniversary Celebration",
  birthday: "Birthday Celebration",
};

const occasionEmoji: Record<string, string> = {
  wedding: "💒",
  engagement: "💍",
  anniversary: "🥂",
  birthday: "🎂",
};

export default function EventSection({ data }: { data: InvitationData }) {
  return (
    <section className="bg-[hsl(36_30%_95%)] py-10 px-5 flex flex-col items-center gap-6">
      {/* Heart vine divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <HeartVineDivider className="w-full" />
      </motion.div>

      {/* Ceremony card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full max-w-sm"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_hsl(38_65%_50%/0.18)]">
          {/* Card background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(42_60%_96%)] via-[hsl(36_40%_94%)] to-[hsl(350_40%_94%)]" />

          {/* Decorative corner mandala */}
          <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="20"
                  rx="5"
                  ry="30"
                  fill="none"
                  stroke="#B8932A"
                  strokeWidth="0.8"
                  transform={`rotate(${i * 45} 50 50)`}
                />
              ))}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="#B8932A"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div className="relative z-10 p-5 flex flex-col gap-3">
            {/* Title in script */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.4rem",
                background:
                  "linear-gradient(135deg, #7A5018 0%, #B8932A 50%, #7A5018 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {occasionLabel[data.occasion] ?? data.title}
            </p>

            {/* Date + Time row */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {occasionEmoji[data.occasion] ?? "✨"}
              </span>
              <div>
                <p className="font-semibold text-sm text-[#2C1810]">
                  {formatDateShort(data.date)}
                  {data.time && (
                    <span className="font-normal text-[#5C4030]">
                      {" "}
                      • {formatTime(data.time)}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#B8932A]/30 to-transparent" />

            {/* Venue */}
            <p className="text-sm text-[#5C4030]">{data.venue}</p>

            {/* Host */}
            {([data.brideName, data.groomName].filter(Boolean).join(" & ")) && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "#7A5C3A",
                }}
              >
                Hosted by {[data.brideName, data.groomName].filter(Boolean).join(" & ")}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
