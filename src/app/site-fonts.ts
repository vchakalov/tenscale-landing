import localFont from "next/font/local";

/**
 * Geist and Gelica, preloaded on the home page, which is drawn in them: its
 * headline is the largest thing on a phone's first screen, and without a
 * preload the browser found these files only after the stylesheet, last of
 * everything. The root layout keeps a copy without a preload for the other
 * pages that use the pair.
 *
 * Put `siteFonts` and `site-fonts` on the page's outermost element; the class
 * points every family the page and its booking dialog ask for at these two.
 */
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

export const siteFonts = `${geistSans.variable} ${gelica.variable}`;
