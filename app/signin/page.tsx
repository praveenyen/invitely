"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { useAuthStore } from "@/store/auth";

// Mobile number → pseudo-email used for Supabase auth
const toEmail = (mobile: string) =>
  `91${mobile.replace(/\D/g, "")}@invitely.app`;

// Pad 4-digit PIN to satisfy Supabase's 6-char minimum password policy
const toPassword = (pin: string) => `${pin}inv!`;

const extractMobile = (email: string) =>
  email.replace("91", "").replace("@invitely.app", "");

type Mode = "signin" | "signup";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [mode, setMode] = useState<Mode>("signin");
  const [mobile, setMobile] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const pin = digits.join("");

  const handleDigit = (i: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[i] = value;
    setDigits(next);
    if (value && i < 3) pinRefs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      pinRefs[i - 1].current?.focus();
    }
  };

  const isValid = mobile.replace(/\D/g, "").length === 10 && pin.length === 4;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");

    const supabase = getBrowserSupabase();
    const email = toEmail(mobile);

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password: toPassword(pin),
      });
      if (signUpError) {
        // If user already exists, try signing in instead
        if (signUpError.message.toLowerCase().includes("already")) {
          setError("Account already exists. Try signing in.");
          setLoading(false);
          return;
        }
        setError(signUpError.message);
        setLoading(false);
        return;
      }
    }

    // Sign in (also called after signup to get the session)
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      { email, password: toPassword(pin) }
    );

    if (signInError) {
      setError(
        mode === "signup"
          ? "Account created but sign-in failed. Please sign in manually."
          : "Incorrect mobile number or PIN."
      );
      setLoading(false);
      return;
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        mobile: extractMobile(data.user.email ?? ""),
      });
    }

    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: "hsl(36 30% 95%)" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "2rem",
            background:
              "linear-gradient(135deg, #7A5018 0%, #B8932A 50%, #7A5018 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Invitely
        </p>
        <p className="text-xs text-[#7A5C3A] mt-1 tracking-wide">
          Beautiful Digital Invitations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-sm bg-white/80 rounded-3xl border border-[#B8932A]/20 shadow-[0_4px_32px_-8px_hsl(38_65%_50%/0.15)] p-7 flex flex-col gap-6"
      >
        {/* Mode tabs */}
        <div className="flex rounded-2xl bg-[hsl(36_30%_95%)] p-1 gap-1">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                mode === m
                  ? "bg-white text-[#2C1810] shadow-sm"
                  : "text-[#7A5C3A] hover:text-[#2C1810]"
              }`}
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {/* Mobile number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#7A5C3A] uppercase tracking-wide">
              Mobile Number
            </label>
            <div className="flex rounded-xl border border-[#B8932A]/30 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#B8932A]/30 transition-all">
              <div className="flex items-center gap-1.5 px-3 border-r border-[#B8932A]/20 bg-[hsl(36_30%_97%)]">
                <Phone className="h-3.5 w-3.5 text-[#B8932A]" />
                <span className="text-sm font-medium text-[#7A5C3A]">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                placeholder="98765 43210"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="flex-1 px-3 py-3 text-sm text-[#2C1810] placeholder:text-[#B8932A]/40 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* PIN */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#7A5C3A] uppercase tracking-wide">
              4-Digit PIN
            </label>
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={pinRefs[i]}
                  type="tel"
                  maxLength={1}
                  value={digits[i]}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 bg-white transition-all focus:outline-none ${
                    digits[i]
                      ? "border-[#B8932A] text-[#7A5018]"
                      : "border-[#B8932A]/25 text-foreground"
                  } focus:border-[#B8932A] focus:ring-2 focus:ring-[#B8932A]/20`}
                />
              ))}
            </div>
            <p className="text-[11px] text-[#B8932A]/60 text-center mt-1">
              {mode === "signup"
                ? "Remember this PIN — it cannot be recovered"
                : "Enter the PIN you set during sign up"}
            </p>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-red-500 text-center -mt-2"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
          style={{
            background:
              "linear-gradient(135deg, #B8932A 0%, #D4A843 50%, #B8932A 100%)",
            boxShadow: "0 4px 16px -4px hsl(38 65% 50% / 0.4)",
          }}
        >
          {loading ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <>
              {mode === "signin" ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </motion.div>

      <p className="text-xs text-[#7A5C3A]/60 mt-6 text-center">
        By continuing, you agree to our terms of service
      </p>
    </div>
  );
}
