import type { NextConfig } from "next";
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
      
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
