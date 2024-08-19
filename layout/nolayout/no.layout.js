import React, {useEffect} from "react";
import {checkLogin} from "../../api/user.api";
import {setUser} from "../../redux/action";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

export default function NoLayout({children}) {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkLogin(localStorage.getItem("token")).then((res) => {
                dispatch(setUser(res.data));
                router.push("/");
            }, (err) => {
                localStorage.removeItem("token");
                dispatch(setUser(null));
                router.push("/login");
            })
        } else {
            dispatch(setUser(null));
            router.push("/login");
        }
    }, []);
    return (
        <>
            {React.cloneElement(children)}
        </>
    )
}