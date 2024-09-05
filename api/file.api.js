import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";

export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // Thêm file vào FormData
        const response = await axiosInstance.post('/api/file/upload-file?type=thumbnailImage', formData);
        return response.data;
    } catch (error) {
        console.error('Error create post:', error);
        throw error;
    }
};
