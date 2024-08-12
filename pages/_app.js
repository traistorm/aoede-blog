import '../styles/global.css';
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Head from "next/head";
import {createStore} from "redux";
import {Provider, useDispatch} from "react-redux";
import store from "../redux/store";


export default function App({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Gọi hàm của bạn ở đây
            updateActiveUser();
        }, 30000); // Thời gian đặt là 30 giây
    }, []);
    const updateActiveUser = () =>  {
        /*if (Cookies.get("token") !== undefined) {
            updateActive().then((res) => {

            }, (err) => {

            })
        } else {
            router.push('/');
        }*/
    }
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    )
}