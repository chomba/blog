import { draftMode } from "next/headers";
import { User } from "./models";

// TBD: We might want to check when the app is meant to be executed as a SSR-rendered app
export const ownFetch = (input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"
  });
};

export async function resolveVersion() {
    const { isEnabled } = await draftMode();
    return isEnabled ? "draft" : "published" as StoryVersion;
}

export type StoryVersion = "draft" | "published";

export interface AuthContext {
    loggedInUser: User | undefined
}

