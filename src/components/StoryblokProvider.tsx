"use client";
import { storyblokInit } from "@storyblok/react";
import type { PropsWithChildren } from "react";
import { components } from "./registry";

storyblokInit({
    components: components,
    bridge: true,
    enableFallbackComponent: true
});

export default function StoryblokProvider({ children }: PropsWithChildren) {
    return <>{children}</>;
}