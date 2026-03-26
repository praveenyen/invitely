"use server";

import { supabase } from "@/lib/supabase";
import { InvitationData } from "@/types/invitation";
import { generateSlug } from "@/lib/slug";

export async function saveInvitation(
  data: InvitationData
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
  });

  if (error) return { error: error.message };
  return { slug };
}

export async function getInvitation(slug: string): Promise<InvitationData | null> {
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
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
