import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";

export const getPosts = async (page, size) => {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    /*if (Cookies.get("token") !== undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            host + "/api/post/get-post?type=" + type + "&page=" + page, headers
        );
    }*/
    let headers = {
        headers: {
            Authorization: Cookies.get("token"),
        },
        params: {},
    };
    return axios.get(
        host + "/api/post/get-post?page=" + page + "&size=" + size, headers
    );
};

export const getPostByTitle = async (title) => {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    let headers = {
        headers: {
            Authorization: Cookies.get("token"),
        },
        params: {},
    };
    return axios.get(
        host + "/api/post/get-post-by-title?title=" + title, headers
    );
};

export const getCategoryCombobox = async () => {
    try {
        const response = await axiosInstance.get('/api/post/get-category-combobox');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
