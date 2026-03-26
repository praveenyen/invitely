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
  title: "Invitely — Beautiful Digital Invitations",
  description:
    "Create stunning digital invitations for birthdays, weddings, and anniversaries. Pick a template, personalize it, share a link.",
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
