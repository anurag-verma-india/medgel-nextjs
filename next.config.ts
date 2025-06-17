// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     /* config options here */
//     logging: {
//         fetches: {
//             fullUrl: true,
//         },
//     },
//     reactStrictMode: true,
//     images: {
//         remotePatterns: [
//             // {
//             //     hostname: "example.com",
//             // },
//             {
//                 hostname: "localhost",
//             },
//         ],
//     },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   logging: {
//     fetches: {
//       fullUrl: true,
//     },
//   },
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       // {
//       //     hostname: "example.com",
//       // },
//       {
//         hostname: "localhost",
//       },
//     ],
//   },
//   // Fix for cross-origin request warning
//   allowedDevOrigins: ["10.10.16.243"],
// };

// export default nextConfig;

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
    ],
  },
  // Fix for cross-origin request warning
  experimental: {
    allowedDevOrigins: ["10.10.16.243"],
  },
};

export default nextConfig;
