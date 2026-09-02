import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'www.linkedin.com',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'http',
        hostname: 'niitm.org',
      },
    ],
  },
};

export default nextConfig;
