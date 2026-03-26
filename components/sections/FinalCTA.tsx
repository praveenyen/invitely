import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section
      className="py-24 px-6 text-center"
      style={{
        backgroundColor: "#F1EFE8",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%230F0F0F' fill-opacity='0.07'/%3E%3C/svg%3E")`,
      }}
    >
      <RevealOnScroll>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal leading-[1.2] mb-4">
            Your celebration deserves a beautiful invitation
          </h2>
          <p className="text-[17px] text-slate leading-[1.7] mb-8">
            Create your first invite in under 5 minutes. No credit card
            required.
          </p>
          <Button
            variant="primary"
            className="!px-10 !py-4 !text-[16px] mb-6"
          >
            Start Designing — It&apos;s Free
          </Button>
          <div className="flex items-center justify-center gap-6 flex-wrap text-[13px] text-stone">
            <span>✓ No account needed to start</span>
            <span>✓ Share in minutes</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
