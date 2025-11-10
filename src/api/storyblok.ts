import { Post } from "@/components/Post";
import { SbReactSDKOptions } from "@storyblok/react";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { resolveVersion } from "./helpers";

// For Server-side use only
// const opts: SbReactSDKOptions = {
//   use: [apiPlugin],
//   components: {
//     post: Post
//   },
//   apiOptions: {
//     region: 'eu',
//   },
//   bridge: true
// };

// console.log(">>>> running on the server:")  
// const version = await resolveVersion();
// opts.accessToken = version === "draft" ? process.env.STORYBLOK_PREVIEW_TOKEN : process.env.STORYBLOK_PUBLIC_TOKEN;
// export const storyblokApi = storyblokInit(opts);