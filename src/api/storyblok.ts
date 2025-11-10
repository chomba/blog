import { Post } from "@/components/Post";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const storyblokApi = storyblokInit({
  accessToken: "xx", // TBD: to have a single storyblokInit function we might want to remove it
  use: [apiPlugin],
  components: {
    post: Post
  },
  apiOptions: {
    region: 'eu',
  },
});

// storyblokInit({
//   accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
//   use: [apiPlugin],
//   apiOptions: {
//     region: 'eu',
//     fetch: ownFetch
//   }
// });