"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { InvitationData } from "@/types/invitation";
import type { Theme } from "@/lib/themes";
import ClassicHeader from "./ClassicHeader";
import ClassicHero from "./ClassicHero";
import ClassicEvent from "./ClassicEvent";
import ClassicVenue from "./ClassicVenue";
import ClassicContacts from "./ClassicContacts";
import ClassicFooter from "./ClassicFooter";

export interface TemplateProps {
  data: InvitationData;
  theme: Theme;
  slug?: string;
}

export default function ClassicTemplate({ data, slug }: TemplateProps) {
  return (
    <main className="min-h-screen" style={{ background: "var(--inv-bg-page)" }}>
      <ClassicHeader data={data} />
      <ClassicHero data={data} />

      {/* Custom card image */}
      {data.cardImageUrl && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center px-5 py-10 gap-4"
          style={{ background: "var(--inv-bg-page)" }}
        >
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--inv-text-muted)" }}>
            Invitation Card
          </p>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 20%, transparent)" }}>
            <Image src={data.cardImageUrl} alt="Custom invitation card" width={600} height={800} className="w-full h-auto object-cover" />
          </div>
        </motion.section>
      )}

      <ClassicEvent data={data} />
      <ClassicVenue data={data} />
      <ClassicContacts contacts={data.contacts} />
      <ClassicFooter data={data} />

      {slug && (
        <div className="flex justify-center py-6" style={{ background: "var(--inv-bg-page)" }}>
          <Link href={`/i/${slug}/stats`} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-colors hover:opacity-70"
            style={{ border: "1px solid color-mix(in srgb, var(--inv-accent-primary) 30%, transparent)", color: "var(--inv-text-muted)" }}>
            <BarChart2 className="h-3.5 w-3.5" />
            Stats & Edit
          </Link>
        </div>
      )}
    </main>
  );
}
