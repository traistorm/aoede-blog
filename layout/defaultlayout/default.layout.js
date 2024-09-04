import Head from 'next/head';
import classNames from "classnames/bind";
import styles from "./default.layout.module.scss";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import {checkLogin} from "../../api/user.api";
import {setUser} from "../../redux/action";
import {useDispatch} from "react-redux";
const cx = classNames.bind(styles)

export default function DefaultLayout({children}) {
    //const { user, loading } = useUser();
    const [selectedPage, setSelectedPage] = useState("home")
    const dispatch = useDispatch();
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

        if (localStorage.getItem("token")) {
            checkLogin(localStorage.getItem("token")).then((res) => {
                dispatch(setUser(res.data));
                if (pathname.includes('/login')) {
                    router.push("/");
                }
            }, (err) => {
                localStorage.removeItem("token");
                dispatch(setUser(null));
                //router.push("/login");
            })
        } else {
            dispatch(setUser(null));
            //router.push("/login");
        }
    }, []);

    const handleChangeSelectedPage = (page) => {
        setSelectedPage(page);
    }
    const settings = [];
    return (
        <>
            <Navbar {...settings} />

            <div>
                {React.cloneElement(children)}
            </div>

            <Footer {...settings} />
        </>
    );
}
