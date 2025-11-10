import { StoryblokStory, useStoryblokBridge } from "@storyblok/react/rsc";
import { resolveVersion } from "@/api/helpers";
import api from "@/api/management";
// import { getStoryblokApi } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/layout";

// TBD: change latest to all
export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }>}) {
    const client = getStoryblokApi();
    const version = await resolveVersion();

    const { slug } = await params;
    const post = await client.getStory(`posts/${slug}`, {
        version: version
    });
    // const post = useStoryblok(`posts/${slug}`, {
    //     version: version
    // });
    // const post = await api.posts().slug(slug);
    return <StoryblokStory story={post.data.story} slug={post.data.story.full_slug} />;
}