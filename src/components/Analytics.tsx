"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

/** Starts PostHog once, after the page is interactive. See lib/analytics.ts. */
export function Analytics() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
