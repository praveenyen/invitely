import { notFound } from "next/navigation";
import { getInvitation } from "@/app/actions/invitation";
import CardView from "@/components/card/CardView";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getInvitation(slug);

  if (!data) notFound();

  return <CardView data={data} />;
}
