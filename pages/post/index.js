import React, { useEffect, useState } from "react"
import classNames from "classnames/bind";
import styles from "./post.module.scss"
import {getPost} from "../../api/blogs.api";
import Link from "next/link";
import GradientCircularProgress from "../../components/loading/GradientCircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultlayout/default.layout";
const cx = classNames.bind(styles)
export default function Post () {
    const [sizePerPage, setSizePerPage] = useState(10)
    const [hasMorePost, setHasMorePost] = useState(true);
    const [postPage, setPostPage] = useState(0)
    const [postData, setPostData] = useState([])
    useEffect(() => {
        getPost(postPage, sizePerPage).then((res) => {
            setPostData(prevState => [...prevState, ...res.data])
            if (res.data.length < 10) {
                // Load 10 post per Call API
                setHasMorePost(false);
            }
        }, (err) => {

        })
    }, [postPage]);

    return (
        <>
            <Head>
                <title>Post</title>
                <link rel="icon" href="/static/traistorm.ico"/>
            </Head>
            <InfiniteScroll
                className="flex flex-col space-y-5 items-center mt-5"
                dataLength={postData.length}
                next={(e) => {
                    setPostPage(prevState => prevState + 1);
                }}
                hasMore={hasMorePost}
                loader={
                    <div className="flex items-center justify-center p-2">
                        <GradientCircularProgress size={40} />
                    </div>
                }
                endMessage={
                    <p className="text-gray-400" style={{ textAlign: 'center' }}>
                        You have scrolled down to the last post!
                    </p>
                }
            >
                {postData.map((post) => {
                    return (
                        <Link style={{width: "60%"}} href={"/post/" + post.id} className="flex space-x-3 w-full justify-center hover:bg-gray-700 transition duration-100 ease-in-out">
                            <img style={{width: "35%", maxHeight: "300px"}} src={post.thumbnailImageUrl} alt="thumbnailAlt" className="h-auto" />
                            <div style={{width: "65%"}} className="flex flex-col justify-start">
                                <div className="text-white text-2xl hover:text-blue-500 transition duration-200 ease-in-out">{post.title}</div>
                                <div className="text-gray-300 text-base">{post.description}</div>
                            </div>
                        </Link>
                    )
                })}
            </InfiniteScroll>
        </>
    )

}

Post.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}