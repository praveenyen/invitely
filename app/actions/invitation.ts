"use server";

import { supabase } from "@/lib/supabase";
import { InvitationData } from "@/types/invitation";
import { generateSlug } from "@/lib/slug";

export async function saveInvitation(
  data: InvitationData,
  pin: string,
  userPhone?: string
): Promise<{ slug: string } | { error: string }> {
  const names = [data.brideName, data.groomName].filter(Boolean).join(" ");
  const slug = generateSlug(data.title, names);

  // For logged-in users, generate a random PIN so the field is never empty
  const actualPin = userPhone
    ? String(Math.floor(1000 + Math.random() * 9000))
    : pin;

  const { error } = await supabase.from("invitations").insert({
    slug,
    occasion: data.occasion,
    title: data.title,
    bride_name: data.brideName,
    groom_name: data.groomName,
    card_image_url: data.cardImageUrl ?? null,
    date: data.date,
    time: data.time,
    venue: data.venue,
    message: data.message,
    religion: data.religion,
    contacts: data.contacts,
    pin: actualPin,
    user_phone: userPhone ?? null,
    template_id: data.templateId ?? "classic",
    theme_id: data.themeId ?? "golden-dawn",
  });

  if (error) return { error: error.message };
  return { slug };
}

export async function getInvitation(slug: string): Promise<InvitationData | null> {
  const { data, error } = await supabase
    .from("invitations")
    .select("occasion,title,bride_name,groom_name,card_image_url,date,time,venue,message,religion,contacts,template_id,theme_id")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    occasion: data.occasion,
    title: data.title,
    brideName: data.bride_name ?? "",
    groomName: data.groom_name ?? "",
    cardImageUrl: data.card_image_url ?? undefined,
    date: data.date,
    time: data.time,
    venue: data.venue,
    message: data.message,
    religion: data.religion,
    contacts: data.contacts ?? [],
    templateId: (data.template_id ?? "classic") as import("@/types/invitation").TemplateId,
    themeId: (data.theme_id ?? "golden-dawn") as import("@/types/invitation").ThemeId,
  };
}

export async function getInvitationStats(slug: string): Promise<{
  data: InvitationData;
  viewCount: number;
  userPhone: string | null;
  pin: string;
} | null> {
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    data: {
      occasion: data.occasion,
      title: data.title,
      brideName: data.bride_name ?? "",
      groomName: data.groom_name ?? "",
      cardImageUrl: data.card_image_url ?? undefined,
      date: data.date,
      time: data.time,
      venue: data.venue,
      message: data.message,
      religion: data.religion,
      contacts: data.contacts ?? [],
      templateId: (data.template_id ?? "classic") as import("@/types/invitation").TemplateId,
      themeId: (data.theme_id ?? "golden-dawn") as import("@/types/invitation").ThemeId,
    },
    viewCount: data.view_count ?? 0,
    userPhone: data.user_phone ?? null,
    pin: data.pin ?? "",
  };
}

export async function getInvitationsByPhone(phone: string): Promise<
  Array<{
    slug: string;
    title: string;
    brideName: string;
    groomName: string;
    occasion: string;
    date: string;
    viewCount: number;
  }>
> {
  const { data, error } = await supabase
    .from("invitations")
    .select("slug,title,bride_name,groom_name,occasion,date,view_count")
    .eq("user_phone", phone)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((d) => ({
    slug: d.slug,
    title: d.title ?? "",
    brideName: d.bride_name ?? "",
    groomName: d.groom_name ?? "",
    occasion: d.occasion ?? "",
    date: d.date ?? "",
    viewCount: d.view_count ?? 0,
  }));
}

export async function verifyPin(slug: string, pin: string): Promise<boolean> {
  const { data } = await supabase
    .from("invitations")
    .select("pin")
    .eq("slug", slug)
    .single();

  return data?.pin === pin;
}

export async function incrementViewCount(slug: string): Promise<void> {
  await supabase.rpc("increment_view_count", { slug_param: slug });
}

export async function attachInvitationToPhone(
  slug: string,
  pin: string,
  mobile: string
): Promise<{ success: boolean } | { error: string }> {
  const valid = await verifyPin(slug, pin);
  if (!valid) return { error: "Invalid PIN" };

  const phone = mobile.replace(/\D/g, "");
  if (phone.length !== 10) return { error: "Enter a valid 10-digit mobile number" };

  const { error } = await supabase
    .from("invitations")
    .update({ user_phone: phone })
    .eq("slug", slug);

  if (error) return { error: error.message };
  return { success: true };
}

export async function updateInvitation(
  slug: string,
  pin: string,
  updates: InvitationData
): Promise<{ success: boolean } | { error: string }> {
  const valid = await verifyPin(slug, pin);
  if (!valid) return { error: "Invalid PIN" };

  const { error } = await supabase
    .from("invitations")
    .update({
      occasion: updates.occasion,
      title: updates.title,
      bride_name: updates.brideName,
      groom_name: updates.groomName,
      date: updates.date,
      time: updates.time,
      venue: updates.venue,
      message: updates.message,
      religion: updates.religion,
      contacts: updates.contacts,
      ...(updates.templateId && { template_id: updates.templateId }),
      ...(updates.themeId && { theme_id: updates.themeId }),
    })
    .eq("slug", slug);

  if (error) return { error: error.message };
  return { success: true };
}
