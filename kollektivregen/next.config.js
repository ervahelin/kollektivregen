/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imagedelivery.net'], 
  },
  experimental: {
    devIndicators: false,
  },
};

module.exports = nextConfig;
