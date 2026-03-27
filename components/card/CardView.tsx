"use client";

import { InvitationData } from "@/types/invitation";
import TemplateRouter from "@/components/templates/shared/TemplateRouter";

export default function CardView({
  data,
  slug,
}: {
  data: InvitationData;
  slug?: string;
}) {
  return <TemplateRouter data={data} slug={slug} />;
}
