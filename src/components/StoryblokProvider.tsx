"use client";
import type { PropsWithChildren } from "react";
import { getStoryblokApi } from "@/lib/storyblok";

export default function StoryblokProvider({ children }: PropsWithChildren) {
    getStoryblokApi();
    return <>{children}</>;
}