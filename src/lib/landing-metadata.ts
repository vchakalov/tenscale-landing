import type { Metadata } from "next";

/**
 * The landing's title, description and shared-link card, for /landing,
 * /landing-sp and their colour variants.
 *
 * A page that sets `openGraph` replaces the layout's whole block rather than
 * merging into it, so the site name, type and card are repeated here. Without
 * this a landing link pasted into a chat or a post previewed as the company
 * page: its title, its description and the company card.
 */
const TITLE = "Tenscale: We Automate Your Client Fulfillment In 30 Days";
const DESCRIPTION =
  "For owners of marketing agencies. We install a Meta Ads Automation Engine that handles creative production, campaign setup, testing, optimization and scaling.";
const CARD = {
  url: "/og-landing.png?v=2",
  width: 1200,
  height: 630,
  alt: "We'll Automate Your Client Fulfillment in 30 Days And Make It Better. Or You Don't Pay.",
};

export function landingMetadata(path: string): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: path,
      siteName: "Tenscale",
      type: "website",
      images: [CARD],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [CARD.url],
    },
  };
}
