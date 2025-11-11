"use server"

import { Post } from '@/components/Post';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

// Evaluate if moving it to the layout file is a better option
// Component registration is required here

const initStoryblokClientOnServer = () => {
  return storyblokInit({
    use: [apiPlugin],
    components: {
      post: Post
    },
    apiOptions: {
      region: 'eu'
    },
    bridge: true,
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
  });
}

export { initStoryblokClientOnServer }

// export const getStoryblokApi = 