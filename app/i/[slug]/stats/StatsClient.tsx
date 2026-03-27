"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  Lock,
  ArrowLeft,
  ExternalLink,
  Plus,
  Trash2,
  Phone,
  User,
  Check,
} from "lucide-react";
import { verifyPin, updateInvitation, attachInvitationToPhone } from "@/app/actions/invitation";
import { InvitationData, Contact } from "@/types/invitation";

// ─── Shared data ──────────────────────────────────────────────────────────────

const occasions = [
  { id: "wedding", label: "Wedding", emoji: "💒" },
  { id: "engagement", label: "Engagement", emoji: "💍" },
  { id: "anniversary", label: "Anniversary", emoji: "🥂" },
  { id: "birthday", label: "Birthday", emoji: "🎂" },
];

const religions = [
  { id: "hindu", label: "Hindu", emoji: "🪔" },
  { id: "muslim", label: "Muslim", emoji: "☪️" },
  { id: "christian", label: "Christian", emoji: "✝️" },
  { id: "sikh", label: "Sikh", emoji: "☬" },
  { id: "jewish", label: "Jewish", emoji: "✡️" },
  { id: "buddhist", label: "Buddhist", emoji: "☸️" },
  { id: "non-religious", label: "Non-religious", emoji: "🌿" },
  { id: "other", label: "Other", emoji: "🌐" },
];

function getNameConfig(occasion: string) {
  switch (occasion) {
    case "wedding":
      return { label1: "Bride's Name", label2: "Groom's Name" };
    case "engagement":
    case "anniversary":
      return { label1: "Her Name", label2: "His Name" };
    default:
      return { label1: "Celebrant's Name", label2: "Partner's Name" };
  }
}

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── PIN Gate ─────────────────────────────────────────────────────────────────

