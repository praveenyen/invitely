"use client";

// All dividers use var(--inv-divider-color) so they respond to the active theme.
// Falls back visually to #B8932A (golden-dawn default) when used outside a ThemeWrapper.

// ── Diamond divider ────────────────────────────────────────────────────────────
export function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="12" x2="82" y2="12" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.5" />
      <rect x="90" y="6" width="12" height="12" fill="var(--inv-divider-color, #B8932A)" opacity="0.7" transform="rotate(45 96 12)" />
      <rect x="94" y="8.5" width="7" height="7" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.5" transform="rotate(45 97.5 12)" />
      <line x1="110" y1="12" x2="192" y2="12" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

// ── Floral rose divider ────────────────────────────────────────────────────────
export function RoseDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20 Q30 8 60 20 Q90 32 120 20 Q140 12 152 20" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="1" opacity="0.45" />
      <path d="M320 20 Q290 8 260 20 Q230 32 200 20 Q180 12 168 20" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="1" opacity="0.45" />
      {[60, 90].map((x, i) => (
        <ellipse key={i} cx={x} cy={20} rx="4" ry="6" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.18" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.6" transform={`rotate(${i % 2 === 0 ? -20 : 20} ${x} 20)`} />
      ))}
      {[260, 230].map((x, i) => (
        <ellipse key={i} cx={x} cy={20} rx="4" ry="6" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.18" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.6" transform={`rotate(${i % 2 === 0 ? 20 : -20} ${x} 20)`} />
      ))}
      <g transform="translate(160 20)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={i} cx="0" cy="-5" rx="3" ry="5" fill="var(--inv-divider-color, #B8932A)" fillOpacity={0.15 + i * 0.02} stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" transform={`rotate(${angle})`} />
        ))}
        <circle cx="0" cy="0" r="3" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="1.5" fill="var(--inv-divider-color, #B8932A)" />
      </g>
    </svg>
  );
}

// ── Heart vine divider ─────────────────────────────────────────────────────────
export function HeartVineDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 44" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22 C20 10 30 34 45 22 C55 14 65 30 80 22 C90 16 100 28 112 22 C120 18 128 26 138 22" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="1" opacity="0.4" />
      <path d="M330 22 C320 10 310 34 295 22 C285 14 275 30 260 22 C250 16 240 28 228 22 C220 18 212 26 202 22" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="1" opacity="0.4" />
      {[45, 80, 112].map((x, i) => (
        <circle key={i} cx={x} cy={22} r="1.5" fill="var(--inv-divider-color, #B8932A)" opacity="0.4" />
      ))}
      {[295, 260, 228].map((x, i) => (
        <circle key={i} cx={x} cy={22} r="1.5" fill="var(--inv-divider-color, #B8932A)" opacity="0.4" />
      ))}
      <path d="M170 14 C170 10 164 8 162 12 C160 16 168 22 170 26 C172 22 180 16 178 12 C176 8 170 10 170 14 Z" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.35" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.6" />
    </svg>
  );
}

// ── Leaf branch divider ────────────────────────────────────────────────────────
export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M30 16 Q150 16 270 16" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.7" opacity="0.4" />
      {[55, 80, 105].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 16 Q${x - 6} ${16 - 8 + i * 2} ${x - 14} ${16 - 4 + i * 1}`} fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4" />
          <path d={`M${x} 16 Q${x - 6} ${16 + 8 - i * 2} ${x - 14} ${16 + 4 - i * 1}`} fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}
      {[245, 220, 195].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 16 Q${x + 6} ${16 - 8 + i * 2} ${x + 14} ${16 - 4 + i * 1}`} fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4" />
          <path d={`M${x} 16 Q${x + 6} ${16 + 8 - i * 2} ${x + 14} ${16 + 4 - i * 1}`} fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}
      <circle cx="150" cy="16" r="3" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.4" />
      <circle cx="150" cy="16" r="5" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.7" opacity="0.35" />
    </svg>
  );
}

// ── Corner floral (for contact cards) ─────────────────────────────────────────
export function FloralCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M2 2 Q30 2 58 30" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4" />
      <path d="M2 2 Q2 30 30 58" fill="none" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.8" opacity="0.4" />
      <ellipse cx="18" cy="8" rx="4" ry="7" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.15" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.6" transform="rotate(-30 18 8)" />
      <ellipse cx="8" cy="18" rx="4" ry="7" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.15" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.6" transform="rotate(-60 8 18)" />
      <ellipse cx="32" cy="12" rx="3" ry="5" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.12" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" transform="rotate(-15 32 12)" />
      <ellipse cx="12" cy="32" rx="3" ry="5" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.12" stroke="var(--inv-divider-color, #B8932A)" strokeWidth="0.5" transform="rotate(-75 12 32)" />
      <circle cx="10" cy="10" r="2.5" fill="var(--inv-divider-color, #B8932A)" fillOpacity="0.5" />
    </svg>
  );
}
