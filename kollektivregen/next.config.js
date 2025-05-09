/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'unsplash.com', "example.com"]
  },
  experimental: {
    devIndicators: false,
  },
};

module.exports = nextConfig;
