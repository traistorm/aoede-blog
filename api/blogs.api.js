import axios from "axios";
import Cookies from "js-cookie";

export const getPost = async (page, size) => {
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

export const getNews = async (id) => {
    const host = process.env.NEXT_PUBLIC_API_HOST;
    if (Cookies.get("token") !== undefined) {
        let headers = {
            headers: {
                Authorization: Cookies.get("token"),
            },
            params: {},
        };
        return axios.get(
            host + "/api/news/get-news?id=" + id, headers
        );
    }
};
