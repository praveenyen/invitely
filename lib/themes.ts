import type { ThemeId } from "@/types/invitation";

export interface ThemeTokens {
  bgPage: string;
  bgCard: string;
  bgHeader: string;
  accentPrimary: string;
  accentGradient: string;
  accentGradientFrom: string;
  accentGradientTo: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  headerBorder: string;
  dividerColor: string;
  qrFgColor: string;
}

export interface Theme {
  id: ThemeId;
  label: string;
  preview: { bg: string; accent: string; text: string };
  fonts: { display: string; body: string };
  tokens: ThemeTokens;
}

const THEMES: Record<ThemeId, Theme> = {
  "golden-dawn": {
    id: "golden-dawn",
    label: "Golden Dawn",
    preview: { bg: "hsl(36 30% 95%)", accent: "#B8932A", text: "#5C4030" },
    fonts: { display: "var(--font-playfair)", body: "var(--font-dm-sans)" },
    tokens: {
      bgPage: "hsl(36 30% 95%)",
      bgCard: "hsl(38 40% 96%)",
      bgHeader: "hsla(36, 30%, 95%, 0.95)",
      accentPrimary: "#B8932A",
      accentGradient: "linear-gradient(135deg, #7A5018 0%, #B8932A 50%, #7A5018 100%)",
      accentGradientFrom: "#8B6914",
      accentGradientTo: "#C8A030",
      textHeading: "#2C1810",
      textBody: "#5C4030",
      textMuted: "#7A5C3A",
      headerBorder: "rgba(184,147,42,0.15)",
      dividerColor: "#B8932A",
      qrFgColor: "#7A5018",
    },
  },
  "midnight-rose": {
    id: "midnight-rose",
    label: "Midnight Rose",
    preview: { bg: "hsl(280 15% 10%)", accent: "#D4709A", text: "#D4B8C8" },
    fonts: { display: "var(--font-cormorant)", body: "var(--font-dm-sans)" },
    tokens: {
      bgPage: "hsl(280 15% 10%)",
      bgCard: "hsl(280 12% 14%)",
      bgHeader: "hsla(280, 15%, 10%, 0.95)",
      accentPrimary: "#D4709A",
      accentGradient: "linear-gradient(135deg, #9B3D65 0%, #D4709A 50%, #9B3D65 100%)",
      accentGradientFrom: "#9B3D65",
      accentGradientTo: "#E891B8",
      textHeading: "#F5E6EF",
      textBody: "#D4B8C8",
      textMuted: "#B88FAA",
      headerBorder: "rgba(212,112,154,0.2)",
      dividerColor: "#D4709A",
      qrFgColor: "#9B3D65",
    },
  },
  "emerald-garden": {
    id: "emerald-garden",
    label: "Emerald Garden",
    preview: { bg: "hsl(150 25% 96%)", accent: "#2E7D52", text: "#2D5C42" },
    fonts: { display: "var(--font-lora)", body: "var(--font-dm-sans)" },
    tokens: {
      bgPage: "hsl(150 25% 96%)",
      bgCard: "hsl(150 20% 93%)",
      bgHeader: "hsla(150, 25%, 96%, 0.95)",
      accentPrimary: "#2E7D52",
      accentGradient: "linear-gradient(135deg, #1A5C38 0%, #2E7D52 50%, #1A5C38 100%)",
      accentGradientFrom: "#1A5C38",
      accentGradientTo: "#3D9E69",
      textHeading: "#1A3A28",
      textBody: "#2D5C42",
      textMuted: "#4A7A5C",
      headerBorder: "rgba(46,125,82,0.15)",
      dividerColor: "#2E7D52",
      qrFgColor: "#1A5C38",
    },
  },
  "blush-pink": {
    id: "blush-pink",
    label: "Blush Pink",
    preview: { bg: "hsl(350 40% 97%)", accent: "#C2688A", text: "#6B2D45" },
    fonts: { display: "var(--font-great-vibes)", body: "var(--font-dm-sans)" },
    tokens: {
      bgPage: "hsl(350 40% 97%)",
      bgCard: "hsl(350 30% 94%)",
      bgHeader: "hsla(350, 40%, 97%, 0.95)",
      accentPrimary: "#C2688A",
      accentGradient: "linear-gradient(135deg, #9B3F62 0%, #C2688A 50%, #9B3F62 100%)",
      accentGradientFrom: "#9B3F62",
      accentGradientTo: "#E08AAD",
      textHeading: "#3D1525",
      textBody: "#6B2D45",
      textMuted: "#9B5E76",
      headerBorder: "rgba(194,104,138,0.15)",
      dividerColor: "#C2688A",
      qrFgColor: "#9B3F62",
    },
  },
  "ocean-blue": {
    id: "ocean-blue",
    label: "Ocean Blue",
    preview: { bg: "hsl(210 30% 97%)", accent: "#1B6CA8", text: "#1A4A70" },
    fonts: { display: "var(--font-cinzel)", body: "var(--font-dm-sans)" },
    tokens: {
      bgPage: "hsl(210 30% 97%)",
      bgCard: "hsl(210 25% 93%)",
      bgHeader: "hsla(210, 30%, 97%, 0.95)",
      accentPrimary: "#1B6CA8",
      accentGradient: "linear-gradient(135deg, #0D4E80 0%, #1B6CA8 50%, #0D4E80 100%)",
      accentGradientFrom: "#0D4E80",
      accentGradientTo: "#2B8DCC",
      textHeading: "#0A2840",
      textBody: "#1A4A70",
      textMuted: "#2E6A9A",
      headerBorder: "rgba(27,108,168,0.15)",
      dividerColor: "#1B6CA8",
      qrFgColor: "#0D4E80",
    },
  },
  noir: {
    id: "noir",
    label: "Noir",
    preview: { bg: "hsl(0 0% 8%)", accent: "#E8E8E0", text: "#D0D0C8" },
    fonts: { display: "var(--font-cormorant)", body: "var(--font-dm-sans)" },
    tokens: {
      bgPage: "hsl(0 0% 8%)",
      bgCard: "hsl(0 0% 12%)",
      bgHeader: "hsla(0, 0%, 8%, 0.95)",
      accentPrimary: "#E8E8E0",
      accentGradient: "linear-gradient(135deg, #C0C0B8 0%, #E8E8E0 50%, #C0C0B8 100%)",
      accentGradientFrom: "#C0C0B8",
      accentGradientTo: "#F0F0E8",
      textHeading: "#F0F0E8",
      textBody: "#D0D0C8",
      textMuted: "#A8A8A0",
      headerBorder: "rgba(232,232,224,0.1)",
      dividerColor: "#E8E8E0",
      qrFgColor: "#C0C0B8",
    },
  },
};

export const ALL_THEMES = Object.values(THEMES);

export function resolveTheme(id?: string | null): Theme {
  return THEMES[(id as ThemeId) ?? "golden-dawn"] ?? THEMES["golden-dawn"];
}
