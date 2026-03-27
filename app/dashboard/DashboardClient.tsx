"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, LogOut, Eye, ArrowRight, Sparkles } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { useAuthStore } from "@/store/auth";

interface Invitation {
  slug: string;
  title: string;
  brideName: string;
  groomName: string;
  occasion: string;
  date: string;
  viewCount: number;
}

const occasionEmoji: Record<string, string> = {
  wedding: "💒",
  engagement: "💍",
  anniversary: "🥂",
  birthday: "🎂",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function DashboardClient({
  userId,
  mobile,
  invitations,
}: {
  userId: string;
  mobile: string;
  invitations: Invitation[];
}) {
  const router = useRouter();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    setUser({ id: userId, mobile });
  }, [userId, mobile, setUser]);

  const handleSignOut = async () => {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    clearUser();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(36 30% 95%)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#B8932A]/15 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.4rem",
            background: "linear-gradient(135deg, #7A5018 0%, #B8932A 50%, #7A5018 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Invitely
        </p>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-xs text-[#7A5C3A] hover:text-[#2C1810] transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </header>

      <div className="flex-1 px-5 py-6 max-w-lg mx-auto w-full flex flex-col gap-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#B8932A] font-medium">
              Welcome back
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#2C1810" }}>
              +91 {mobile}
            </h1>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-medium text-white hover:opacity-90 active:scale-[0.98] transition-all"
            style={{
              background: "linear-gradient(135deg, #B8932A 0%, #D4A843 50%, #B8932A 100%)",
              boxShadow: "0 4px 16px -4px hsl(38 65% 50% / 0.4)",
            }}
          >
            <Plus className="h-4 w-4" />
            New
          </Link>
        </motion.div>

        {/* Invitations list */}
        {invitations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#B8932A]/30 bg-white/50 py-14 px-8 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#B8932A]/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#B8932A]" />
            </div>
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: "var(--font-display)", color: "#2C1810", fontSize: "1.1rem" }}>
                No invitations yet
              </p>
              <p className="text-sm text-[#7A5C3A]">
                Invitations you create will appear here automatically
              </p>
            </div>
            <Link
              href="/create"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium text-white hover:opacity-90 transition-all"
              style={{
                background: "linear-gradient(135deg, #B8932A 0%, #D4A843 50%, #B8932A 100%)",
                boxShadow: "0 4px 16px -4px hsl(38 65% 50% / 0.4)",
              }}
            >
              <Plus className="h-4 w-4" />
              Create Invitation
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {invitations.map((inv, i) => {
              const names = [inv.brideName, inv.groomName].filter(Boolean).join(" & ") || inv.title;
              return (
                <motion.div
                  key={inv.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="rounded-2xl border border-[#B8932A]/20 bg-white/80 p-4 flex items-center gap-4"
                >
                  {/* Occasion icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#B8932A]/10 flex items-center justify-center text-xl shrink-0">
                    {occasionEmoji[inv.occasion] ?? "🎉"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium truncate"
                      style={{ fontFamily: "var(--font-display)", color: "#2C1810", fontSize: "0.95rem" }}
                    >
                      {names}
                    </p>
                    <p className="text-xs text-[#7A5C3A] mt-0.5">{formatDate(inv.date)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Eye className="h-3 w-3 text-[#B8932A]/60" />
                      <span className="text-xs text-[#B8932A]/70">{inv.viewCount} views</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <Link
                      href={`/i/${inv.slug}`}
                      className="flex items-center gap-1 text-xs text-[#B8932A] font-medium hover:underline"
                    >
                      View <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href={`/i/${inv.slug}/stats`}
                      className="text-xs text-[#7A5C3A] hover:text-[#2C1810] transition-colors"
                    >
                      Stats & Edit
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
