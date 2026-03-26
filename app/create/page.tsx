"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
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
  ImagePlus,
  X,
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
  brideName: string;
  groomName: string;
  date: string;
  time: string;
  venue: string;
  message: string;
  religion: ReligionType;
  contacts: Contact[];
  pin: string;
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
  { label: "Secure", desc: "Set a PIN to manage your invite" },
];

function getNameConfig(occasion: OccasionType) {
  switch (occasion) {
    case "wedding":
      return {
        label1: "Bride's Name",
        placeholder1: "e.g. Priya",
        label2: "Groom's Name",
        placeholder2: "e.g. Rahul",
      };
    case "engagement":
      return {
        label1: "Her Name",
        placeholder1: "e.g. Priya",
        label2: "His Name",
        placeholder2: "e.g. Rahul",
      };
    case "anniversary":
      return {
        label1: "Her Name",
        placeholder1: "e.g. Priya",
        label2: "His Name",
        placeholder2: "e.g. Rahul",
      };
    case "birthday":
      return {
        label1: "Celebrant's Name",
        placeholder1: "e.g. Priya",
        label2: "Partner's Name",
        placeholder2: "Optional",
      };
    default:
      return {
        label1: "Person 1 Name",
        placeholder1: "",
        label2: "Person 2 Name",
        placeholder2: "Optional",
      };
  }
}

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
  imagePreview,
  onImageChange,
  onImageClear,
}: {
  data: FormData;
  onChange: (k: keyof FormData, v: string) => void;
  imagePreview: string;
  onImageChange: (file: File) => void;
  onImageClear: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameConfig = getNameConfig(data.occasion);

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

        <div className="grid grid-cols-2 gap-3">
          <Field label={nameConfig.label1} icon={Users}>
            <input
              className={inputClass}
              placeholder={nameConfig.placeholder1}
              value={data.brideName}
              onChange={(e) => onChange("brideName", e.target.value)}
            />
          </Field>
          <Field label={nameConfig.label2} icon={User}>
            <input
              className={inputClass}
              placeholder={nameConfig.placeholder2}
              value={data.groomName}
              onChange={(e) => onChange("groomName", e.target.value)}
            />
          </Field>
        </div>

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

        {/* ── Card image upload ── */}
        <Field label="Custom Invitation Card (optional)" icon={ImagePlus}>
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border">
              <Image
                src={imagePreview}
                alt="Card preview"
                width={400}
                height={250}
                className="w-full h-44 object-cover"
              />
              <button
                onClick={onImageClear}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-card py-6 text-center hover:border-primary/60 hover:bg-primary/3 transition-all"
            >
              <ImagePlus className="h-7 w-7 text-primary/50" />
              <div>
                <p className="text-sm font-medium text-foreground">Upload your card design</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">PNG, JPG or WEBP · Max 5 MB</p>
              </div>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageChange(file);
            }}
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

// ─── Step 5 — PIN ────────────────────────────────────────────────────────────

function StepPin({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Secure your invite
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Set a 4-digit PIN to view stats and edit your invitation later
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-2">
        <input
          type="tel"
          inputMode="numeric"
          maxLength={4}
          placeholder="0000"
          value={value}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 4);
            onChange(v);
          }}
          className="text-center text-4xl font-bold tracking-[0.6em] w-52 rounded-2xl border-2 border-border bg-card py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-foreground placeholder:text-muted-foreground/30"
        />
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          Remember this PIN — you&apos;ll need it to view stats, edit details, and
          access your dashboard at{" "}
          <span className="font-medium text-foreground">/i/your-link/stats</span>
        </p>
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState<FormData>({
    occasion: "",
    title: "",
    brideName: "",
    groomName: "",
    date: "",
    time: "",
    venue: "",
    message: "",
    religion: "",
    contacts: [],
    pin: "",
  });

  const updateField = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageClear = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const canNext = () => {
    if (step === 0) return !!form.occasion;
    if (step === 1) return !!form.title && !!form.brideName && !!form.date && !!form.venue;
    if (step === 2) return !!form.religion;
    if (step === 4) return /^\d{4}$/.test(form.pin);
    return true;
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async () => {
    setSaving(true);
    setSaveError("");

    let cardImageUrl: string | undefined;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("invitation-cards")
        .upload(path, imageFile, { contentType: imageFile.type, upsert: false });

      if (uploadError) {
        setSaveError(`Image upload failed: ${uploadError.message}`);
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("invitation-cards")
        .getPublicUrl(path);
      cardImageUrl = urlData.publicUrl;
    }

    const payload = {
      occasion: form.occasion,
      title: form.title,
      brideName: form.brideName,
      groomName: form.groomName,
      date: form.date,
      time: form.time,
      venue: form.venue,
      message: form.message,
      religion: form.religion,
      contacts: form.contacts,
      cardImageUrl,
    };
    localStorage.setItem(INVITATION_STORAGE_KEY, JSON.stringify(payload));
    const result = await saveInvitation(payload, form.pin);
    setSaving(false);

    if ("error" in result) {
      setSaveError(result.error);
    } else {
      router.push(`/i/${result.slug}`);
    }
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
              <StepDetails
                data={form}
                onChange={updateField}
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                onImageClear={handleImageClear}
              />
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
            {step === 4 && (
              <StepPin
                value={form.pin}
                onChange={(v) => updateField("pin", v)}
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
              await handleSubmit();
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
