import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Storyblok Visual Editor URL doesn't support variables  
   * it can only append the slug so we're using a rewrite to map the secret
   */
  async rewrites() {
    return [
      {
        source: '/draft/:secret/posts/:slug',
        destination: '/draft/posts/:slug?secret=:secret'
      }
    ]
  },
};

export default nextConfig;
