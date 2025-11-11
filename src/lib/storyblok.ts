"use server"
import { Post } from '@/components/Post';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

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
