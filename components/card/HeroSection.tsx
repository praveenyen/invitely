"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { InvitationData, blessingByReligion } from "@/types/invitation";
import MandalaSVG from "./decorations/MandalaSVG";
import { RoseDivider, DiamondDivider } from "./decorations/FloralDivider";

const goldText: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontStyle: "italic",
  background:
    "linear-gradient(135deg, #8B6914 0%, #C8A030 40%, #D4B050 60%, #8B6914 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HeroSection({ data }: { data: InvitationData }) {
  const blessing = blessingByReligion[data.religion] ?? "";
  const bride = data.brideName || data.title;
  const groom = data.groomName;

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[hsl(36_30%_95%)]">
      <style>{`
        @keyframes hero-mandala-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Corner decorations ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Gold glow blobs */}
        <div className="absolute top-0 left-0 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-[#f3d38a] blur-3xl opacity-40" />
        <div className="absolute top-0 right-0 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-[#f3d38a] blur-3xl opacity-40" />
        {/* Spinning mandala — top left */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[420px] md:h-[420px] opacity-[0.12]">
          <div
            className="w-full h-full"
            style={{ animation: "hero-mandala-spin 35s linear infinite" }}
          >
            <Image src="/mandala.webp" alt="" fill className="object-contain" />
          </div>
        </div>
        {/* Spinning mandala — top right */}
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[420px] md:h-[420px] opacity-[0.12]">
          <div
            className="w-full h-full"
            style={{ animation: "hero-mandala-spin 35s linear infinite" }}
          >
            <Image src="/mandala.webp" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* ── Blessing text ── */}
      {blessing && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-xs tracking-[0.25em] text-[#7A5C3A] font-medium z-10"
        >
          {blessing}
        </motion.p>
      )}

      {/* ── Rose divider ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-52 mt-3 z-10"
      >
        <RoseDivider className="w-full" />
      </motion.div>

      {/* ── Main center: Names+Hands with Bride & Groom flanking ── */}
      <div className="relative flex-1 flex items-center justify-center w-full z-10">
        {/* Center: mandala bg + stacked names + hands */}
        <div className="relative flex flex-col items-center justify-center min-h-[340px] md:min-h-[520px] w-full max-w-xs md:max-w-3xl px-[90px] sm:px-[110px] md:px-[220px]">
          {/* Bride figure — absolute left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[90px] h-[220px] sm:w-[110px] sm:h-[260px] md:w-[200px] md:h-[480px]"
          >
            <Image
              src="/bride.webp"
              alt="Bride"
              fill
              className="object-contain object-center drop-shadow-xl"
            />
          </motion.div>

          {/* Groom figure — absolute right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[90px] h-[220px] sm:w-[110px] sm:h-[260px] md:w-[200px] md:h-[480px]"
          >
            <Image
              src="/groom.webp"
              alt="Groom"
              fill
              className="object-contain object-center drop-shadow-xl"
            />
          </motion.div>
          {/* Mandala background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <MandalaSVG className="w-[560px] h-[560px] md:w-[700px] md:h-[700px] opacity-25" />
          </motion.div>

          {/* Bride name */}
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              ...goldText,
              fontSize: "clamp(2rem, 9vw, 2rem)",
              lineHeight: 1.1,
            }}
            className="relative z-20 text-center mb-10 md:mb-24"
          >
            {bride}
          </motion.p>

          {/* Couple hands image + mandala behind it */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="relative z-10 w-[160px] sm:w-[200px] md:w-[320px] my-1 flex items-center justify-center"
          >
            {/* Mandala behind hands */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[2]">
              <Image
                src="/mandala.webp"
                alt=""
                fill
                className="object-contain opacity-30"
              />
            </div>
            <Image
              src="/coupleHands.webp"
              alt="Couple Hands"
              width={200}
              height={130}
              className="relative z-10 w-full h-auto object-contain"
            />
          </motion.div>

          {/* Small heart */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.85, type: "spring" }}
            className="relative z-10 text-[#B8932A] text-xs mb-1"
          >
            ♡
          </motion.span>

          {/* Groom name */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{
              ...goldText,
              fontSize: "clamp(2rem, 9vw, 2rem)",
              lineHeight: 1.1,
            }}
            className="relative z-10 text-center mt-4"
          >
            {groom}
          </motion.p>
        </div>
      </div>

      {/* ── Date & Venue ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex flex-col items-center gap-1 z-10 pb-3"
      >
        <DiamondDivider className="w-40 mb-2" />
        <p className="font-semibold text-base text-[#2C1810] tracking-wide">
          {formatDate(data.date)}
        </p>
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#7A5C3A]">
          {data.venue}
        </p>
        <DiamondDivider className="w-40 mt-2" />
      </motion.div>

      {/* ── Personal message ── */}
      {data.message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-center text-sm text-[#5C4030] max-w-xs px-6 pb-4 z-10 leading-relaxed"
        >
          {data.message}
        </motion.p>
      )}

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="pb-8 z-10 flex flex-col items-center gap-2"
      >
        <motion.p
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#7A5C3A]"
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#B8932A] to-transparent"
        />
      </motion.div>
    </section>
  );
}
