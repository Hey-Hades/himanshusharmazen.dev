import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qdgogxyvkshzylypqqcr.supabase.co", 
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;