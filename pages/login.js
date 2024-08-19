import {useEffect, useState} from "react";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import {checkLogin, login} from "../api/user.api";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/action";
import DefaultLayout from "../layout/defaultlayout/default.layout";
import Home from "./index";
import NoLayout from "../layout/nolayout/no.layout";
const cx = classNames.bind(styles)

export default function Login() {
    //const { user, loading } = useUser();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    // username, password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    //

    const [isLoginPanel, setIsLoginPanel] = useState(true);

    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
    const [showPasswordReEnterSignUp, setShowPasswordReEnterSignUp] = useState(false);

    const togglePasswordLogin = () => {
        setShowPasswordLogin(!showPasswordLogin);
    };
    const togglePasswordSignUp = () => {
        setShowPasswordSignUp(!showPasswordSignUp);
    };
    const togglePasswordReEnterSignUp = () => {
        setShowPasswordReEnterSignUp(!showPasswordReEnterSignUp);
    };

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, []);

    const onLogin = () => {
        login(username, password).then((res) => {
            // Save token
            dispatch(setUser(res.data));
            localStorage.setItem("token", res.data.token);
            router.push("/");
        }, (err) => {

        })
    }
    return (
        <>
            <section className={cx("bg-gray-100 min-h-screen flex box-border justify-center items-center", "bg-login")}>
                <div className="m-5 bg-gray-200 rounded-2xl flex max-w-3xl p-5 items-center">
                    {
                        isLoginPanel? (
                            <div className="md:w-1/2 px-8">
                                <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
                                <p className="text-sm mt-4 text-[#002D74]">If you already a member, easily log in now.</p>

                                <div className="flex flex-col gap-4">
                                    <input className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Username" value={username} onChange={onChangeUsername} />
                                    <div className="relative">
                                        <input
                                            className="p-2 rounded-xl border w-full"
                                            type={showPasswordLogin ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={onChangePassword}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="gray"
                                            id="togglePassword"
                                            className={`bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 ${showPasswordLogin ? 'hidden' : 'block'}`}
                                            viewBox="0 0 16 16"
                                            onClick={togglePasswordLogin}
                                        >
                                            <path
                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                            />
                                            <path
                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className={`bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer ${showPasswordLogin ? 'block' : 'hidden'}`}
                                            id="mama"
                                            viewBox="0 0 16 16"
                                            onClick={togglePasswordLogin}
                                        >
                                            <path
                                                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                                            />
                                            <path
                                                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                                            />
                                        </svg>
                                    </div>
                                    <button onClick={onLogin} className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">Login</button>
                                </div>
                                {/*<div className="mt-6 items-center text-gray-100">
                            <hr className="border-gray-300" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-300" />
                        </div>
                        <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>

                            Login with Google
                        </button>*/}
                                <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">Forget password?</div>

                                <div className="mt-4 text-sm flex justify-between items-center container-mr">
                                    <p className="mr-3 md:mr-0">If you don't have an account..</p>
                                    <button onClick={() => {setIsLoginPanel(false)}} className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Register</button>
                                </div>
                            </div>
                        ) : (
                            <div className="md:w-1/2 px-8">
                                <h2 className="font-bold text-3xl text-[#002D74]">Sign up</h2>
                                <p className="text-sm mt-4 text-[#002D74]">Sign up for an account here to post, comment
                                    and more.</p>

                                <div className="flex flex-col gap-4">
                                    <input className="p-2 mt-8 rounded-xl border" type="email" name="email"
                                           placeholder="Email"/>
                                    <div className="relative">
                                        <input
                                            className="p-2 rounded-xl border w-full"
                                            type={showPasswordSignUp ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="gray"
                                            id="togglePassword"
                                            className={`bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 ${showPasswordSignUp ? 'hidden' : 'block'}`}
                                            viewBox="0 0 16 16"
                                            onClick={togglePasswordSignUp}
                                        >
                                            <path
                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                            />
                                            <path
                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className={`bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer ${showPasswordSignUp ? 'block' : 'hidden'}`}
                                            id="mama"
                                            viewBox="0 0 16 16"
                                            onClick={togglePasswordSignUp}
                                        >
                                            <path
                                                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                                            />
                                            <path
                                                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="relative">
                                        <input
                                            className="p-2 rounded-xl border w-full"
                                            type={showPasswordReEnterSignUp ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="Re-enter password"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="gray"
                                            id="togglePassword"
                                            className={`bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 ${showPasswordReEnterSignUp ? 'hidden' : 'block'}`}
                                            viewBox="0 0 16 16"
                                            onClick={togglePasswordReEnterSignUp}
                                        >
                                            <path
                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                            />
                                            <path
                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className={`bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer ${showPasswordReEnterSignUp ? 'block' : 'hidden'}`}
                                            id="mama"
                                            viewBox="0 0 16 16"
                                            onClick={togglePasswordReEnterSignUp}
                                        >
                                            <path
                                                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                                            />
                                            <path
                                                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                                            />
                                        </svg>
                                    </div>
                                    <button
                                        className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                                        type="submit">Sign up
                                    </button>
                                </div>
                                <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip"></div>

                                <div className="mt-4 text-sm flex justify-between items-center container-mr">
                                    <p className="mr-3 md:mr-0">If you have an account..</p>
                                    <button onClick={() => {
                                        setIsLoginPanel(true)
                                    }}
                                            className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Login
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl max-h-[1600px]"
                             src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
                             alt="login form image"/>
                    </div>
                </div>
            </section>
        </>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <NoLayout>{page}</NoLayout>
    )
}