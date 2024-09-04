// components/Dropdown.tsx
import { useEffect, useRef, useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    options: Option[];

    placeholder: string;

    onChange?: (selectedOptions: string[]) => void; // Hàm gọi khi thay đổi

    onFocus?: () => void; // Hàm gọi khi focus

    onBlur?: () => void; // Hàm gọi khi blur
}

const Dropdown: React.FC<DropdownProps> = ({ options , placeholder, onChange, onFocus, onBlur}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference để kiểm tra click ra ngoài

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionChange = (value: string) => {
        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.indexOf(value) !== -1
                ? prev.filter((option) => option !== value)
                : [...prev, value];

            // Gọi onChange nếu có
            if (onChange) {
                onChange(newSelectedOptions);
            }
            return newSelectedOptions;
        });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            if (onBlur) {
                onBlur();
            }
        }
    };

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    useEffect(() => {
        // Thêm sự kiện click để kiểm tra click ra ngoài
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Xóa sự kiện khi component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-64 mt-4" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                onFocus={handleFocus}
                className="block w-full p-2 text-left border border-gray-300 rounded-md bg-white focus:outline-none focus:border-blue-500"
            >
                {selectedOptions.length > 0
                    ? `${selectedOptions.join(', ')}`
                    : placeholder
                }
            </button>
            <div
                className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                    overflow: isOpen ? 'visible' : 'hidden'
                }}
            >
                {options.map(option => (
                    <label
                        key={option.value}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionChange(option.value)}
                    >
                        <span>{option.label}</span>
                        {selectedOptions.indexOf(option.value) !== -1 && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
