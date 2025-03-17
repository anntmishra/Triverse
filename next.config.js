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
};

module.exports = nextConfig; 