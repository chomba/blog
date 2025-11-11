import api from "@/lib/management";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { draftMode } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    let slug = searchParams.get("slug");

    redirect(`${slug}?secret=${secret}`);

    // const redirectTo = slug === "home" ? `/${slug}` : "/";


    // if (secret != process.env.DRAFT_MODE_SECRET) {
    //     return new Response("Invalid Token", { status: 401 });
    // }

    // if (!slug) {
    //     return new Response("You must provide a slug as a query paramenter", { status: 401 });
    // }
    // const post = slug ? await api.root().draft().slug(slug) : await api.root().draft().slug("home");
    // if (!post) {
    //     return new Response("You must provide a valid slug", { status: 401 });
    // }
    // const draft = await draftMode();
    // draft.enable();
    // console.log(`FULL SLUG: ${post.full_slug}`);
    // const redirectTo = post.full_slug != "home" ? `/${post.full_slug}` : "/";
    // permanentRedirect(redirectTo);
    // permanentRedirect(post.full_slug != "home" ? post.full_slug : "/");
}