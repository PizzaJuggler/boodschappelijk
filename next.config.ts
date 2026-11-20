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
        hostname: "www.jumbo.com",
      },
      {
        protocol: "https",
        hostname: "static.ah.nl",
      },
      {
        protocol: "https",
        hostname: "static.hoogvliet.nl",
      },
      {
        protocol: "https",
        hostname: "www.prijsprofeet.nl",
      },
      {
        protocol: "https",
        hostname: "web-fileserver.dirk.nl",
      },
      {
        protocol: "https",
        hostname: "web-fileserver.dekamarkt.nl",
      },
      {
        protocol: "https",
        hostname: "www.lidl.nl",
      },
      {
        protocol: "https",
        hostname: "s7g10.scene7.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "images.poiesz-supermarkten.nl",
      },
    ],
  },
  rewrites: () => [
    {
      source: "/price-prophet/:path*",
      destination: "https://www.prijsprofeet.nl/:path*",
    },
  ],
  redirects: () => [
    {
      source: "/",
      destination: "/search",
      permanent: false,
    },
  ],
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
