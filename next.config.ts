import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: "/bookends-luxury",
  assetPrefix: "/bookends-luxury/"
};

export default nextConfig;
