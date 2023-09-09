/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    domains: ["cdn.imagin.studio"],
  },
};

module.exports = nextConfig;
