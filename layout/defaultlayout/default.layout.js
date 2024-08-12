import Head from 'next/head';
import classNames from "classnames/bind";
import styles from "./default.layout.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
const cx = classNames.bind(styles)

export default function DefaultLayout({children}) {
    const [selectedPage, setSelectedPage] = useState("home")
    const router = useRouter();
    const { pathname } = router;
    useEffect(() => {
        if (pathname.includes('/home') || pathname === "/") {
            setSelectedPage("home");
        } else if (pathname.includes('/post')) {
            setSelectedPage("post");
        } else if (pathname.includes('/community')) {
            setSelectedPage("community");
        }
    }, []);

    const handleChangeSelectedPage = (page) => {
        setSelectedPage(page);
    }

    return (
        <>
            <div className={cx("relative flex justify-center items-center space-x-3", "bg-home")}>
                <div className={cx("blur-backdrop")}>
                    <div className="flex justify-center items-center space-x-3">
                        <Link onClick={(e) => {handleChangeSelectedPage("home")}} className={cx("header-button-home", selectedPage === "home"? "header-button-home-select": "")} href={"/"}>Home</Link>
                        <Link onClick={(e) => {handleChangeSelectedPage("post")}} className={cx("header-button-home", selectedPage === "post"? "header-button-home-select": "")} href={"/post"}>Posts</Link>
                        <Link onClick={(e) => {handleChangeSelectedPage("community")}} className={cx("header-button-home", selectedPage === "community"? "header-button-home-select": "")} href={"/community"}>Community</Link>
                    </div>
                </div>

            </div>
            <div>{children}</div>
        </>
    );
}
