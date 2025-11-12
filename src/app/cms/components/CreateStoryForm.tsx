"use client";
import { useActionState } from "react";
import "./styles.css";
import { Component } from "../api";
import action from "../actions/CreateStory";

export function CreateStoryForm({ components }: { components: Component[] }) {
    const [state, formAction, isPending] = useActionState(action, {});

    let msg = "";
    if (state.error) {
        msg = state.error;
    } else if (!state.response?.ok) {
        msg = state.response?.error ?? "";
    } else {
        msg = `Success! -> created story ${JSON.stringify(state.response.story)}`;
    }

    return (
        <div className="task">
            <h3>Task 1.1.2: Create a Story</h3>
            <form action={formAction}>
                <fieldset>
                    <label htmlFor="name">Story Name:</label>
                    <input type="input" id="name" name="name"></input>
                    <br />
                    <label htmlFor="name">Story Slug:</label>
                    <input type="input" id="slug" name="slug"></input>
                    <br />
                    <p> Select a Root Component (aka content type):</p>
                    <select name="component">
                        {components.map((component: Component, index: number) => (
                        <option key={index} value={component.name}>{component.name}</option>
                        ))}
                    </select>
                    <input type="checkbox" id="published" name="published" value="true" />
                    <label htmlFor="published">Publish it immediately</label>
                </fieldset>
                <button type="submit">Create Story</button>
            </form>
            <span>{msg}</span>
        </div>
    );
}