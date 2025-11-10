import { Post } from '@/components/Post';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

// export const getStoryblokApi = storyblokInit({
//   accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
//   use: [apiPlugin],
//   apiOptions: {
//     region: 'eu',
//   },
// });

export const getStoryblokApi = storyblokInit({
  use: [apiPlugin],
  components: {
    post: Post
  },
  apiOptions: {
    region: 'eu'
  },
  bridge: true,
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN ?? "NONE",
});