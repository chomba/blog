import type { Post, StoryblokAsset } from "@/models";
import "./LatestPosts.css";
import { StoryblokStory } from "@storyblok/react/rsc";
import { CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
    '--hero'?: string,
    '--thumbnail'?: string
}

export function LatestPosts({ posts }: { posts: Post[] }) {
    if (posts.length > 0) {
        return (
            <section className="container full posts-board-wrapper">
                <div className="container large posts-board">
                    <h2>Latest Stories</h2>
                    <div className="subscribe">
                        <a href="">Subscribe</a>
                        <span>and don't miss a story!</span>
                    </div>
                    <ul className="grid"> 
                        {posts.map((post: Post, index: number) => (
                        <li key={post.uuid}>
                            <a className="post-link" href={post.full_slug} title={`Read: ${post.content.title}`}></a>
                            {post.content.featured ? <span className="featured"></span> : "" }
                            <div className="post-image-wrapper" style={{
                                '--thumbnail': `url(${post.content.hero?.filename}/m/300x300)`,
                                '--hero': `url(${post.content.hero?.filename})`
                            } as CustomCSSProperties}>
                            </div>
                            <div className="post-data-wrapper">
                                <div className="post-data">
                                    <h3 className="title">{post.content.title}</h3>
                                </div>
                            </div>
                        </li>
                        ))}
                        <li className="see-more">
                            <a href="">See More</a>
                        </li>
                    </ul>
                </div>
            </section>
        );
    } else {
        return <h1>not found</h1>;
    }
}