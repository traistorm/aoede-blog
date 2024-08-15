import '../styles/global.css';
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import Head from "next/head";
import {createStore} from "redux";
import {Provider, useDispatch} from "react-redux";
import store from "../redux/store";
import {ThemeProvider} from "next-themes";
import {checkLogin} from "../api/user.api";
import useUser from "../hook/user";


export default function App({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        /*const intervalId = setInterval(() => {
            // Gọi hàm của bạn ở đây
            updateActiveUser();
        }, 30000); // Thời gian đặt là 30 giây*/

        // Check token and check login
        // If token is ok => go to home page
        /*if (localStorage.getItem("token")) {
            checkLogin(localStorage.getItem("token")).then((res) => {
                router.push("/");
            }, (err) => {
                localStorage.removeItem("token");
            })
        }*/
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
        <ThemeProvider attribute="class" defaultTheme="light">
            <Provider store={store}>
                {getLayout(<Component {...pageProps} />)}
            </Provider>
        </ThemeProvider>
    )
}