import api from "@/lib/management";
import { StoryblokStory } from "@storyblok/react/rsc";
import { resolveVersion } from "@/lib/helpers";
import { initStoryblokClient } from "@/lib/storyblok-client";
import { draftMode } from "next/headers";
import { getStoryblokApi } from "@/lib/storyblok";

export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};
export default async function PreviewPostPage({ params }: { params: Promise<{ slug: string }>}) {
    // const draft = await draftMode();
    // draft.enable();
    
    const client = getStoryblokApi();
    // const client = initStoryblokClient();
    

    const { slug } = await params;
    // const post = await client.getStory(`posts/${slug}`, {
    //     version: "draft"
    // });
    const post = await api.posts().slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}