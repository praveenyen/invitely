"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { InvitationData } from "@/types/invitation";
import HeroSection from "./HeroSection";
import StickyHeader from "./StickyHeader";
import EventSection from "./EventSection";
import VenueSection from "./VenueSection";
import ContactsSection from "./ContactsSection";
import CardFooter from "./CardFooter";

export default function CardView({
  data,
  slug,
}: {
  data: InvitationData;
  slug?: string;
}) {
  return (
    <main className="min-h-screen" style={{ background: "hsl(36 30% 95%)" }}>
      <StickyHeader data={data} />
      <HeroSection data={data} />
      {data.cardImageUrl && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center px-5 py-10 gap-4"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#7A5C3A]">
            Invitation Card
          </p>
          <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-[#B8932A]/20">
            <Image
              src={data.cardImageUrl}
              alt="Custom invitation card"
              width={600}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.section>
      )}
      <EventSection data={data} />
      <VenueSection data={data} />
      <ContactsSection contacts={data.contacts} />
      <CardFooter data={data} />

      {/* Stats/edit link */}
      {slug && (
        <div className="flex justify-center py-6">
          <Link
            href={`/i/${slug}/stats`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B8932A]/30 text-[#7A5C3A] text-xs font-medium hover:bg-[#B8932A]/10 transition-colors"
          >
            <BarChart2 className="h-3.5 w-3.5" />
            Stats & Edit
          </Link>
        </div>
      )}
    </main>
  );
}
