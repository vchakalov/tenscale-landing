import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// jace's type pairing, self-hosted: Geist (body) + Gelica (serif display)
const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [{ path: "./fonts/Geist_Variable.woff2", weight: "100 900", style: "normal" }],
});

const gelica = localFont({
  variable: "--font-gelica",
  display: "swap",
  src: [
    { path: "./fonts/Gelica_Light.woff2", weight: "300 400", style: "normal" },
    { path: "./fonts/Gelica_Medium.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Agentica — Personalized AI funnels for Meta ads",
  description:
    "Agentica builds a personalized AI funnel for every angle and audience — winning creatives, message-matched landing pages, and 24/7 ad automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${gelica.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
