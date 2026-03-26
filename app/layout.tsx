import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Invitely — Beautiful Digital Invitations",
    template: "%s",
  },
  description:
    "Create stunning digital invitations for weddings, birthdays, engagements & anniversaries. Personalise and share a beautiful link in minutes.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  openGraph: {
    type: "website",
    siteName: "Invitely",
    title: "Invitely — Beautiful Digital Invitations",
    description:
      "Create stunning digital invitations for weddings, birthdays, engagements & anniversaries. Personalise and share a beautiful link in minutes.",
  },
  twitter: {
    card: "summary",
    title: "Invitely — Beautiful Digital Invitations",
    description:
      "Create stunning digital invitations and share a beautiful link in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
