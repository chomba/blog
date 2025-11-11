import api from "@/lib/management";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export default async function PostPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { slug } = await params;
    const { secret } = await searchParams;

    if (!secret || secret !== process.env.DRAFT_MODE_SECRET)
        notFound();
    const post = await api.posts().draft().slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}
