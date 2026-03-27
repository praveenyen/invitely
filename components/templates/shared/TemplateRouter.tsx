"use client";

import { resolveTemplate } from "@/lib/templates";
import { resolveTheme } from "@/lib/themes";
import { ThemeContext } from "./ThemeContext";
import ThemeWrapper from "./ThemeWrapper";
import type { InvitationData } from "@/types/invitation";

interface TemplateRouterProps {
  data: InvitationData;
  slug?: string;
}

export default function TemplateRouter({ data, slug }: TemplateRouterProps) {
  const theme = resolveTheme(data.themeId);
  const template = resolveTemplate(data.templateId);
  const TemplateComponent = template.component;

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeWrapper theme={theme}>
        <TemplateComponent data={data} theme={theme} slug={slug} />
      </ThemeWrapper>
    </ThemeContext.Provider>
  );
}