function PinGate({
  slug,
  title,
  onUnlock,
}: {
  slug: string;
  title: string;
  onUnlock: (pin: string) => void;
}) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verify = async (pin: string) => {
    if (pin.length !== 4) return;
    setLoading(true);
    setError("");
    const valid = await verifyPin(slug, pin);
    setLoading(false);
    if (valid) {
      onUnlock(pin);
    } else {
      setShaking(true);
      setError("Incorrect PIN. Try again.");
      setDigits(["", "", "", ""]);
      setTimeout(() => {
        setShaking(false);
        refs[0].current?.focus();
      }, 500);
    }
  };

  const handleInput = (i: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[i] = value;
    setDigits(next);
    if (value && i < 3) refs[i + 1].current?.focus();
    if (value && i === 3) verify([...next.slice(0, 3), value].join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-7 w-7 text-primary" />
        </div>

        <div className="text-center">
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stats & Edit
          </h1>
          <p className="text-sm text-muted-foreground mt-1 italic">{title}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Enter your 4-digit PIN to continue
          </p>
        </div>

        <motion.div
          animate={shaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-3"
        >
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              ref={refs[i]}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digits[i]}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-14 h-14 text-center text-2xl font-bold rounded-2xl border-2 bg-card transition-all focus:outline-none ${
                digits[i]
                  ? "border-primary text-primary"
                  : "border-border text-foreground"
              } focus:border-primary focus:ring-2 focus:ring-primary/20`}
            />
          ))}
        </motion.div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {loading && (
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        )}

        <button
          onClick={() => verify(digits.join(""))}
          disabled={digits.join("").length !== 4 || loading}
          className="w-full py-3.5 rounded-2xl font-medium text-primary-foreground gradient-gold shadow-card disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Verify PIN
        </button>

        <Link
          href={`/i/${slug}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to invitation
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Stats Dashboard ──────────────────────────────────────────────────────────

export default function StatsClient({
  slug,
  data,
  viewCount,
  autoUnlocked = false,
  serverPin,
}: {
  slug: string;
  data: InvitationData;
  viewCount: number;
  autoUnlocked?: boolean;
  serverPin?: string;
}) {
  const [phase, setPhase] = useState<"pin" | "stats">(() => {
    if (autoUnlocked) return "stats";
    if (typeof window !== "undefined" && sessionStorage.getItem(`stats_${slug}`) === "1")
      return "stats";
    return "pin";
  });
  const [verifiedPin, setVerifiedPin] = useState<string>(() => {
    if (autoUnlocked && serverPin) return serverPin;
    if (typeof window !== "undefined") return sessionStorage.getItem(`pin_${slug}`) ?? "";
    return "";
  });
  const [form, setForm] = useState<InvitationData>({ ...data });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [attachMobile, setAttachMobile] = useState("");
  const [attaching, setAttaching] = useState(false);
  const [attachMsg, setAttachMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleUnlock = (pin: string) => {
    sessionStorage.setItem(`stats_${slug}`, "1");
    sessionStorage.setItem(`pin_${slug}`, pin);
    setVerifiedPin(pin);
    setPhase("stats");
  };

  const handleLock = () => {
    sessionStorage.removeItem(`stats_${slug}`);
    sessionStorage.removeItem(`pin_${slug}`);
    setVerifiedPin("");
    setPhase("pin");
  };

  const updateField = (k: keyof InvitationData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const addContact = () =>
    setForm((f) => ({
      ...f,
      contacts: [
        ...f.contacts,
        { id: crypto.randomUUID(), name: "", phone: "", role: "" },
      ],
    }));

  const removeContact = (id: string) =>
    setForm((f) => ({
      ...f,
      contacts: f.contacts.filter((c) => c.id !== id),
    }));

  const updateContact = (id: string, field: keyof Contact, value: string) =>
    setForm((f) => ({
      ...f,
      contacts: f.contacts.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    const result = await updateInvitation(slug, verifiedPin, form);
    setSaving(false);
    if ("error" in result) {
      setSaveMsg({ type: "error", text: result.error });
    } else {
      setSaveMsg({ type: "success", text: "Changes saved!" });
      setTimeout(() => setSaveMsg(null), 4000);
    }
  };

  if (phase === "pin") {
    return (
      <PinGate slug={slug} title={data.title} onUnlock={handleUnlock} />
    );
  }

  const nameConfig = getNameConfig(form.occasion);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-5 py-3 gap-3">
        <Link
          href={`/i/${slug}`}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <p
          className="text-sm font-medium text-foreground italic truncate"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {[data.brideName, data.groomName].filter(Boolean).join(" & ") ||
            data.title}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/i/${slug}`}
            target="_blank"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Preview <ExternalLink className="h-3 w-3" />
          </Link>
          <button
            onClick={handleLock}
            title="Lock"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 py-6 flex flex-col gap-6">
        {/* View count */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{viewCount}</p>
            <p className="text-sm text-muted-foreground">Page views</p>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">
              Counted after scrolling 50% of the page
            </p>
          </div>
        </motion.div>

        {/* Edit form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <h2
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Edit Invitation
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Occasion */}
          <Field label="Occasion">
            <div className="grid grid-cols-2 gap-2">
              {occasions.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => updateField("occasion", o.id)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm transition-all ${
                    form.occasion === o.id
                      ? "border-primary bg-primary/8 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span>{o.emoji}</span>
                  <span className="font-medium">{o.label}</span>
                  {form.occasion === o.id && (
                    <Check className="h-3.5 w-3.5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </Field>

          {/* Title */}
          <Field label="Invitation Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>

          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <Field label={nameConfig.label1}>
              <input
                className={inputClass}
                value={form.brideName}
                onChange={(e) => updateField("brideName", e.target.value)}
              />
            </Field>
            <Field label={nameConfig.label2}>
              <input
                className={inputClass}
                value={form.groomName}
                onChange={(e) => updateField("groomName", e.target.value)}
              />
            </Field>
          </div>

          {/* Date / Time */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input
                type="date"
                className={inputClass}
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </Field>
            <Field label="Time">
              <input
                type="time"
                className={inputClass}
                value={form.time}
                onChange={(e) => updateField("time", e.target.value)}
              />
            </Field>
          </div>

          {/* Venue */}
          <Field label="Venue">
            <input
              className={inputClass}
              value={form.venue}
              onChange={(e) => updateField("venue", e.target.value)}
            />
          </Field>

          {/* Message */}
          <Field label="Personal Message">
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </Field>

          {/* Religion */}
          <Field label="Cultural Tradition">
            <div className="grid grid-cols-2 gap-2">
              {religions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => updateField("religion", r.id)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm transition-all ${
                    form.religion === r.id
                      ? "border-primary bg-primary/8 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span>{r.emoji}</span>
                  <span className="font-medium">{r.label}</span>
                  {form.religion === r.id && (
                    <Check className="h-3.5 w-3.5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </Field>

          {/* Contacts */}
          <Field label="Assistance Contacts">
            <div className="flex flex-col gap-2">
              {form.contacts.map((c, i) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-border bg-card p-3 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Contact {i + 1}
                    </span>
                    <button
                      onClick={() => removeContact(c.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      className={`${inputClass} pl-9`}
                      placeholder="Full name"
                      value={c.name}
                      onChange={(e) =>
                        updateContact(c.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      className={`${inputClass} pl-9`}
                      placeholder="Phone number"
                      type="tel"
                      value={c.phone}
                      onChange={(e) =>
                        updateContact(c.id, "phone", e.target.value)
                      }
                    />
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Role (e.g. Bride's cousin)"
                    value={c.role}
                    onChange={(e) =>
                      updateContact(c.id, "role", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                onClick={addContact}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4" />
                Add contact
              </button>
            </div>
          </Field>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-medium text-primary-foreground gradient-gold shadow-card disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>

          {saveMsg && (
            <p
              className={`text-sm text-center font-medium ${
                saveMsg.type === "success"
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {saveMsg.type === "success" ? "✓ " : ""}
              {saveMsg.text}
            </p>
          )}

          {/* Preview CTA */}
          <div className="flex flex-col items-center gap-2 py-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Want to see how it looks?
            </p>
            <Link
              href={`/i/${slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-primary/40 text-sm font-medium text-primary hover:bg-primary/5 transition-all"
            >
              View Invitation <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Link to account */}
          <div className="flex flex-col gap-4 pt-2 pb-4 border-t border-border">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Link to your account
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Enter your mobile number to view this invitation in your dashboard
              </p>
            </div>
            <div className="flex rounded-xl border border-border bg-card overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <div className="flex items-center gap-1.5 px-3 border-r border-border bg-muted">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                placeholder="98765 43210"
                value={attachMobile}
                onChange={(e) =>
                  setAttachMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="flex-1 px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none bg-transparent"
              />
            </div>
            <button
              onClick={async () => {
                setAttaching(true);
                setAttachMsg(null);
                const result = await attachInvitationToPhone(slug, verifiedPin, attachMobile);
                setAttaching(false);
                if ("error" in result) {
                  setAttachMsg({ type: "error", text: result.error });
                } else {
                  setAttachMsg({ type: "success", text: "Linked! Visit your dashboard to see it." });
                  setAttachMobile("");
                }
              }}
              disabled={attachMobile.length !== 10 || attaching}
              className="flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium text-primary-foreground gradient-gold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {attaching ? (
                <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              ) : (
                "Link to Account"
              )}
            </button>
            {attachMsg && (
              <p className={`text-xs text-center ${attachMsg.type === "success" ? "text-green-600" : "text-destructive"}`}>
                {attachMsg.text}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
