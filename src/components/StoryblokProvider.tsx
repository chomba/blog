"use client";
import { ownFetch } from "@/utils";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import type { PropsWithChildren } from "react";
import Post from "./Post";

// Client-Side blok init params only
storyblokInit({
  components: { },
  enableFallbackComponent: true
});

export default function StoryblokProvider({ children }: PropsWithChildren) {
    return <>{children}</>;
}