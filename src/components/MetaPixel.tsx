"use client";

import Script from "next/script";

/**
 * The Meta pixel, started from the values the Worker stamped onto the page.
 *
 * It only runs when a pixel id exists in `window.__ag`, so the site behaves
 * exactly as before until one is configured. The PageView carries the same
 * `eventID` the Worker sent server-side, which is how Meta merges the two
 * copies instead of counting the visit twice.
 */
export function MetaPixel() {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`(function(){
  var ag = window.__ag;
  if (!ag || !ag.pixelId) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', ag.pixelId, { external_id: ag.externalId });
  fbq('track', 'PageView', {}, { eventID: ag.pageViewEventId });
})();`}
    </Script>
  );
}
