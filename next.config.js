/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // <--- ⛔ Ignore les erreurs TS au build
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
