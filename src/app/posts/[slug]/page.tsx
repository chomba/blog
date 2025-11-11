import { StoryblokStory } from "@storyblok/react/rsc";
import api from "@/lib/management";

// TBD: change latest to all
export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const post = await api.posts().published().slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}