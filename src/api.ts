import StoryblokClient, { ISbConfig, ISbStoriesParams, ISbStoryData, ISbStoryParams } from "storyblok-js-client";
import { Post } from "./models";
import { ownFetch, StoryVersion } from "./utils";
import { draftMode } from "next/headers";

enum SbPath {
    Post = "posts/",
    Root = ""
}

export async function getVersion() {
    const { isEnabled } = await draftMode();
    return isEnabled ? "draft" : "published" as StoryVersion;
}

export class Query<T> {
    private readonly path?: SbPath;
    private storiesParams: ISbStoriesParams;
    private storyParams: ISbStoryParams;
    private readonly config: ISbConfig;

    constructor(path: SbPath = SbPath.Root) {
        this.path = path;
        this.storiesParams = {
            by_slugs: `${path}*`,
            cv: Date.now()
        };
        this.storyParams = {
            cv: Date.now()
        }
        this.config = {
            accessToken: process.env.STORYBLOK_PUBLIC_TOKEN,
            fetch: ownFetch
        };
    }

    private set version(version: StoryVersion) {
        this.storyParams.version = this.storiesParams.version = version;
        if (version == "draft") {
            this.config.accessToken = process.env.STORYBLOK_PREVIEW_TOKEN;
        }
        if (version == "published") {
            this.config.accessToken = process.env.STORYBLOK_PUBLIC_TOKEN;
        }
    }

    private async setup() {
        if (this.storyParams.version)
            return;

        // Get draft stories in development environment
        if (process.env.NODE_ENV == "development") {
            this.version = "draft"
            return;
        } 

        const { isEnabled } = await draftMode();
        this.version = isEnabled ? "draft" : "published";
        
    }

    published() {
        this.version = "published";
        return this;
    }

    draft() {
        this.version = "draft";
        return this;
    }

    excludeID(ids: number[]) {
        if (ids.length > 0) 
            this.storiesParams.excluding_ids = ids.join(",");
        return this;
    }

    includeUUID(uuids: string[]) {
        if (uuids.length > 0)
            this.storiesParams.by_uuids_ordered = uuids.join(",");
        return this;
    }

    async latest(count: number) {
        await this.setup();
        this.storiesParams.sort_by = "first_published_at:desc";
        this.storiesParams.per_page = count;
        console.log(this.config);
        console.log(this.storiesParams);

        const client = new StoryblokClient(this.config);
        const response = await client.getStories(this.storiesParams);
        return response.data.stories as T[]
    }

    async veryLatest() {
        return (await this.latest(1))[0] as T | undefined;
    }

    async uuid(uuid: string) {
        await this.setup();
        this.storyParams.find_by = "uuid";
        const client = new StoryblokClient(this.config);
        const response = await client.getStory(uuid, this.storyParams);
        return response.data.story as T;
    }

    async ids(ids: string[]) {
        await this.setup();
        this.storiesParams.per_page = ids.length;
        this.storiesParams.by_uuids_ordered = ids.join(",");

        const client = new StoryblokClient(this.config);
        const response = await client.getStories(this.storiesParams);
        return response.data.stories as Post[]
    }

    async slug(slug: string) {
        await this.setup();
        const client = new StoryblokClient(this.config);
        const response  = await client.getStory(`${this.path}${slug}`, this.storyParams);
        return response.data.story as T;
    }

    // async function getAllPosts(version: StoryVersion = ) {
    //     const payload: ISbStoriesParams = { 
    //         version: env_version,
    //         by_slugs: "posts/*",
    //         cv: Date.now()
    //     };
    //     const response = await client.getStories(payload);
    //     return response.data.stories as Post[]
    // }

}


export default {
    posts: () => new Query<Post>(SbPath.Post),
    root: () => new Query<ISbStoryData>()
};