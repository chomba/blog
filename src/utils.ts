import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { User } from "./models";

// TBD: We might want to check when the app is meant to be executed as a SSR-rendered app
export const ownFetch = (input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"
  });
};

// export const noStoreFetch = (input: any, init?: any): Promise<Response> => {
//   return fetch(input, {
//     ...init,
//     cache: "no-store"
//   });
// };

export interface AuthContext {
    loggedInUser: User | undefined
}

export type StoryVersion = "draft" | "published";