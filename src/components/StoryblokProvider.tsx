"use client";
import { storyblokApi } from "@/api/storyblok";
import { storyblokInit } from "@storyblok/react";
import type { PropsWithChildren } from "react";
import { components } from "./registry";

storyblokInit({
    components: components,
    bridge: true
});

export default function StoryblokProvider({ children }: PropsWithChildren) {
    return <>{children}</>;
}