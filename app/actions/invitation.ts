"use server";

import { supabase } from "@/lib/supabase";
import { InvitationData } from "@/types/invitation";
import { generateSlug } from "@/lib/slug";

export async function saveInvitation(
  data: InvitationData,
  pin: string
): Promise<{ slug: string } | { error: string }> {
  const names = [data.brideName, data.groomName].filter(Boolean).join(" ");
  const slug = generateSlug(data.title, names);

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
    pin,
  });

  if (error) return { error: error.message };
  return { slug };
}

export async function getInvitation(slug: string): Promise<InvitationData | null> {
  const { data, error } = await supabase
    .from("invitations")
    .select("occasion,title,bride_name,groom_name,card_image_url,date,time,venue,message,religion,contacts")
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
  };
}

export async function getInvitationStats(slug: string): Promise<{
  data: InvitationData;
  viewCount: number;
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
    },
    viewCount: data.view_count ?? 0,
  };
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
    })
    .eq("slug", slug);

  if (error) return { error: error.message };
  return { success: true };
}
