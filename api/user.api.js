import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";

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

export const signUp = async (username, password) => {
    let signUpDTO = {
        username: username,
        password: password
    }
    try {
        const response = await axiosInstance.post('/api/user/sign-up', signUpDTO);
        return response.data;
    } catch (error) {
        console.error('Error create post:', error);
        throw error;
    }
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

export const getProfile = async (profileId) => {
    try {
        const response = await axiosInstance.get('/api/user/get-profile?profileId=' + profileId);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
