import { notFound } from "next/navigation";
import { getInvitationStats } from "@/app/actions/invitation";
import StatsClient from "./StatsClient";

export default async function StatsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stats = await getInvitationStats(slug);

  if (!stats) notFound();

  return (
    <StatsClient slug={slug} data={stats.data} viewCount={stats.viewCount} />
  );
}
