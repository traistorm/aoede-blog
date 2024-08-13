import Head from 'next/head';
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import DefaultLayout from "../layout/defaultlayout/default.layout";
import Container from "../components/container";
import Link from "next/link";
import {useEffect, useState} from "react";
import {getPost} from "../api/blogs.api";
import PostList from "../components/postlist";
const cx = classNames.bind(styles)

export default function Home() {
    const [sizePerPage, setSizePerPage] = useState(10)
    const [hasMorePost, setHasMorePost] = useState(true);
    const [postPage, setPostPage] = useState(0)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPost(postPage, sizePerPage).then((res) => {
            setPosts(prevState => [...prevState, ...res.data])
            if (res.data.length < 10) {
                // Load 10 post per Call API
                setHasMorePost(false);
            }
        }, (err) => {

        })
    }, [postPage]);
    return (
        <>
            {posts && (
                <Container>
                    <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
                        {posts.slice(0, 2).map(post => (
                            <PostList
                                key={post.id}
                                post={post}
                                aspect="landscape"
                                preloadImage={true}
                            />
                        ))}
                    </div>
                    <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
                        {posts.slice(2, 14).map(post => (
                            <PostList key={post.id} post={post} aspect="square" />
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/archive"
                            className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
                            <span>View all Posts</span>
                        </Link>
                    </div>
                </Container>
            )}
        </>
  );
}

Home.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}
