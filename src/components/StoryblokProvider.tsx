"use client";
import { storyblokInit } from "@storyblok/react";
import type { PropsWithChildren } from "react";
import { components } from "./registry";
import { getStoryblokApi } from "@/lib/storyblok";

// const x = storyblokInit({
//     components: components,
//     bridge: true,
//     enableFallbackComponent: true
// });

export default function StoryblokProvider({ children }: PropsWithChildren) {
    getStoryblokApi();
    return <>{children}</>;
}