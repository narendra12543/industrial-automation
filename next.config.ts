import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/products/automatic-sliding-gate",
        destination: "/products/motorized-sliding-gate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;