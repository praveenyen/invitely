"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { INVITATION_STORAGE_KEY } from "@/types/invitation";
import { saveInvitation } from "@/app/actions/invitation";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  Phone,
  User,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  Users,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OccasionType = "wedding" | "engagement" | "anniversary" | "birthday" | "";
type ReligionType =
  | "hindu"
  | "muslim"
  | "christian"
  | "sikh"
  | "jewish"
  | "buddhist"
  | "other"
  | "non-religious"
  | "";

interface Contact {
  id: string;
  name: string;
  phone: string;
  role: string;
}

interface FormData {
  occasion: OccasionType;
  title: string;
  hostNames: string;
  date: string;
  time: string;
  venue: string;
  message: string;
  religion: ReligionType;
  contacts: Contact[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const occasions = [
  { id: "wedding", label: "Wedding", emoji: "💒", desc: "Union of two souls" },
  { id: "engagement", label: "Engagement", emoji: "💍", desc: "The promise" },
  { id: "anniversary", label: "Anniversary", emoji: "🥂", desc: "Celebrate love" },
  { id: "birthday", label: "Birthday", emoji: "🎂", desc: "A special day" },
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

const steps = [
  { label: "Occasion", desc: "What are you celebrating?" },
  { label: "Details", desc: "Tell us about the event" },
  { label: "Culture", desc: "Select your tradition" },
  { label: "Contacts", desc: "Who's helping your guests?" },
];

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 px-5 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= current ? "bg-primary" : "bg-border"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Input components ─────────────────────────────────────────────────────────

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

// ─── Step 1 — Occasion ────────────────────────────────────────────────────────

function StepOccasion({
  value,
  onChange,
}: {
  value: OccasionType;
  onChange: (v: OccasionType) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          What's the occasion?
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Choose the type of celebration
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {occasions.map((o) => {
          const selected = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id as OccasionType)}
              className={`relative flex flex-col items-center gap-2 rounded-2xl p-5 border-2 transition-all duration-200 text-left ${
                selected
                  ? "border-primary bg-primary/8 shadow-card"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {selected && (
                <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </span>
              )}
              <span className="text-3xl">{o.emoji}</span>
              <div>
                <p className="font-display text-sm font-semibold text-foreground text-center">
                  {o.label}
                </p>
                <p className="text-[11px] text-muted-foreground text-center mt-0.5">
                  {o.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2 — Event Details ───────────────────────────────────────────────────

function StepDetails({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Event details
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Fill in the details for your invitation
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <Field label="Invitation Title" icon={MessageSquare}>
          <input
            className={inputClass}
            placeholder="e.g. Sarah & Raj's Wedding"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </Field>

        <Field label="Host Name(s)" icon={Users}>
          <input
            className={inputClass}
            placeholder="e.g. The Sharma Family"
            value={data.hostNames}
            onChange={(e) => onChange("hostNames", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" icon={Calendar}>
            <input
              type="date"
              className={inputClass}
              value={data.date}
              onChange={(e) => onChange("date", e.target.value)}
            />
          </Field>
          <Field label="Time" icon={Clock}>
            <input
              type="time"
              className={inputClass}
              value={data.time}
              onChange={(e) => onChange("time", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Venue" icon={MapPin}>
          <input
            className={inputClass}
            placeholder="Venue name or address"
            value={data.venue}
            onChange={(e) => onChange("venue", e.target.value)}
          />
        </Field>

        <Field label="Personal Message" icon={MessageSquare}>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="Write a heartfelt message for your guests…"
            value={data.message}
            onChange={(e) => onChange("message", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

// ─── Step 3 — Religion ────────────────────────────────────────────────────────

function StepReligion({
  value,
  onChange,
}: {
  value: ReligionType;
  onChange: (v: ReligionType) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Cultural tradition
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          We'll tailor the design to match your tradition
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {religions.map((r) => {
          const selected = value === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onChange(r.id as ReligionType)}
              className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary/8"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="text-xl">{r.emoji}</span>
              <span className="text-sm font-medium text-foreground">
                {r.label}
              </span>
              {selected && (
                <Check className="h-4 w-4 text-primary ml-auto shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 4 — Assistance Contacts ────────────────────────────────────────────

function StepContacts({
  contacts,
  onChange,
}: {
  contacts: Contact[];
  onChange: (contacts: Contact[]) => void;
}) {
  const add = () =>
    onChange([
      ...contacts,
      { id: crypto.randomUUID(), name: "", phone: "", role: "" },
    ]);

  const remove = (id: string) =>
    onChange(contacts.filter((c) => c.id !== id));

  const update = (id: string, field: keyof Contact, value: string) =>
    onChange(contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Assistance contacts
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          People who can guide guests to the venue
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {contacts.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-8 text-center">
            <Phone className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No contacts added yet</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {contacts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Contact {i + 1}
                </span>
                <button
                  onClick={() => remove(c.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    className={`${inputClass} pl-9`}
                    placeholder="Full name"
                    value={c.name}
                    onChange={(e) => update(c.id, "name", e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    className={`${inputClass} pl-9`}
                    placeholder="Phone / WhatsApp number"
                    type="tel"
                    value={c.phone}
                    onChange={(e) => update(c.id, "phone", e.target.value)}
                  />
                </div>
                <input
                  className={inputClass}
                  placeholder="Role (e.g. Bride's cousin, Driver)"
                  value={c.role}
                  onChange={(e) => update(c.id, "role", e.target.value)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={add}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add contact
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>({
    occasion: "",
    title: "",
    hostNames: "",
    date: "",
    time: "",
    venue: "",
    message: "",
    religion: "",
    contacts: [],
  });

  const updateField = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return !!form.occasion;
    if (step === 1) return !!form.title && !!form.date && !!form.venue;
    if (step === 2) return !!form.religion;
    return true;
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-5 pb-2">
        <button
          onClick={() => (step === 0 ? router.back() : go(step - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
            Step {step + 1} of {steps.length}
          </p>
          <p className="text-xs text-foreground font-medium">
            {steps[step].desc}
          </p>
        </div>
      </header>

      {/* Progress */}
      <StepBar current={step} total={steps.length} />

      {/* Step tab labels */}
      <div className="flex px-5 gap-1 overflow-x-auto no-scrollbar pb-2">
        {steps.map((s, i) => (
          <span
            key={s.label}
            className={`text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground"
            }`}
          >
            {i < step ? "✓ " : ""}{s.label}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-5 pt-2 pb-4">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {step === 0 && (
              <StepOccasion
                value={form.occasion}
                onChange={(v) => updateField("occasion", v)}
              />
            )}
            {step === 1 && (
              <StepDetails data={form} onChange={updateField} />
            )}
            {step === 2 && (
              <StepReligion
                value={form.religion}
                onChange={(v) => updateField("religion", v)}
              />
            )}
            {step === 3 && (
              <StepContacts
                contacts={form.contacts}
                onChange={(c) => setForm((f) => ({ ...f, contacts: c }))}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-8 pt-2 border-t border-border bg-background">
        <button
          disabled={!canNext() || saving}
          onClick={async () => {
            if (step < steps.length - 1) {
              go(step + 1);
            } else {
              setSaving(true);
              setSaveError("");
              localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(form));
              const result = await saveInvitation(form);
              setSaving(false);
              if ("error" in result) {
                setSaveError(result.error);
              } else {
                router.push(`/i/${result.slug}`);
              }
            }
          }}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-medium text-primary-foreground gradient-gold shadow-card disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Creating…
            </>
          ) : step < steps.length - 1 ? (
            <>
              Continue
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Create Invitation
            </>
          )}
        </button>
        {saveError && (
          <p className="text-xs text-destructive text-center mt-2">{saveError}</p>
        )}
      </div>
    </div>
  );
}
