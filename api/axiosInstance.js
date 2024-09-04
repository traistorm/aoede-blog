import axios from 'axios';
import Cookies from 'js-cookie';

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST
});

// Thêm một request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Lấy token từ Cookies
        const token = localStorage.getItem('token'); // Tên 'token' có thể thay đổi tùy theo bạn đã lưu như thế nào
        console.log(token)
        if (token) {
            // Nạp token vào header Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Xử lý lỗi trước khi gửi request
        return Promise.reject(error);
    }
);

// Thêm một response interceptor nếu cần thiết
axiosInstance.interceptors.response.use(
    function (response) {
        // Bất kỳ mã trạng thái nào nằm trong phạm vi 2xx đều kích hoạt hàm này
        return response;
    },
    function (error) {
        // Bất kỳ mã trạng thái nào nằm ngoài phạm vi 2xx đều kích hoạt hàm này
        return Promise.reject(error);
    }
);

export default axiosInstance;