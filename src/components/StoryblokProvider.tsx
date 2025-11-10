"use client";
import { initStoryblokClient } from "@/lib/storyblok-client";
import type { PropsWithChildren } from "react";

// const isVisualEditor =
//   window.self !== window.top &&
//   window.location.search.includes("_storyblok");

export default function StoryblokProvider({ children }: PropsWithChildren) {
    initStoryblokClient();
    return children;
}