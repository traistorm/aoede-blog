import React, {useEffect, useState} from "react";
import {checkLogin} from "../../api/user.api";
import {setUser} from "../../redux/action";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Alert, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import classNames from "classnames/bind";
import styles from "../defaultlayout/default.layout.module.scss";
const cx = classNames.bind(styles)

export default function NoLayout({children}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [alertData, setAlertData] = useState([]);
    const { t } = useTranslation("error");
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

    const setAlertDataFunction = (type, content) => {
        setAlertData(prevAlertData => [
            ...prevAlertData,
            { type, content }
        ]);
    };

    const handleErrorFunction = (err) => {
        const errorMessage = t(`${err.entityName}.${err.errorKey}`);
        if (errorMessage) {
            setAlertDataFunction("error", errorMessage);
        } else {
            setAlertDataFunction("error", err.errorKey);
        }
    }
    return (
        <>
            {React.cloneElement(children, {setAlertDataFunction: setAlertDataFunction, handleErrorFunction: handleErrorFunction})}
            <Stack className="fixed" sx={{top: "10px", right: "10px", zIndex: 1000000, width: "400px"}} spacing={2}>
                {alertData.map(alert => {
                    return (
                        <>
                            {
                                (alert.type === "updateSuccess" || alert.type === "createSuccess" || alert.type === "success") ? (
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
    )
}