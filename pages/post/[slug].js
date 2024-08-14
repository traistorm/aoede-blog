import DefaultLayout from "../../layout/defaultlayout/default.layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getPostByTitle} from "../../api/blogs.api";
import Container from "../../components/container";
import CategoryLabel from "../../components/category";
import Link from "next/link";
import {formatDatePattern} from "../../utils/dateUtils";
import Image from "next/image";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import AuthorCard from "../../components/authorCard";

export default function PostDetail ({}) {
    const [post, setPost] = useState({})
    const router = useRouter();
    useEffect(() => {
        if (router.query.slug) {
            // Get post when slug ready
            getPostByTitle(router.query.slug).then((res) => {
                setPost(res.data);
            }, (err) => {

            })
        }
    }, [router.query.slug]); // Chạy khi slug thay đổi
    return (
        <>
            <Container className="!pt-0">
                <div className="mx-auto max-w-screen-md ">
                    <div className="flex justify-center">
                        <CategoryLabel categories={post.categories} />
                    </div>

                    <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                        {post.title}
                    </h1>

                    <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 flex-shrink-0">
                                {post?.createdBy && (
                                    <Link href={`/author/${post?.createdBy}`}>
                                        <Image
                                            src={JSON.parse(post?.author).avatarUrl}
                                            alt={post?.createdBy}
                                            className="rounded-full object-cover"
                                            fill
                                            sizes="40px"
                                        />
                                    </Link>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-400">
                                    <Link href={`/author/${post?.createdBy}`}>
                                        {post?.createdBy}
                                    </Link>
                                </p>
                                <div className="flex items-center space-x-2 text-sm">
                                    <time
                                        className="truncate text-sm"
                                        dateTime={post?.created || post.created}>
                                        {formatDatePattern(post?.created, "MMMM dd, yyyy")}
                                    </time>
                                    <span>· {post.readingTimeMinute || "5"} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
                {post?.thumbnailImageUrl && (
                    <Image
                        src={post.thumbnailImageUrl}
                        alt={"Thumbnail"}
                        loading="eager"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
            </div>

            <Container>
                <article className="mx-auto max-w-screen-md">
                    <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    <div className="mb-7 mt-7 flex justify-center">
                        <Link
                            href="/"
                            className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
                            ← View all posts
                        </Link>
                    </div>
                    {post.author && <AuthorCard author={post.author} />}
                </article>
            </Container>
        </>
    )
}

PostDetail.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}