import type { NextConfig } from "next";

// For a user site (mahmoudkchouk.github.io) leave NEXT_PUBLIC_BASE_PATH empty.
// For a project site (e.g. /portfolio) set NEXT_PUBLIC_BASE_PATH=/portfolio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { globalNotFound: true },
};

export default nextConfig;
