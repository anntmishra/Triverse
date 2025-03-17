/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // Disable webpack caching in development mode to fix Fast Refresh issues
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // Add image optimization config
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV !== "production",
  },
  // Add trailing slash configuration for consistency
  trailingSlash: false,
  // Fix potential static file serving issues
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : undefined,
  // Disable ESLint completely during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
