/**
 * The results the headline reel turns through, three, chosen by Ben on
 * 2026-10-23. Two are directions rather than numbers; the one number, 10×,
 * is one agency's ads live (190 to 1,900) on the proof wall.
 *
 * A plain module, not the reel's own file: the hero is rendered on the
 * server and reads this list for screen readers, and a client component's
 * exports reach the server only as references, not values.
 */
export const RESULTS = ["More Conversions.", "Lower CPAs.", "10× More Ads."];
