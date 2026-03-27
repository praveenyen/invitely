import type { Theme } from "@/lib/themes";

export default function ThemeWrapper({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const t = theme.tokens;
  return (
    <div
      style={
        {
          "--inv-bg-page": t.bgPage,
          "--inv-bg-card": t.bgCard,
          "--inv-bg-header": t.bgHeader,
          "--inv-accent-primary": t.accentPrimary,
          "--inv-accent-gradient": t.accentGradient,
          "--inv-accent-from": t.accentGradientFrom,
          "--inv-accent-to": t.accentGradientTo,
          "--inv-text-heading": t.textHeading,
          "--inv-text-body": t.textBody,
          "--inv-text-muted": t.textMuted,
          "--inv-header-border": t.headerBorder,
          "--inv-divider-color": t.dividerColor,
          "--inv-qr-fg": t.qrFgColor,
          "--inv-font-display": theme.fonts.display,
          "--inv-font-body": theme.fonts.body,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
