import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'green-random-goat-375.mypinata.cloud',
        port: '',
        pathname: '/**',
      },
    ],  
  },
};

export default nextConfig;
