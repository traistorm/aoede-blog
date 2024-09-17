import Image from "next/image";
import { myLoader } from "../utils/all";
import VercelLogo from "../public/img/vercel.svg";
import Container from "./container";
import ThemeSwitch from "./themeSwitch";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function Footer(props) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Nếu component chưa mount, không hiển thị select
    if (!mounted) return null;
  return (
    <Container className="flex justify-between items-center mt-10 border-t border-gray-100 dark:border-gray-800">
        <div className="flex space-x-3">
            <i className="bi bi-github text-xl lg:text-2xl cursor-pointer"></i>
            <i className="bi bi-youtube text-xl lg:text-2xl cursor-pointer"></i>
            <i className="bi bi-discord text-xl lg:text-2xl cursor-pointer"></i>
        </div>
        <div className="text-center text-base lg:text-xl font-bold jacques-francois-shadow-regular-font">
        {/*Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.*/}
            AOE DE DM
        </div>
        {/*<div className="mt-2 flex items-center justify-between">
            <ThemeSwitch />
        </div>*/}
        <div>
            {/* Nếu theme là light thì hiển thị mặt trời, ngược lại hiển thị mặt trăng */}
            {theme === 'light' ? (
                <svg
                    onClick={() => setTheme('dark')}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ff6a00"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ff6a00"
                    className="size-6 cursor-pointer sun-icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                </svg>
            ) : (
                <svg
                    onClick={() => setTheme('light')}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#00bfff"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#00bfff"
                    className="size-6 cursor-pointer moon-icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                </svg>
            )}
        </div>

    </Container>
  );
}
