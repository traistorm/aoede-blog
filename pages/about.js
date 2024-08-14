import Container from "../components/container";
import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../layout/defaultlayout/default.layout";
import Contact from "./contact";
import {useState} from "react";

export default function About({ settings }) {
    const [authors, setAuthors] = useState([
        {id: 1, name: "Traistorm", avatarUrl: "https://static.vecteezy.com/system/resources/previews/027/245/487/non_2x/male-3d-avatar-free-png.png"},
        {id: 2, name: "Traistorm", avatarUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-3d-icon-download-in-png-blend-fbx-gltf-file-formats--young-male-man-people-character-avatar-pack-avatars-icons-5618502.png?f=webp"},
        {id: 3, name: "Traistorm", avatarUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--profile-character-pack-avatars-icons-5187873.png?f=webp"}])
    return (
        <Container>
            <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                About
            </h1>
            <div className="text-center">
                <p className="text-lg">We are a small passionate team.</p>
            </div>

            <div className="mb-16 mt-6 grid grid-cols-3 gap-5 md:mb-32 md:mt-16 md:gap-16">
                {authors.slice(0, 3).map(author => {
                    return (
                        <div
                            key={author.id}
                            className="relative aspect-square overflow-hidden rounded-md bg-slate-50 odd:translate-y-10 odd:md:translate-y-16">
                            <Link href={`/author/${author?.slug}`}>
                                <Image
                                    src={author.avatarUrl}
                                    alt={author?.name || " "}
                                    fill
                                    sizes="(max-width: 320px) 100vw, 320px"
                                    className="object-cover"
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="prose mx-auto mt-14 text-center dark:prose-invert">
                <p>
                    We provide real-time connectivity to enable software
                    providers and financial institutions to build integrated
                    products for their small business customers.
                </p>
                <p>
                    Our API infrastructure is leveraged by clients ranging from
                    lenders to corporate card providers and business forecasting
                    tools, with use cases including automatic reconciliation,
                    business dashboarding, and loan decisioning.
                </p>
                <p>
                    <Link href="/contact">Get in touch</Link>
                </p>
            </div>
        </Container>
    );
}
About.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}