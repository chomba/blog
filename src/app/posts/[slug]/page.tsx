import { StoryblokStory } from "@storyblok/react/rsc";
import { resolveVersion } from "@/lib/helpers";
import api from "@/lib/management";
import { getStoryblokApi } from "@/lib/storyblok";

// TBD: change latest to all
export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }>}) {
    const client = getStoryblokApi();
    // const version = await resolveVersion();

    const { slug } = await params;
    // const post = await client.getStory(`posts/${slug}`, {
    //     version: "draft"
    // });
    const post = await api.posts().slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}