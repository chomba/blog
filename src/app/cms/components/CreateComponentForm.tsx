"use client";
import { useActionState } from "react";
import { createComponent } from "../actions/CreateComponent";
import "./styles.css";

export function CreateComponentForm() {
    const [state, formAction, isPending] = useActionState(createComponent, {});

    let msg = "";
    if (state.errors) {
        msg = state.errors;
    } else if (!state.response?.ok) {
        msg = state.response?.error ?? "";
    } else {
        msg = `Success! -> created component ${JSON.stringify(state.response.component)}`;
    }

    return (
        <div className="task">
            <h3>Task 1.1.1: Create a Content Type Component</h3>
            <form action={formAction}>
                <fieldset>
                    <label htmlFor="name">Component Name:</label>
                    <input type="input" id="name" name="name"></input>
                </fieldset>
                <button type="submit">Create Component</button>
            </form>
            <span>{msg}</span>
        </div>
    );
}