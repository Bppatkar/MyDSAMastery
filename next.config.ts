import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    
  // Images bahar se bhi load ho sake
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Monaco editor ke liye webpack config (Day 5 me expand hoga)
  webpack: (config, { isServer }) => {
    // Server side pe Monaco mat load karo
    if (isServer) {
      config.externals = [...(config.externals || []), 'monaco-editor'];
    }
    return config;
  },
};

export default nextConfig;