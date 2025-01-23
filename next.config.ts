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
        ],
    },
};

export default nextConfig;
