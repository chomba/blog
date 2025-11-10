import { StoryblokServerComponent, StoryblokStory } from "@storyblok/react/rsc";
import { resolveVersion } from "@/lib/helpers";
import { getStoryblokApi } from "@/lib/storyblok";

export default async function PostPage({ params }: { params: Promise<{ slug: string }>}) {
    const client = getStoryblokApi();
    const version = await resolveVersion();

    const { slug } = await params;
    const post = await client.getStory(`posts/${slug}`, {
        version: version
    });
    // const post = await api.posts().slug(slug);
    return <StoryblokStory story={post.data.story} slug={post.data.story.full_slug} />;
}