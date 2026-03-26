"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Share2, Smartphone } from "lucide-react";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: Sparkles,
    title: "Beautiful Cards",
    desc: "Elegant designs for every occasion",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    desc: "One link to share anywhere",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    desc: "Looks perfect on every device",
  },
];

export default function Index() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <h1 className="font-display text-xl font-bold text-foreground">
          Invitely <span className="text-primary">✦</span>
        </h1>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 max-w-sm"
        >
          <motion.span
            className="text-6xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✉️
          </motion.span>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Create Beautiful
            <br />
            <span className="text-primary">Invitations</span>
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Craft stunning digital invitations for weddings, birthdays, and
            more. Share with a single link.
          </p>

          <Button
            onClick={() => router.push("/create")}
            className="mt-2 gradient-gold text-primary-foreground rounded-full px-8 gap-2 font-medium shadow-card hover:opacity-90 transition-opacity"
          >
            Create Invitation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-sm"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-card w-36"
            >
              <f.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-foreground">
                {f.title}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                {f.desc}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
