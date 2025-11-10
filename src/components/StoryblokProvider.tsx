"use client";
import { storyblokApi } from "@/api/storyblok";
import type { PropsWithChildren } from "react";

export default function StoryblokProvider({ children }: PropsWithChildren) {
    storyblokApi();
    return <>{children}</>;
}