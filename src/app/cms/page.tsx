import api from "./api";
import { CreateComponentForm } from "./components/CreateComponentForm";
import { UploadAssetForm } from "./components/UploadAssetForm";
import { CreateStoryForm } from "./components/CreateStoryForm";
import { notFound } from "next/navigation";

export default async function CMSPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const rootComponents = await api.components.root(); 
    const { secret } = await searchParams;
    
    if (!secret || secret !== process.env.DRAFT_MODE_SECRET)
        notFound();
    return (
        <section>
            <ul className="task-list">
                <li>
                    <CreateComponentForm />
                </li>
                <li>
                    <CreateStoryForm components={rootComponents} />
                </li>
                <li>
                    <UploadAssetForm />
                </li>
            </ul>
        </section>
    );
}