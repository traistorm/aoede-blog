import Head from 'next/head';
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import DefaultLayout from "../layout/defaultlayout/default.layout";
const cx = classNames.bind(styles)

export default function Home() {
    return (
        <div>Hello from Traistorm</div>
  );
}

Home.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}
