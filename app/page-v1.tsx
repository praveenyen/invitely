import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import EventSelectorWithGallery from "@/components/sections/EventSelectorWithGallery";
import Features from "@/components/sections/Features";
import AICallout from "@/components/sections/AICallout";
import ShareableLink from "@/components/sections/ShareableLink";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EventSelectorWithGallery />
      <Features />
      <AICallout />
      <ShareableLink />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
