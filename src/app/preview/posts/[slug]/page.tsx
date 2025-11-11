import api from "@/lib/management";
import { StoryblokStory } from "@storyblok/react/rsc";
// import { getStoryblokApi } from "@/lib/storyblok";

export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};
export default async function PreviewPostPage({ params }: { params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const post = await api.posts().draft().slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}