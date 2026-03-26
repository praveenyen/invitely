"use client";

// ── Indian Bride SVG ───────────────────────────────────────────────────────────
export function BrideSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>{`
          .bride-float { animation: bride-float 4s ease-in-out infinite; transform-origin: 60px 130px; }
          @keyframes bride-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        `}</style>
        <radialGradient id="bride-skin" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#F5C9A0" />
          <stop offset="100%" stopColor="#E8A87C" />
        </radialGradient>
        <linearGradient id="bride-lehenga" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B1A2A" />
          <stop offset="50%" stopColor="#A0253A" />
          <stop offset="100%" stopColor="#6B1020" />
        </linearGradient>
        <linearGradient id="bride-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A951" />
          <stop offset="100%" stopColor="#E8C97A" />
        </linearGradient>
        <linearGradient id="bride-dupatta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C0394A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9B1A2A" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <g className="bride-float">
        {/* ── Dupatta (veil) flowing behind ── */}
        <path d="M30 60 Q10 90 15 160 Q18 190 25 220" fill="url(#bride-dupatta)" stroke="#A0253A" strokeWidth="0.5" />

        {/* ── Lehenga (skirt) ── */}
        <path d="M38 120 Q10 140 5 220 Q40 240 60 242 Q80 240 115 220 Q110 140 82 120 Z" fill="url(#bride-lehenga)" />
        {/* Gold border at hem */}
        <path d="M5 218 Q40 238 60 240 Q80 238 115 218" fill="none" stroke="url(#bride-gold)" strokeWidth="3" />
        {/* Lehenga pattern dots */}
        {[
          [25, 165], [45, 155], [65, 150], [85, 155], [100, 165],
          [20, 185], [40, 178], [60, 175], [80, 178], [100, 185],
          [30, 200], [55, 195], [75, 196], [95, 200],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="#C8A951" fillOpacity="0.6" />
        ))}

        {/* ── Choli (blouse) ── */}
        <path d="M38 88 Q38 120 38 120 L82 120 Q82 120 82 88 Q70 82 60 82 Q50 82 38 88 Z" fill="#7A1525" />
        {/* Gold trim on choli */}
        <path d="M38 88 Q50 84 60 84 Q70 84 82 88" fill="none" stroke="url(#bride-gold)" strokeWidth="1.5" />
        <path d="M38 120 L82 120" stroke="url(#bride-gold)" strokeWidth="1.5" />

        {/* ── Left arm ── */}
        <path d="M38 92 Q22 105 20 125 Q22 132 28 130 Q32 110 40 100" fill="url(#bride-skin)" stroke="#D4956A" strokeWidth="0.5" />
        {/* Bangles left */}
        {[118, 123, 128].map((y, i) => (
          <ellipse key={i} cx="25" cy={y} rx="5" ry="2" fill="none" stroke={i === 1 ? "#C8A951" : "#8B1A2A"} strokeWidth="1.5" />
        ))}
        {/* Flowers in left hand */}
        <circle cx="20" cy="132" r="6" fill="#FADDE1" stroke="#E8A0A8" strokeWidth="0.5" />
        <circle cx="20" cy="132" r="3" fill="#F9B8C0" />
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={20 + 5 * Math.cos((a * Math.PI) / 180)} cy={132 + 5 * Math.sin((a * Math.PI) / 180)} rx="2.5" ry="1.8" fill="#FADDE1" stroke="#E8A0A8" strokeWidth="0.3" transform={`rotate(${a} ${20 + 5 * Math.cos((a * Math.PI) / 180)} ${132 + 5 * Math.sin((a * Math.PI) / 180)})`} />
        ))}

        {/* ── Right arm ── */}
        <path d="M82 92 Q98 105 100 125 Q98 132 92 130 Q88 110 80 100" fill="url(#bride-skin)" stroke="#D4956A" strokeWidth="0.5" />
        {/* Bangles right */}
        {[118, 123, 128].map((y, i) => (
          <ellipse key={i} cx="95" cy={y} rx="5" ry="2" fill="none" stroke={i === 1 ? "#C8A951" : "#8B1A2A"} strokeWidth="1.5" />
        ))}

        {/* ── Neck & face ── */}
        <rect x="53" y="70" width="14" height="18" rx="5" fill="url(#bride-skin)" />
        {/* Necklace */}
        <path d="M50 84 Q60 90 70 84" fill="none" stroke="#C8A951" strokeWidth="1.2" />
        {[0.3, 0.5, 0.7].map((t, i) => {
          const x = 50 + t * 20;
          const y = 84 + 4 * Math.sin(t * Math.PI);
          return <circle key={i} cx={x} cy={y} r="1.5" fill="#C8A951" />;
        })}

        {/* ── Head / face ── */}
        <ellipse cx="60" cy="55" rx="20" ry="22" fill="url(#bride-skin)" stroke="#D4956A" strokeWidth="0.4" />
        {/* Hair */}
        <path d="M40 48 Q42 28 60 26 Q78 28 80 48 Q74 36 60 34 Q46 36 40 48 Z" fill="#2C1810" />
        {/* Hair bun */}
        <ellipse cx="60" cy="30" rx="12" ry="8" fill="#2C1810" />
        {/* Maang tikka */}
        <line x1="60" y1="30" x2="60" y2="40" stroke="#C8A951" strokeWidth="1" />
        <circle cx="60" cy="42" r="3" fill="#C8A951" />
        <circle cx="60" cy="42" r="1.5" fill="#E8343A" />
        {/* Jhumkas (earrings) */}
        <circle cx="40" cy="57" r="3" fill="#C8A951" />
        <path d="M40 60 Q36 66 40 70" fill="none" stroke="#C8A951" strokeWidth="1" />
        <ellipse cx="40" cy="71" rx="3" ry="4" fill="#C8A951" />
        <circle cx="80" cy="57" r="3" fill="#C8A951" />
        <path d="M80 60 Q84 66 80 70" fill="none" stroke="#C8A951" strokeWidth="1" />
        <ellipse cx="80" cy="71" rx="3" ry="4" fill="#C8A951" />
        {/* Eyes */}
        <ellipse cx="53" cy="54" rx="4" ry="3" fill="white" />
        <circle cx="54" cy="54" r="2" fill="#2C1810" />
        <circle cx="54.8" cy="53.2" r="0.7" fill="white" />
        <ellipse cx="67" cy="54" rx="4" ry="3" fill="white" />
        <circle cx="66" cy="54" r="2" fill="#2C1810" />
        <circle cx="66.8" cy="53.2" r="0.7" fill="white" />
        {/* Eyebrows */}
        <path d="M49 50 Q53 48 57 49" fill="none" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M63 49 Q67 48 71 50" fill="none" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round" />
        {/* Nose */}
        <circle cx="60" cy="58" r="1" fill="#D4956A" />
        {/* Nose ring */}
        <circle cx="57.5" cy="58" r="1.5" fill="none" stroke="#C8A951" strokeWidth="0.8" />
        {/* Lips */}
        <path d="M55 63 Q60 66 65 63" fill="#C0394A" stroke="#A0253A" strokeWidth="0.5" />
        <path d="M55 63 Q60 61 65 63" fill="#D4485A" stroke="none" />
        {/* Bindi */}
        <circle cx="60" cy="48" r="2" fill="#E8343A" />

        {/* ── Dupatta over head ── */}
        <path d="M38 34 Q60 22 82 34 Q80 55 80 70" fill="url(#bride-dupatta)" opacity="0.6" />
      </g>
    </svg>
  );
}

