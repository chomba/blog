import { Post } from "@/components/Post";
import { SbReactSDKOptions } from "@storyblok/react";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { access } from "fs";


const opts: SbReactSDKOptions = {
  // accessToken: "xx", // TBD: to have a single storyblokInit function we might want to remove it
  // use: [apiPlugin],
  components: {
    post: Post
  },
  // apiOptions: {
  //   region: 'eu',
  // },
};

if (typeof window === 'undefined') {
  console.log(">>>> running on the server:")
  console.log(process.env.STORYBLOK_PREVIEW_TOKEN);
  opts.accessToken = process.env.STORYBLOK_PREVIEW_TOKEN;
  opts.use = [apiPlugin];
  opts.apiOptions =  {
    region: 'eu',
  };
}

export const storyblokApi = storyblokInit(opts);

// storyblokInit({
//   accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
//   use: [apiPlugin],
//   apiOptions: {
//     region: 'eu',
//     fetch: ownFetch
//   }
// });