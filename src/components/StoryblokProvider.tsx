"use client";
import { storyblokInit } from "@storyblok/react";
import type { PropsWithChildren } from "react";
import { components } from "./registry";

const x = storyblokInit({
    components: components,
    bridge: true,
    enableFallbackComponent: true
});

export default function StoryblokProvider({ children }: PropsWithChildren) {
    const m = x();
    return <>{children}</>;
}