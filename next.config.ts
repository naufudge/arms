import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['green-random-goat-375.mypinata.cloud'], // Add your external hostname here
  },
};

export default nextConfig;
