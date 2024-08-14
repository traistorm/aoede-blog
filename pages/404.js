import React from "react";
import images from "../public/images";
import Image from "next/image";
import Head from "next/head";
import DefaultLayout from "../layout/defaultlayout/default.layout";

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Not found</title>
                <link rel="icon" href="/static/traistorm.ico"/>
            </Head>
            <div className="flex justify-center">
                <Image className="w-6/12 h-auto" src={images.notFound} alt={"not-found"} />
            </div>
        </>
    )
}
Custom404.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}