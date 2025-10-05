import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'valorbetxxl.top',
        port: '',
        pathname: '/cdn-cgi/imagedelivery/**',
      },
    ],
  },
};

export default nextConfig;
