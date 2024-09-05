// components/Dropdown.tsx
import { useEffect, useRef, useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    options: Option[];

    placeholder: string;

    errors: any;

    selectedOptions: any;

    setSelectedOptions: any;

    onChange?: (selectedOptions: string[]) => void; // Hàm gọi khi thay đổi

    onFocus?: () => void; // Hàm gọi khi focus

    onBlur?: () => void; // Hàm gọi khi blur
}

const Dropdown: React.FC<DropdownProps> = ({ options , placeholder, onChange, onFocus, onBlur, errors, selectedOptions, setSelectedOptions}) => {
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

    const handleRemoveSelected = (value: string) => {
        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.filter((option) => option !== value);
            if (onChange) {
                onChange(newSelectedOptions);
            }
            return newSelectedOptions;
        });
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
        <div className={`relative w-full border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
            errors.categories
                ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
        }`} ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                onFocus={handleFocus}
                className="p-3 flex w-full overflow-x-auto space-x-2 placeholder:text-gray-800"
            >
                {selectedOptions.length > 0 ? (
                    selectedOptions.map((selected) => (
                        <div key={selected} className="flex items-center p-1 space-x-2 bg-gray-200 rounded-md dark:bg-gray-200">
                            <div className="whitespace-nowrap dark:text-black">
                                {options.filter((option) => option.label === selected).map((option) => option.label)[0]}
                            </div>
                            <div className="cursor-pointer" onClick={() => {
                                handleRemoveSelected(selected);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 dark:text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className="text-gray-800 dark:text-gray-200">{placeholder}</span>
                )}
            </button>
            <div
                className={`dark:bg-gray-200 absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                    overflow: isOpen ? 'visible' : 'hidden'
                }}
            >
                {options.map(option => (
                    <label
                        key={option.value}
                        className="dark:text-black flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionChange(option.label)}
                    >
                        <span>{option.label}</span>
                        {selectedOptions.indexOf(option.label) !== -1 && (
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
