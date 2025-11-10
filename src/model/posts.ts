// import StoryblokClient, { ISbConfig, ISbStoriesParams, ISbStoryData, ISbStoryParams } from "storyblok-js-client";
// import { AuthContext, autoFetch, cachedFetch, noStoreFetch } from "../utils";
// import { Context } from "vm";



// const client = new StoryblokClient({
//     accessToken: process.env.STORYBLOK_TOKEN,
//     fetch: cachedFetch
// });

// const env_version = process.env.NODE_ENV === "development" ? "draft" : "published";

// async function getPostBySlug(slug: string) {
    
//     const response  = await client.getStory(`posts/${slug}`, {
//         version: env_version,
//         cv: Date.now()
//     });
//     return response.data.story as Post;
// }

// async function getAllPosts(version: StoryVersion = ) {
//     const payload: ISbStoriesParams = { 
//         version: env_version,
//         by_slugs: "posts/*",
//         cv: Date.now()
//     };
//     const response = await client.getStories(payload);
//     return response.data.stories as Post[]
// }

// async function getPostById(uuid: string, version: StoryVersion = env_version) {
//     const response = await client.getStory(uuid, {
//         find_by: "uuid",
//         version: version,
//         cv: Date.now()
//     });
//     return response.data.story as Post;
// }

// async function getPostsById(ids: string[], version: StoryVersion = env_version) {
//     const payload: ISbStoriesParams = { 
//         per_page: ids.length,
//         version: version,
//         by_uuids_ordered: ids.join(","),
//         cv: Date.now()
//     };
//     const response = await client.getStories(payload);
//     return response.data.stories as Post[]
// }



// async function getLatestPosts(count: number = 1, excludedIds: number[] = [], version: StoryVersion = env_version) {
//     const payload: ISbStoriesParams = { 
//         sort_by: "first_published_at:desc",
//         per_page: count,
//         version: version,
//         by_slugs: "posts/*",
//         cv: Date.now()
//     };
//     if (excludedIds.length > 0) {
//         payload.excluding_ids = excludedIds.join(",");
//     }
//     const response = await client.getStories(payload);
//     return response.data.stories as Post[];
// }

// async function getLatest(draft: boolean = false) {
//     const posts = await getLastPosts(1);
//     return posts[Symbol.iterator]().next().value as Post;
// }


// Disable fetch caching if the user is logged in or in a development enviroment
// 

// api.posts.id()
// api.posts.all()
//                .draft()
//                .published()
//          .latest(10)
//                     .draft()
//                     .published()

/*
    api {
      posts: new PostsApi(),
      post
    }

*/



// async function getFeaturedPosts(version: StoryVersion = env_version) {
//     const response = await client.getStory("home", {
//         version: version,
//         cv: Date.now()
//     });
//     const postIds = response.data.story.content.featured_posts ?? [];
//     const posts = await getPostsById(postIds, version);
//     posts.forEach(post => post.content.featured = true);
//     return posts as Post[];
// }



