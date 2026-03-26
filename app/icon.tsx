import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #8B6914 0%, #C8A030 50%, #8B6914 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Envelope shape */}
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <rect x="0.5" y="0.5" width="19" height="15" rx="2.5" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.6" />
          <polyline points="0,0 10,9 20,0" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.9" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
