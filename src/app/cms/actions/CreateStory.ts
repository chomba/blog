"use server";
import api, { CreateStoryResponse } from "../api";

interface State {
    response?: CreateStoryResponse, 
    error?: string
}

export default async function action(initialState: State, formData: FormData): Promise<State> {
    const name = formData.get("name")?.toString() ?? "";
    const slug = formData.get("slug")?.toString() ?? "";
    const component = formData.get("component")?.toString() ?? "";
    const published = Number(formData.get("published")?.toString()) == 1 ? true : false;

    if (name && slug) {
        const response = await api.stories.create({
            name: name,
            slug: slug,
            content: {
                component: component 
            }
        }, published);
        return { response: response } as State;
    }
    return { error: "Name and Slug must be provided" } 
}