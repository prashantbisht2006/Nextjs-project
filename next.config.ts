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
  // experimental:{
  //   ppr:"incremental",
  // },
  devIndicators:{
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  }
};


const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
