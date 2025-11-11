import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/preview/:secret/posts/:slug',
        destination: '/posts/:slug?secret=:secret'
      }
    ]
  },
};

export default nextConfig;
