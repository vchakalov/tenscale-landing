import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export into out/, served by the Cloudflare Worker (wrangler.jsonc).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
