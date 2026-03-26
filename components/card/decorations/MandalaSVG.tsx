"use client";

export default function MandalaSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>{`
          .mandala-outer { animation: mandala-spin 80s linear infinite; transform-origin: 200px 200px; }
          .mandala-mid   { animation: mandala-spin 50s linear infinite reverse; transform-origin: 200px 200px; }
          .mandala-inner { animation: mandala-spin 30s linear infinite; transform-origin: 200px 200px; }
          @keyframes mandala-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </defs>

      {/* ── Outermost ring: 16 petals ── */}
      <g className="mandala-outer" opacity="0.18">
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="110"
            rx="8"
            ry="90"
            fill="none"
            stroke="#B8932A"
            strokeWidth="0.8"
            transform={`rotate(${i * 22.5} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="190" fill="none" stroke="#B8932A" strokeWidth="0.6" />
      </g>

      {/* ── Second ring: 12 petals ── */}
      <g className="mandala-mid" opacity="0.22">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="130"
            rx="7"
            ry="70"
            fill="none"
            stroke="#B8932A"
            strokeWidth="0.9"
            transform={`rotate(${i * 30} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="145" fill="none" stroke="#B8932A" strokeWidth="0.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const r = 145;
          return (
            <circle
              key={i}
              cx={200 + r * Math.sin(angle)}
              cy={200 - r * Math.cos(angle)}
              r="3"
              fill="#B8932A"
              opacity="0.5"
            />
          );
        })}
      </g>

      {/* ── Third ring: 8 petals (lotus) ── */}
      <g className="mandala-inner" opacity="0.3">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="148"
            rx="10"
            ry="52"
            fill="#B8932A"
            fillOpacity="0.08"
            stroke="#B8932A"
            strokeWidth="0.8"
            transform={`rotate(${i * 45} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="100" fill="none" stroke="#B8932A" strokeWidth="0.7" />
      </g>

      {/* ── Inner geometric ring: octagon ── */}
      <g opacity="0.35">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const r = 70;
          const nx = 200 + r * Math.sin(angle);
          const ny = 200 - r * Math.cos(angle);
          const nx2 = 200 + r * Math.sin(angle + (45 * Math.PI) / 180);
          const ny2 = 200 - r * Math.cos(angle + (45 * Math.PI) / 180);
          return (
            <line key={i} x1={nx} y1={ny} x2={nx2} y2={ny2} stroke="#B8932A" strokeWidth="0.8" />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="200"
            x2={200 + 70 * Math.sin((i * 45 * Math.PI) / 180)}
            y2={200 - 70 * Math.cos((i * 45 * Math.PI) / 180)}
            stroke="#B8932A"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        <circle cx="200" cy="200" r="70" fill="none" stroke="#B8932A" strokeWidth="0.7" />
      </g>

      {/* ── Inner 8-petal lotus ── */}
      <g opacity="0.4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="168"
            rx="6"
            ry="32"
            fill="#B8932A"
            fillOpacity="0.12"
            stroke="#B8932A"
            strokeWidth="0.8"
            transform={`rotate(${i * 45} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="36" fill="none" stroke="#B8932A" strokeWidth="0.8" />
      </g>

      {/* ── Center ── */}
      <circle cx="200" cy="200" r="14" fill="#B8932A" fillOpacity="0.15" stroke="#B8932A" strokeWidth="1" />
      <circle cx="200" cy="200" r="6" fill="#B8932A" fillOpacity="0.4" />
      <circle cx="200" cy="200" r="2.5" fill="#B8932A" />
    </svg>
  );
}
