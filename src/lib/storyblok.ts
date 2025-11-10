import { Post } from '@/components/Post';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

// Evaluate if moving it to the layout file is a better option
// Component registration is required here
export const getStoryblokApi = storyblokInit({
  use: [apiPlugin],
  components: {
    post: Post
  },
  apiOptions: {
    region: 'eu'
  },
  bridge: true,
  accessToken: process.env.NODE_ENV == "production" ? process.env.STORYBLOK_PUBLIC_TOKEN : process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
});