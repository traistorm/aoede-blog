import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@heroicons/react/24/outline";

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Nếu component chưa mount, không hiển thị select
    if (!mounted) return null;

    return (
        <div className="inline-flex items-center">
            <SunIcon className="w-4 h-4 mr-2" />
            <select
                name="themeSwitch"
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="border border-gray-300 rounded-md p-1"
            >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
        </div>
    );
};

export default ThemeSwitch;
