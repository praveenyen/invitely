import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitation } from "@/app/actions/invitation";
import CardView from "@/components/card/CardView";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getInvitation(slug);

  if (!data) {
    return { title: "Invitation not found — Invitely" };
  }

  const names = [data.brideName, data.groomName].filter(Boolean).join(" & ");
  const occasionLabel =
    data.occasion.charAt(0).toUpperCase() + data.occasion.slice(1);
  const title = data.title || `${names}'s ${occasionLabel}`;
  const dateVenue = [formatDate(data.date), data.venue]
    .filter(Boolean)
    .join(" · ");
  const description = data.message
    ? `${data.message} — ${dateVenue}`
    : `You're invited to ${title}. ${dateVenue}`;

  return {
    title: `${title} — Invitely`,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Invitely",
      ...(data.cardImageUrl && {
        images: [
          {
            url: data.cardImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: data.cardImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(data.cardImageUrl && { images: [data.cardImageUrl] }),
    },
  };
}

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
