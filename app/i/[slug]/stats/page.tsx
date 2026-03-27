import { notFound } from "next/navigation";
import { getInvitationStats } from "@/app/actions/invitation";
import { getServerSupabase } from "@/lib/supabase-server";
import StatsClient from "./StatsClient";

export default async function StatsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [stats, supabase] = await Promise.all([
    getInvitationStats(slug),
    getServerSupabase(),
  ]);

  if (!stats) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extract mobile from pseudo-email: "91XXXXXXXXXX@invitely.app"
  const loggedInPhone = user?.email
    ? user.email.replace("91", "").replace("@invitely.app", "")
    : null;

  const autoUnlocked =
    !!loggedInPhone &&
    !!stats.userPhone &&
    loggedInPhone === stats.userPhone;

  return (
    <StatsClient
      slug={slug}
      data={stats.data}
      viewCount={stats.viewCount}
      autoUnlocked={autoUnlocked}
      serverPin={autoUnlocked ? stats.pin : undefined}
    />
  );
}
