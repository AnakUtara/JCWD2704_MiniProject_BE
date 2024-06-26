/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-minpro.riady.pw',
        port: '8001',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
