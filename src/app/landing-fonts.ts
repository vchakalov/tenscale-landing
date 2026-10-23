import { Inter, Libre_Baskerville, PT_Serif, Poppins } from "next/font/google";

/**
 * Eleven Cloud's pairing, preloaded only on the pages that draw it: the
 * landings, the thank-you pages, /privacy and /v2. Each of those puts
 * `landingFonts` on its `.ec-landing` wrapper.
 *
 * The root layout declares the same four without a preload, so the variables
 * exist everywhere; this copy's preloaded files take over inside the wrapper.
 * Declared in the root layout with a preload, they went out on every route,
 * the home page included, where six files the page never drew competed with
 * the two it does.
 */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "700"], adjustFontFallback: false });
const libreBaskerville = Libre_Baskerville({ variable: "--font-libre-baskerville", subsets: ["latin"], weight: ["700"], adjustFontFallback: false });
const ptSerif = PT_Serif({ variable: "--font-pt-serif", subsets: ["latin"], weight: ["400", "700"], adjustFontFallback: false });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "700"], adjustFontFallback: false });

export const landingFonts = `${inter.variable} ${libreBaskerville.variable} ${ptSerif.variable} ${poppins.variable}`;
