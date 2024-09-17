// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Cấu hình i18next
i18n
    .use(HttpApi) // Load file dịch từ backend
    .use(LanguageDetector) // Tự động phát hiện ngôn ngữ người dùng
    .use(initReactI18next) // Cho phép sử dụng i18next với React
    .init({
        fallbackLng: 'en', // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ phù hợp
        supportedLngs: ['en', 'vi'], // Các ngôn ngữ được hỗ trợ
        interpolation: {
            escapeValue: false, // Tắt việc escape cho các ký tự đặc biệt
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // Đường dẫn tới các tệp dịch
        },
    });

export default i18n;
