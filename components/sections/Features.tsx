import SectionLabel from "@/components/ui/SectionLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Badge from "@/components/ui/Badge";

const features = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10H21" />
        <path d="M9 4V10" />
        <path d="M15 4V10" />
        <path d="M7 14H8" />
        <path d="M11 14H12" />
        <path d="M15 14H16" />
        <path d="M7 18H8" />
        <path d="M11 18H12" />
      </svg>
    ),
    title: "Templates for every occasion",
    description:
      "Choose from dozens of hand-crafted templates for birthdays, weddings, and anniversaries. Every design is fully customizable.",
    badge: null,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 21V14" />
        <path d="M4 10V3" />
        <path d="M12 21V12" />
        <path d="M12 8V3" />
        <path d="M20 21V16" />
        <path d="M20 12V3" />
        <path d="M2 14H6" />
        <path d="M10 8H14" />
        <path d="M18 16H22" />
      </svg>
    ),
    title: "Make it unmistakably yours",
    description:
      "Change fonts, colors, layout, and wording. What you see is what your guests get — live preview as you edit.",
    badge: null,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15L16 10L5 21" />
      </svg>
    ),
    title: "Your photo or AI-generated art",
    description:
      "Upload a personal photo or let our AI generate a beautiful backdrop from a simple text prompt. No design skills needed.",
    badge: <Badge label="✦ AI-powered" color="amber" />,
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "One link. Share anywhere.",
    description:
      "Every invite gets a beautiful public page at your own subdomain. Share via WhatsApp, email, or copy the link. RSVP tracking included.",
    badge: null,
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 md:px-16" id="features">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Features</SectionLabel>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.2]">
            Everything you need to create
            <br className="hidden sm:block" /> the perfect invite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 100}>
              <div className="bg-offwhite border-[0.5px] border-subtle rounded-[16px] p-7 h-full hover:border-default transition-colors duration-200">
                <div className="w-9 h-9 bg-ink rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-sans text-[18px] font-medium">
                    {feature.title}
                  </h3>
                  {feature.badge}
                </div>
                <p className="text-[15px] text-slate leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
