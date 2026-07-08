import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → deployable to GitHub Pages (served at the tenscale.ai root).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
