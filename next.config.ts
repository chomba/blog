import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Storyblok Visual Editor URL doesn't support variables  
   * it can only append the slug so we're using a rewrite to map the secret
   */
  async rewrites() {
    return [
      {
        source: '/preview/:secret/posts/:slug',
        destination: '/posts/:slug/:secret'
      }
    ]
  },
};

export default nextConfig;
