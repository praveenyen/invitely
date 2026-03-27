export type TemplateId = "classic" | "modern" | "royal";
export type ThemeId =
  | "golden-dawn"
  | "midnight-rose"
  | "emerald-garden"
  | "blush-pink"
  | "ocean-blue"
  | "noir";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  role: string;
}

export interface InvitationData {
  occasion: string;
  title: string;
  brideName: string;
  groomName: string;
  cardImageUrl?: string;
  date: string;
  time: string;
  venue: string;
  message: string;
  religion: string;
  contacts: Contact[];
  templateId?: TemplateId;
  themeId?: ThemeId;
}

export const INVITATION_STORAGE_KEY = "invitely_data";

export const blessingByReligion: Record<string, string> = {
  hindu: "|| Shri Ganeshaya Namaha ||",
  muslim: "Bismillah ir-Rahman ir-Rahim",
  christian: "With God's Blessings",
  sikh: "ੴ ਸਤਿ ਨਾਮੁ",
  jewish: "Baruch Hashem",
  buddhist: "May all beings be happy",
  other: "",
  "non-religious": "",
};
