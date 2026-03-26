"use client";

import { InvitationData } from "@/types/invitation";
import HeroSection from "./HeroSection";
import StickyHeader from "./StickyHeader";
import EventSection from "./EventSection";
import VenueSection from "./VenueSection";
import ContactsSection from "./ContactsSection";
import CardFooter from "./CardFooter";

export default function CardView({ data }: { data: InvitationData }) {
  return (
    <main className="min-h-screen" style={{ background: "hsl(36 30% 95%)" }}>
      <StickyHeader data={data} />
      <HeroSection data={data} />
      <EventSection data={data} />
      <VenueSection data={data} />
      <ContactsSection contacts={data.contacts} />
      <CardFooter data={data} />
    </main>
  );
}
