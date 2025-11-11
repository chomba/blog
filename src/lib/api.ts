import StoryblokClient, { ISbConfig, ISbStoriesParams, ISbStoryData, ISbStoryParams } from "storyblok-js-client";
import { ownFetch } from "./helpers";
import { Post, StoryVersion } from "./models";

enum SbPath {
    Post = "posts/",
    Root = ""
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
            accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
            fetch: ownFetch
        };
    }

    private set version(version: StoryVersion) {
        this.storyParams.version = this.storiesParams.version = version;
    }

    private async setup() {
        if (this.storyParams.version)
            return;
        this.version = "published"; // Default Mode   
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

}


export default {
    posts: () => new Query<Post>(SbPath.Post),
    root: () => new Query<ISbStoryData>()
};