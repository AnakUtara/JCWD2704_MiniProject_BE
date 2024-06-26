/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-minpro.riady.pw",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
