import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jumbo.com"
      },
      {
        protocol: "https",
        hostname: "www.ah.nl"
      }
    ]
  },
  rewrites: () => [
    {
      source: "/price-prophet/:path*",
      destination: "https://www.prijsprofeet.nl/:path*"
    }
  ],
  redirects: () => ([
    {
      source: '/',
      destination: "/search",
      permanent: false
    }
  ]),
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
