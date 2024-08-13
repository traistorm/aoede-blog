import Head from 'next/head';
import classNames from "classnames/bind";
import styles from "./default.layout.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
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
    const settings = [];
    return (
        <>
            <Navbar {...settings} />

            <div>{children}</div>

            <Footer {...settings} />
        </>
    );
}
