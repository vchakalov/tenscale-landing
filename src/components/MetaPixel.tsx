"use client";

import Script from "next/script";

/**
 * The Meta pixel, started from the values the Worker stamped onto the page.
 *
 * It runs only when the Worker says this visitor may be reported (`ag.report`):
 * a real person who came from Meta, not our team (worker/audience.ts). Anyone
 * else never loads Meta's script at all.
 *
 * The PageView goes out twice with one `eventID`: to the pixel, and through
 * our own /booking/prep to the Conversions API, so it still arrives when an ad
 * blocker stops the pixel, and Meta keeps one copy. Sending it from here, once
 * the page's script runs, is what keeps scanners that only download the HTML
 * out of the dataset. The external id is the hash the server also sends, so
 * both copies name the same visitor.
 *
 * `autoConfig` off: the pixel would otherwise report button clicks and page
 * metadata it finds by itself. The dataset holds the events we chose, nothing
 * else.
 */
export function MetaPixel() {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`(function(){
  var ag = window.__ag;
  if (!ag || !ag.pixelId || !ag.report) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('set', 'autoConfig', false, ag.pixelId);
  fbq('init', ag.pixelId, { external_id: ag.externalIdHash });
  fbq('track', 'PageView', {}, { eventID: ag.pageViewEventId });
  try {
    var body = JSON.stringify({ event_name: 'PageView', event_id: ag.pageViewEventId, params: {}, url: location.href });
    if (!(navigator.sendBeacon && navigator.sendBeacon('/booking/prep', body))) {
      fetch('/booking/prep', { method: 'POST', body: body, keepalive: true }).catch(function(){});
    }
  } catch (e) {}
})();`}
    </Script>
  );
}
