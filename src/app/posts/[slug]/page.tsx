import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import api from "@/api";
import { AuthContext } from "@/utils";

// TBD: change latest to all
export const generateStaticParams = async () => {
    return (await api.posts().published().latest(100)).map(post => ({ slug: post.slug }));
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }>}) {
    let ctx: AuthContext = {
        loggedInUser: {
            firstName: "Jhon",
            lastName: "Smith",
            email: "jhon@smith.com",
            id: "x-x-x-x-1"
        }
    };
    // const client = getStoryblokApi();
    // check if draft mode is enabled
    const { slug } = await params;
    const post = await api.posts().slug(slug);
    return <StoryblokStory story={post} slug={post.full_slug} />;
}