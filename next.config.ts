import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: { ...config.resolve?.fallback, fs: false, path: false },
      };
    }
    return config;
  },
};

export default nextConfig;
