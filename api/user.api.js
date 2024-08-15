import axios from "axios";
import Cookies from "js-cookie";

export const login = async (username, password) => {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    return axios.post(
        host + "/api/user/login", null, {
            params: {
                username: username,
                password: password
            }
        }
    );
};

export const checkLogin = async (token) => {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    return axios.post(
        host + "/api/user/check-login", null, {
            params: {
                token: token
            }
        }
    );
};