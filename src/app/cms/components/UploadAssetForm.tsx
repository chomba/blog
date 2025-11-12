"use client";
import { useActionState } from "react";
import { uploadAssetAction } from "../actions/UploadAsset";
import "./styles.css";

export function UploadAssetForm() {
    const [state, formAction, isPending] = useActionState(uploadAssetAction, { ok: false });

    let msg = "";
    if (state.ok) {
        msg = "Successfully uploaded!";
    } else {
        msg = state.error ?? "";
    }

    return (
        <div className="task">
            <h3>Task 1.1.3: Upload an asset</h3>
            <form action={formAction}>
                <fieldset>
                    <label htmlFor="file">Choose a file:</label>
                    <input type="file" id="file" name="file" accept=".jpg,.png,.pdf" />
                </fieldset>
                <button type="submit">Upload File</button>
            </form>
            <span>{msg}</span>
        </div>
    );
}