// ── Indian Groom SVG ───────────────────────────────────────────────────────────
export function GroomSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>{`
          .groom-float { animation: groom-float 4s ease-in-out infinite; transform-origin: 60px 130px; animation-delay: 0.5s; }
          @keyframes groom-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        `}</style>
        <radialGradient id="groom-skin" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#E8C090" />
          <stop offset="100%" stopColor="#D4956A" />
        </radialGradient>
        <linearGradient id="groom-sherwani" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5EDD8" />
          <stop offset="50%" stopColor="#EDE0C4" />
          <stop offset="100%" stopColor="#DDD0B0" />
        </linearGradient>
        <linearGradient id="groom-churidar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EDE0C4" />
          <stop offset="100%" stopColor="#D8CBA8" />
        </linearGradient>
        <linearGradient id="groom-pagdi" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B1A2A" />
          <stop offset="100%" stopColor="#6B1020" />
        </linearGradient>
      </defs>

      <g className="groom-float">
        {/* ── Churidar (pants) ── */}
        <path d="M42 160 Q38 200 36 242 L52 242 Q54 200 60 175 Q66 200 68 242 L84 242 Q82 200 78 160 Z" fill="url(#groom-churidar)" />
        {/* Gold trim at ankles */}
        <path d="M36 238 L52 238" stroke="#C8A951" strokeWidth="1.5" />
        <path d="M68 238 L84 238" stroke="#C8A951" strokeWidth="1.5" />
        {/* Shoes */}
        <ellipse cx="44" cy="244" rx="10" ry="4" fill="#3D2B1F" />
        <ellipse cx="76" cy="244" rx="10" ry="4" fill="#3D2B1F" />

        {/* ── Sherwani (long coat) ── */}
        <path d="M30 90 Q25 130 24 160 Q40 165 60 164 Q80 165 96 160 Q95 130 90 90 Q75 84 60 84 Q45 84 30 90 Z" fill="url(#groom-sherwani)" />
        {/* Gold buttons */}
        {[100, 115, 130, 145].map((y, i) => (
          <circle key={i} cx="60" cy={y} r="2" fill="#C8A951" />
        ))}
        {/* Gold border / trim */}
        <path d="M30 90 Q45 86 60 86 Q75 86 90 90" fill="none" stroke="#C8A951" strokeWidth="1.5" />
        <path d="M24 160 Q40 164 60 164 Q80 164 96 160" fill="none" stroke="#C8A951" strokeWidth="1.5" />
        {/* Center opening */}
        <line x1="60" y1="90" x2="60" y2="164" stroke="#C8A951" strokeWidth="0.8" opacity="0.5" />
        {/* Pattern on sherwani */}
        {[
          [40, 110], [42, 130], [44, 150],
          [80, 110], [78, 130], [76, 150],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill="#C8A951" fillOpacity="0.4" />
        ))}

        {/* ── Left arm ── */}
        <path d="M30 94 Q16 110 14 135 Q16 142 22 140 Q26 118 35 102" fill="url(#groom-sherwani)" stroke="#C8A951" strokeWidth="0.5" />
        {/* Cuff */}
        <ellipse cx="18" cy="138" rx="6" ry="2.5" fill="none" stroke="#C8A951" strokeWidth="1.2" />
        {/* Hand */}
        <ellipse cx="18" cy="143" rx="5" ry="7" fill="url(#groom-skin)" />

        {/* ── Right arm ── */}
        <path d="M90 94 Q104 110 106 135 Q104 142 98 140 Q94 118 85 102" fill="url(#groom-sherwani)" stroke="#C8A951" strokeWidth="0.5" />
        {/* Cuff */}
        <ellipse cx="102" cy="138" rx="6" ry="2.5" fill="none" stroke="#C8A951" strokeWidth="1.2" />
        {/* Hand */}
        <ellipse cx="102" cy="143" rx="5" ry="7" fill="url(#groom-skin)" />

        {/* ── Neck ── */}
        <rect x="53" y="72" width="14" height="16" rx="5" fill="url(#groom-skin)" />

        {/* ── Head / face ── */}
        <ellipse cx="60" cy="54" rx="20" ry="22" fill="url(#groom-skin)" stroke="#C4855A" strokeWidth="0.4" />
        {/* Hair (short) */}
        <path d="M40 46 Q42 30 60 28 Q78 30 80 46 Q74 36 60 34 Q46 36 40 46 Z" fill="#2C1810" />
        {/* Sideburns */}
        <path d="M40 48 Q38 54 40 60" fill="none" stroke="#2C1810" strokeWidth="2" />
        <path d="M80 48 Q82 54 80 60" fill="none" stroke="#2C1810" strokeWidth="2" />
        {/* Eyes */}
        <ellipse cx="52" cy="54" rx="4.5" ry="3.5" fill="white" />
        <circle cx="53" cy="54" r="2.2" fill="#2C1810" />
        <circle cx="53.8" cy="53.2" r="0.8" fill="white" />
        <ellipse cx="68" cy="54" rx="4.5" ry="3.5" fill="white" />
        <circle cx="67" cy="54" r="2.2" fill="#2C1810" />
        <circle cx="67.8" cy="53.2" r="0.8" fill="white" />
        {/* Eyebrows */}
        <path d="M47 49 Q52 47 57 48" fill="none" stroke="#2C1810" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M63 48 Q68 47 73 49" fill="none" stroke="#2C1810" strokeWidth="1.4" strokeLinecap="round" />
        {/* Nose */}
        <path d="M58 56 Q60 62 62 56" fill="none" stroke="#C4855A" strokeWidth="0.8" />
        {/* Lips */}
        <path d="M54 65 Q60 68 66 65" fill="#B07050" stroke="#8B5038" strokeWidth="0.4" />
        <path d="M54 65 Q60 63 66 65" fill="#C08060" stroke="none" />
        {/* Moustache */}
        <path d="M53 62 Q56 60 60 61 Q64 60 67 62" fill="#2C1810" />

        {/* ── Pagdi (turban) ── */}
        {/* Base */}
        <ellipse cx="60" cy="36" rx="22" ry="10" fill="url(#groom-pagdi)" />
        {/* Layers/folds */}
        <path d="M38 36 Q60 28 82 36" fill="none" stroke="#A0253A" strokeWidth="1" opacity="0.5" />
        <path d="M40 32 Q60 24 80 32" fill="#9B2030" stroke="#7A1020" strokeWidth="0.5" />
        <path d="M42 28 Q60 20 78 28" fill="#8B1A2A" stroke="#6B1020" strokeWidth="0.5" />
        {/* Top fold */}
        <ellipse cx="60" cy="24" rx="14" ry="6" fill="#8B1A2A" />
        <path d="M46 24 Q60 18 74 24" fill="#A0253A" opacity="0.5" />
        {/* Brooch on pagdi */}
        <circle cx="60" cy="30" r="4" fill="#C8A951" />
        <circle cx="60" cy="30" r="2.5" fill="#E8C060" />
        <circle cx="60" cy="30" r="1.2" fill="#C8A951" />
        {/* Fan/spread at front */}
        <path d="M50 22 Q60 14 70 22" fill="url(#groom-pagdi)" stroke="#A0253A" strokeWidth="0.5" />
        {/* Kalgi (feather ornament) */}
        <path d="M74 20 Q82 10 78 4 Q76 2 74 6 Q72 10 74 20" fill="#C8A951" />
        <path d="M74 20 Q80 8 76 2" fill="none" stroke="#E8C060" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
