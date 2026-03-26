import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

export default function AICallout() {
  return (
    <section className="bg-ink text-white py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left side */}
        <RevealOnScroll>
          <div>
            <span className="inline-flex items-center gap-1.5 border-[0.5px] border-white/30 text-white/70 rounded-pill px-3 py-1 text-[11px] tracking-[0.08em] uppercase mb-6">
              ✦ AI-Powered
            </span>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.2] text-white mb-6">
              Describe it.
              <br />
              We&apos;ll design it.
            </h2>
            <p className="text-white/60 text-[16px] leading-[1.7] mb-8 max-w-md">
              Type a simple prompt — &ldquo;romantic garden wedding with
              roses&rdquo; — and our AI generates a stunning backdrop image in
              seconds. No stock photos, no browsing. Just your imagination.
            </p>
            <Button variant="pill-outline">Try AI Generation →</Button>
          </div>
        </RevealOnScroll>

        {/* Right side — mock AI UI */}
        <RevealOnScroll delay={150}>
          <div className="bg-[#1a1a1a] rounded-[16px] p-6">
            {/* Prompt input */}
            <div className="border-[0.5px] border-white/10 rounded-lg px-4 py-3 flex items-center justify-between mb-5">
              <span className="text-white/30 text-[13px]">
                A dreamy sunset beach wedding with golden light...
              </span>
              <span className="bg-white text-ink rounded-md px-3 py-1 text-[11px] font-medium ml-3 shrink-0">
                Generate
              </span>
            </div>

            {/* Generated image tiles */}
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-[#D4AF6A] to-[#A0784A]" />
              <div className="aspect-square rounded-lg bg-gradient-to-br from-[#7CB8D4] to-[#3A7FA0] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white text-ink rounded-md px-2 py-0.5 text-[10px] font-medium flex items-center gap-1">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Selected
                  </span>
                </div>
              </div>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-[#D4A0A0] to-[#A06060]" />
            </div>

            {/* Style hint */}
            <p className="text-white/20 text-[11px] mt-4 text-center">
              3 variations generated in 4.2s
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
