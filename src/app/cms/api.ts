import { ISbStoryData, Storyblok } from "storyblok-js-client";

const STORYBLOK_BASE_URL = "https://mapi.storyblok.com/v1/spaces/288290371893039";

export interface Component {
    name: string,
    display_name?: string,
    schema?: { 
        [key: string]: any
    },
    image?: string,
    preview_field?: string,
    is_root: boolean,
    preview_tmpl?: string,
    is_nestable: boolean,
    component_group_id?: string,
    icon?: string,
    color?: string,
    internal_tag_ids?: string[],
    content_type_asset_preview?: string 
}

export interface CreateComponentResponse {
    component?: Component,
    error?: string,
    ok: boolean
}

export interface CreateStoryResponse {
    story?: ISbStoryData,
    error?: string,
    ok: boolean
}



const fetch = (input: any, params?: any): Promise<Response> => {
    return globalThis.fetch(input, {
        headers: {
            "Authorization": process.env.MANAGEMENT_API_TOKEN,
            "Content-Type": "application/json",
        },
        ...params
    })
}

async function createComponent(component: Component): Promise<CreateComponentResponse> {
    const response = await fetch(`${STORYBLOK_BASE_URL}/components/`, {
        method: "POST",
        body: JSON.stringify({ component: component })
    })
    let data = await response.json();
    return response.ok ? { ok: true, component: data } : { ok: false, error: `Failed to create component - error: ${data.error ?? JSON.stringify(data)}` };
}

async function createStory(story: { name: string, slug: string, content: { [key:string]: any } }, published: boolean = true): Promise<CreateStoryResponse> {
    const response = await fetch(`${STORYBLOK_BASE_URL}/stories/`, {
        method: "POST",
        body: JSON.stringify({ 
            publish: published ? 1 : 0,
            story: story 
        })
    })
    console.log("createStory response");
    let data = await response.json();
    console.log(data);
    return response.ok ? { ok: true, story: data.story } : { ok: false, error: `Failed to create story - error: ${data.error ?? JSON.stringify(data)}` };
}

async function getRootComponents(): Promise<Component[]> {
    const response = await fetch(`${STORYBLOK_BASE_URL}/components?is_root=true`, { method: "GET" });
    const data = await response.json();
    return data.components;
}

export default {
    components: {
        create: createComponent,
        root: getRootComponents 
    },
    stories: {
        create: createStory
    }
};

export interface UploadAssetResponse {
    ok: boolean,
    error?: string
}

export interface SignedResponse {
    fields: {
        [key: string]: any
    },
    post_url: string,
    [key: string]: any
}   

export async function getAssetsSignedResponse(filename: string): Promise<SignedResponse | undefined> {
    const response = await fetch(`${STORYBLOK_BASE_URL}/assets`, { 
        method: "POST",
        body: JSON.stringify({ filename: filename })
    });

    if (response.ok) {
        return response.json();
    }
}

export async function uploadAsset(file: File): Promise<UploadAssetResponse> {
    const signedResponse = await getAssetsSignedResponse(file.name);
    if (!signedResponse) {
        return { ok: false }
    }

    const form = new FormData();
    for (const key in signedResponse.fields) {
        form.append(key, signedResponse.fields[key]);
    }
    form.append("file", file);

    const response = await globalThis.fetch(signedResponse.post_url, {
        method: "POST",
        body: form
    });

    return response.ok ? { ok: true } : { ok: false, error: (await response.text()) };
}