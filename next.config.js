/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: "pk_test_xeqIPdYS2PpKbHmKG4gJqpde",
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
