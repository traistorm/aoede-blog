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
import {Alert, Stack} from "@mui/material";
const cx = classNames.bind(styles)

export default function DefaultLayout({children}) {
    //const { user, loading } = useUser();
    const [alertData, setAlertData] = useState([]);
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

    const setAlertDataFunction = (type, content) => {
        setAlertData(prevAlertData => [
            ...prevAlertData,
            { type, content }
        ]);
    };

    const handleChangeSelectedPage = (page) => {
        setSelectedPage(page);
    }
    const settings = [];
    return (
        <>
            <Navbar {...settings} />

            <div>
                {React.cloneElement(children, {setAlertDataFunction: setAlertDataFunction})}
            </div>

            <Footer {...settings} />
            <Stack className="fixed" sx={{top: "10px", right: "10px", zIndex: 1000000, width: "400px"}} spacing={2}>
                {alertData.map(alert => {
                    return (
                        <>
                            {
                                (alert.type === "updateSuccess" || alert.type === "createSuccess") ? (
                                    <Alert
                                        className={cx('transition-opacity duration-500 ease-in-out opacity-100', 'alert')}
                                        severity="success">
                                        {alert.content}
                                    </Alert>
                                ) : (
                                    <Alert
                                        className={cx('transition-opacity duration-500 ease-in-out opacity-100', 'alert')}
                                        severity="error">
                                        {alert.content}
                                    </Alert>
                                )
                            }
                        </>
                    )
                })}
            </Stack>
        </>
    );
}
