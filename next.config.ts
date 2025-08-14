import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //     hostname: "example.com",
      // },
      {
        hostname: "localhost",
      },
      {
        hostname: "10.10.16.243",
      },
      {
        hostname: "pika-welcome-cicada.ngrok-free.app",
      },
      {
        hostname: "192.168.29.218",
      },
      {
        hostname: "medgel.vercel.app",
      },
    ],
  },
  // Fix for cross-origin request warning
  allowedDevOrigins: [
    "localhost",
    "10.10.16.243",
    "pika-welcome-cicada.ngrok-free.app",
    "192.168.29.218",
    "medgel.vercel.app",
  ],
};

export default nextConfig;
