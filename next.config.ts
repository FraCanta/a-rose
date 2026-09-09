import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a-roseodv.org",
      },
      {
        protocol: "https",
        hostname: "www.a-roseodv.org",
      },
      {
        protocol: "https",
        hostname: "app.greenweb.org",
        pathname: "/api/v3/greencheckimage/**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
