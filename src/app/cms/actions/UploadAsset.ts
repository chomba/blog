"use server";
import api, { uploadAsset } from "../api";

interface State {
    ok?: boolean,
    error?: string
}

export async function uploadAssetAction(initialState: State, formData: FormData): Promise<State> {
    const file = formData.get("file") as File;

    if (file.name == 'undefined') { // file.name is never undefined, if no file is upload its value is set to "undefined"
        console.log("file not found");
        return { ok: false, error: "No file was submitted" }
    }

    const response = await uploadAsset(file);
    return { ok: true };
}