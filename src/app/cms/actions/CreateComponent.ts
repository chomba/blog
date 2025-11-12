"use server";
import api, { CreateComponentResponse } from "../api";

interface State {
    response?: CreateComponentResponse, 
    errors?: string
}

export async function createComponent(initialState: State, formData: FormData): Promise<State> {
    const name = formData.get("name")?.toString() ?? "";
    
    if (name) {
        const response = await api.components.create({
            name: name,
            is_nestable: false,
            is_root: true
        });
        return { response: response }
    }

    return { errors: "Name must be provided" }
}
