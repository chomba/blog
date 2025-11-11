import api from "@/lib/management";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    const posts = (await api.posts().published().latest(100));
    const draftSlugs = posts.map(post => ({ 
        slug: [post.slug, process.env.DRAFT_MODE_SECRET] 
    }));

    const publishedSlugs = posts.map(post => ({ 
        slug: [post.slug, ""] 
    }));

    return [...draftSlugs, ...publishedSlugs];
};

export default async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const [postSlug, secret] = slug;

    let query = api.posts().published();
    
    if (secret) {
        if (secret === process.env.DRAFT_MODE_SECRET) {
            query = query.draft();
        } else {
            notFound();
        }
    }
    
    const post = await query.slug(postSlug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}