import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Libre_Baskerville, PT_Serif, Poppins } from "next/font/google";
import "./globals.css";

// Eleven Cloud's pairing, used by the `.ec-landing` page only.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  adjustFontFallback: false,
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["700"],
  adjustFontFallback: false,
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  adjustFontFallback: false,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  adjustFontFallback: false,
});

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
  title: "Agentica: Personalized AI funnels for Meta ads",
  description:
    "Agentica builds a personalized AI funnel for every angle and audience: winning creatives, message-matched landing pages, and 24/7 ad automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${gelica.variable} ${inter.variable} ${libreBaskerville.variable} ${ptSerif.variable} ${poppins.variable} antialiased`}
    >
      <head>
        {/* The booking widget lives on another origin. Opening the connection
            here means a click pays for the iframe only, not for DNS and TLS. */}
        <link rel="preconnect" href="https://app.iclosed.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.iclosed.io" />
      </head>
      <body>{children}</body>
    </html>
  );
}
