/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
  },
  experimental: {
    devIndicators: false,
  },
};

module.exports = nextConfig;
