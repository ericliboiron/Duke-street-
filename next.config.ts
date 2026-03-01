import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/duke-street-ventures",
  images: { unoptimized: true },
};

export default nextConfig;
