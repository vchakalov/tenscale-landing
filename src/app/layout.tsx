import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Agentica landing — premium light Ramp-style type system
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Agentica — Personalized AI funnels for Meta ads",
  description:
    "Agentica builds a personalized AI funnel for every angle and audience — winning creatives, message-matched landing pages, and 24/7 ad automation. Scale horizontally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Alias legacy jace var names to the new families so in-flight components keep rendering.
  const fontVars = `${jakarta.variable} ${jetbrainsMono.variable}`;
  return (
    <html
      lang="en"
      className={fontVars}
      style={
        {
          // legacy aliases used by section markup during the rebrand
          ["--font-geist-sans" as string]: "var(--font-jakarta)",
          ["--font-gelica" as string]: "var(--font-jakarta)",
        } as React.CSSProperties
      }
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
