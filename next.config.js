/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  env: {
    NEXT_PUBLIC_API_HOST: "http://localhost:3000/api",
  },
  images: {
    remotePatterns: [
      {
        hostname: "imgcld.yatra.com",
      },
      {
        hostname: "content.r9cdn.net",
      },
    ],
  },
};

module.exports = nextConfig;
