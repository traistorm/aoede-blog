import {Suspense, useEffect, useState} from "react";
import Container from "../../components/container";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import PostList from "../../components/postlist";
import {getPosts} from "../../api/blogs.api";
import DefaultLayout from "../../layout/defaultlayout/default.layout";
import About from "../about";
import { useRouter } from 'next/router'

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default function Post({}) {
    const router = useRouter()

    const [page, setPage] = useState(0);
    const [sizePerPage, setSizePerPage] = useState(9);
    const [posts, setPosts] = useState([]);
    const [isFirstPage, setIsFirstPage] = useState(true)
    const [isLastPage, setIsLastPage] = useState(false)

    useEffect(() => {
        if (router.query.page) {
            getPosts(router.query.page, sizePerPage).then((res) => {
                setPosts(res.data)
                setPage(parseInt(router.query.page, 10))

                // Check end page
                setIsFirstPage(router.query.page == 0);
                setIsLastPage(res.data.length < sizePerPage);
            }, (err) => {

            })
        } else {
            // Get page 0
            getPosts(0, sizePerPage).then((res) => {
                setPosts(res.data)
                setPage(0);

                // Check end page
                setIsFirstPage(true);
                setIsLastPage(res.data.length < sizePerPage);
            }, (err) => {

            })
        }
    }, [router.query.page]); // Chỉ chạy khi tham số trang thay đổi
    return (
        <>
            <Container className="relative">
                <h1 className="playpen-sans-font text-center text-xl font-semibold tracking-tight dark:text-white lg:text-2xl lg:leading-snug">
                    Tactics, skills and more...
                </h1>
                <div className="text-center">
                    <p className="playpen-sans-font mt-2 text-lg">
                        Read what you like here!
                    </p>
                </div>
                <Suspense
                    key={page}
                    fallback={<Loading />}>
                    <>
                        {posts && posts?.length === 0 && (
                            <div className="flex h-40 items-center justify-center">
                                <span className="text-lg text-gray-500">
                                    End of the result!
                                </span>
                            </div>
                        )}
                        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                            {posts.map(post => (
                                <PostList key={post.id} post={post} aspect="square" />
                            ))}
                        </div>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            isFirstPage={isFirstPage}
                            isLastPage={isLastPage}
                        />
                    </>
                </Suspense>
            </Container>
        </>
    );
}

Post.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}
