import { StoryblokStory } from "@storyblok/react/rsc";
import api from "@/lib/management";
import { notFound } from "next/navigation";

// TBD: change latest to all
export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};

export default async function PostPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: { [key: string]: string | string[] | undefined } }) {
    const { slug } = await params;
    const { secret } = await searchParams;
    
    let query = api.posts().published();

    if (secret) {
        if (secret === process.env.DRAFT_MODE_SECRET) {
            query = query.draft();
        } else {
            notFound();
        }
    }


    const post = await query.slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}