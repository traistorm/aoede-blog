import {useState, useEffect, createContext, useContext} from 'react';
import { useRouter } from 'next/router';
import {checkLogin} from "../api/user.api";

const UserContext = createContext();
const UserProvider = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkLogin(token)
                .then((res) => {
                setUser(res.data);
                setLoading(false);
                if (router.pathname === '/login') {
                    // Nếu đang ở trang login, chuyển hướng về trang chính
                    router.push('/');
                }
            })
                .catch((error) => {
                localStorage.removeItem('token');
                setUser(null);
                setLoading(false);
                //router.push('/login');
            });
        } else {
            setUser(null);
            setLoading(false);
            //router.push('/login');
        }
    }, [router]);

    return { user, loading };
};

export const useUser = () => {
    return useContext(UserContext);
};