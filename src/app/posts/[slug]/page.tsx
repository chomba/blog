import { StoryblokStory, useStoryblokBridge } from "@storyblok/react/rsc";
// import { storyblokApi } from "@/api/storyblok";
import { resolveVersion } from "@/api/helpers";
import api from "@/api/management";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { useStoryblokApi } from "@storyblok/react";

// TBD: change latest to all
export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }>}) {
    const client = useStoryblokApi();
    const version = await resolveVersion();

    const { slug } = await params;
    const post = await client.getStory(`posts/${slug}`, {
        version: version
    });
    // const post = await api.posts().slug(slug);
    return <StoryblokStory story={post.data.story} slug={post.data.story.full_slug} />;
}