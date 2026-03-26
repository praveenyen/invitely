import SectionLabel from "@/components/ui/SectionLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

const freeFeatures = [
  "Unlimited invites",
  "Subdomain link (you.invitely.app)",
  "Upload your own image",
  "AI image generation (3/month)",
  "RSVP tracking",
];

const premiumFeatures = [
  "Everything in Free",
  "Custom domain (yourname.com)",
  "Unlimited AI generation",
  "Remove Invitely branding",
  "Priority support",
  "Guest analytics",
];

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1D9E75"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 mt-0.5"
    >
      <path d="M20 6L9 17L4 12" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section className="bg-white py-20 px-6 md:px-16" id="pricing">
      <div className="text-center mb-12">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.2]">
          Simple, transparent pricing
        </h2>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free */}
        <RevealOnScroll>
          <div className="bg-white border-[0.5px] border-subtle rounded-[16px] p-8 h-full flex flex-col">
            <h3 className="font-sans text-[16px] font-medium text-slate mb-4">
              Free
            </h3>
            <div className="mb-6">
              <span className="font-serif text-[40px] text-ink">₹0</span>
              <span className="text-[14px] text-stone ml-1">/ forever</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-[14px] text-slate">{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full">
              Get Started Free
            </Button>
          </div>
        </RevealOnScroll>

        {/* Premium */}
        <RevealOnScroll delay={100}>
          <div className="bg-white border-2 border-info rounded-[16px] p-8 relative h-full flex flex-col">
            <span className="absolute top-4 right-4 bg-[#E6F1FB] text-info text-[11px] font-medium px-3 py-1 rounded-pill">
              Most popular
            </span>
            <h3 className="font-sans text-[16px] font-medium text-slate mb-4">
              Premium
            </h3>
            <div className="mb-6">
              <span className="font-serif text-[40px] text-ink">₹499</span>
              <span className="text-[14px] text-stone ml-1">/ event</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-[14px] text-slate">{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full">
              Go Premium
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
