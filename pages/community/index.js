import React, { useEffect, useState } from "react"
import styles from "./community.module.scss"
import classNames from "classnames/bind";
import Head from "next/head";
import DefaultLayout from "../../layout/defaultlayout/default.layout";
const cx = classNames.bind(styles)
export default function Community () {
    // Detail post
    return (
        <>
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/static/traistorm.ico"/>
            </Head>
        </>
    )

}

Community.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}