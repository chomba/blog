import { ISbStoryData } from "storyblok-js-client";

export type StoryblokAsset = {
    id: string,
    filename: string
};

export type Post = ISbStoryData<{
    title: string,
    subtitle?: string,
    body: string,
    category: string,
    created_at: string,
    related: string[],
    hero?: StoryblokAsset,
    thumbnail?: StoryblokAsset,
    featured?: boolean
}>;


// Bound to SQLite Table - users(uuid, firstName, lastName, email, secret)
export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}