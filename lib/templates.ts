import type { ComponentType } from "react";
import type { InvitationData, TemplateId } from "@/types/invitation";
import type { Theme } from "@/lib/themes";

export interface TemplateProps {
  data: InvitationData;
  theme: Theme;
  slug?: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  label: string;
  description: string;
  component: ComponentType<TemplateProps>;
}

// Lazy imports — resolved at call-time to avoid circular deps
function getClassicTemplate(): ComponentType<TemplateProps> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/components/templates/classic/ClassicTemplate").default;
}
function getModernTemplate(): ComponentType<TemplateProps> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/components/templates/modern/ModernTemplate").default;
}
function getRoyalTemplate(): ComponentType<TemplateProps> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/components/templates/royal/RoyalTemplate").default;
}

export const TEMPLATES: Record<TemplateId, Omit<TemplateDefinition, "component">> = {
  classic: {
    id: "classic",
    label: "Classic",
    description: "Traditional Indian mandala layout with floral dividers and ornate decorations.",
  },
  modern: {
    id: "modern",
    label: "Modern",
    description: "Clean typographic layout with generous whitespace and subtle elegance.",
  },
  royal: {
    id: "royal",
    label: "Royal",
    description: "Ornate dark layout with circular portrait frame and intricate corner filigree.",
  },
};

export function resolveTemplate(id?: string | null): TemplateDefinition {
  const templateId = (id as TemplateId) ?? "classic";

  const meta = TEMPLATES[templateId] ?? TEMPLATES["classic"];

  let component: ComponentType<TemplateProps>;
  if (meta.id === "modern") component = getModernTemplate();
  else if (meta.id === "royal") component = getRoyalTemplate();
  else component = getClassicTemplate();

  return { ...meta, component };
}
