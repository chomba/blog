import { draftMode } from "next/headers";
import { User } from "./models";

// TBD: We might want to check when the app is meant to be executed as a SSR-rendered app
export const ownFetch = (input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    // force-cache | no-store
    cache: process.env.NODE_ENV === "development" ? "no-store" : "no-store"
  });
};

export async function resolveVersion(): Promise<StoryVersion> {
    if (process.env.NODE_ENV === "development")
        return "draft";
    const { isEnabled } = await draftMode();
    return isEnabled ? "draft" : "published";
}

export type StoryVersion = "draft" | "published";

export interface AuthContext {
    loggedInUser: User | undefined
}

