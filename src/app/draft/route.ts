import api from "@/api";
import { redirect } from "next/navigation";
import { draftMode } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const slug = searchParams.get("slug")

    if (secret != process.env.DRAFT_MODE_SECRET) {
        return new Response("Invalid Token", { status: 401 });
    }

    if (!slug) {
        return new Response("You must provide a slug as a query paramenter", { status: 401 });
    }

    const post = await api.root().slug(slug);
    if (!post) {
        return new Response("You must provide a valid slug", { status: 401 });
    }
    const draft = await draftMode();
    draft.enable();
    redirect(post.full_slug);
}