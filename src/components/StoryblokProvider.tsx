"use client";
// https://www.storyblok.com/tp/nextjs-draft-mode-visual-editor
// Should only be used if the secret is correct
// Note: Component Registration is not required on the client side
// import { initStoryblokClient } from "@/lib/storyblok-client";
import type { PropsWithChildren } from "react";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc"


// Q: Does client-side storyblokInit really need a token in order for the
// visual editor to work?
export const initStoryblokClient = () => {
    storyblokInit({
        // accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
        // use: [apiPlugin],
        enableFallbackComponent: true,
    })
};

export default function StoryblokProvider({ children }: PropsWithChildren) {
    initStoryblokClient();
    return children;
}