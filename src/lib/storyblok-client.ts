// https://www.storyblok.com/tp/nextjs-draft-mode-visual-editor
// Should only be used if the secret is correct
// Note: Component Registration is not required on the client side

"use client"
import { apiPlugin, storyblokInit } from "@storyblok/react"

export const initStoryblokClient = () => {
    storyblokInit({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
        use: [apiPlugin],
        enableFallbackComponent: true,
    })
};