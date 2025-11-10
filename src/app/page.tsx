import api from "@/api";
import { LatestPosts } from "@/components/LatestPosts";
import { storyblokApi } from "@/api/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

export default async function HomePage() {
  storyblokApi(); // registers the components

  const veryLatest = await api.posts().veryLatest();
  if (!veryLatest) {
    console.log("not found");
    return; // Perhaps display No posts have been published yet page
  }
  
  console.log(`very latest ID = ${veryLatest.id}`);
  const featured = await getFeatured();
  const boardCapacity = 7;
  let boardPosts = [];

  if (featured.length < boardCapacity) {
    const excludedIds = [veryLatest.id, ...featured.map(post => post.id)];
    const latest = await api.posts().excludeID(excludedIds).latest(boardCapacity - featured.length);
    boardPosts = [...featured, ...latest];
  } else {
    boardPosts = featured;
  }
  return (
    <section>
      <StoryblokStory story={veryLatest} preview={true} slug={veryLatest.full_slug} />
      <LatestPosts posts={boardPosts} />
    </section>
  )
}

async function getFeatured() {
  const postIds = (await api.root().slug("home")).content.featured_posts ?? [];
  const posts = (await api.posts().includeUUID(postIds).latest(3));
  posts.forEach(post => post.content.featured = true);
  // console.log("featured");
  // console.log(posts);
  return posts;

}