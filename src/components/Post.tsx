import { StoryblokServerRichText } from "@storyblok/react/rsc";
import "./Post.css"
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Post({ blok, preview, slug }: { blok: any, preview: boolean, slug: string }) {
    console.log("blok:");
    console.log(blok);

    const created_at = new Date(blok.created_at);
    const published_on = `${created_at.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    })} - ${created_at.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

    return (
        <div {...storyblokEditable(blok)} key={blok._uid} className={["post-wrapper", preview ? "preview" : ""].join(" ")}>
            <div className="container full post-cover">
                <div className="container inner post-header">
                    <div className="post-titles">
                        { preview ? <a className="post-link" href={slug} title={`Read: ${blok.title}`}></a> : "" }
                        <h1 className="title">{blok.title}</h1>
                        <div className="subtitle">{blok.subtitle}</div>
                    </div>
                    <div className="meta category">
                        <div className="icon">
                            <img src="https://yt3.googleusercontent.com/ytc/AIdro_n6IcR5ZvaeYhQrCNsekGwp-QVg82hGPaDfkweYjTCaT0w=s900-c-k-c0x00ffffff-no-rj" />
                        </div>
                        <div className="content">
                            {blok.category}
                        </div>
                    </div>
                    <div className="meta published-on">Posted {published_on}</div>
                </div>
            </div>

            <div className="container full post-body">
                <div className="btn-share">SHARE</div>
                <StoryblokServerRichText doc={blok.body} />
            </div>

            <div className="container full post-feedback">
                <div className="container inner comments">
                    <div className="heading">
                    <h2>Feedback</h2>
                    <div className="count">3 Comments</div>
                    </div>
                    <ul className="comment-list">

                    </ul>
                    <div className="btn-add">Add Comment</div>
                </div>
            </div>

            <div className="container full related-post-bg">
                <div className="container page post-related">
                    <div className="title">Read Next</div>
                </div>
            </div>
        </div>
    );
}