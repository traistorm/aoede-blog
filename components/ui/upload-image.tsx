import { useState } from 'react';
import {uploadFile} from "../../api/file.api";
import GradientCircularProgress from "../loading/GradientCircularProgress"

interface UploadImageProps {
    value?: string

    placeholder?: string

    error?: any;

    onChange?: (file: any) => void;

    onFocus?: () => void;

    setAlertDataFunction?: (type, message) => void;

    setValues?: (prevValues) => void;

    field?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({error, onChange, onFocus, placeholder, setValues, field, setAlertDataFunction}) => {
    const [uploadingImage, setUploadingImage] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024); // Kích thước tệp tính bằng MB

            if (fileSizeInMB > 1) {
                const fileInput = document.getElementById('upload-image') as HTMLInputElement;
                fileInput.value = null; // Reset giá trị của input file
                setAlertDataFunction("uploadingFail", "Maximum image size 1MB");
                return;
            }
            // Call APiI upload image
            setUploadingImage(true);
            uploadFile(file).then((res) => {
                if (onChange) {
                    onChange(res);
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
                setUploadingImage(false);
                setAlertDataFunction("success", "Image upload successful");
                setValues((prevValues) => ({
                    ...prevValues, // giữ nguyên các trường khác
                    [field]: res // thay đổi giá trị của field được truyền vào
                }));
            }, (err) => {
                if (onChange) {
                    onChange(null);
                }
                setPreview(null);
                setAlertDataFunction("uploadingFail", "Image upload failed");
                setUploadingImage(false);
                const fileInput = document.getElementById('upload-image') as HTMLInputElement;
                fileInput.value = null; // Reset giá trị của input file
            })
        } else {
            setPreview(null);
            if (onChange) {
                onChange(null);
            }
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);

        if (onChange) {
            onChange(null);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="w-full flex items-center">
            {!preview ? (
                <div className="w-full h-full flex items-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="upload-image"
                    />
                    <label
                        htmlFor="upload-image"
                        className="bg-gray-100 cursor-pointer p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-32 h-32 border border-gray-300 transition-all duration-300 ease-in-out hover:border-dashed hover:border-blue-500"
                    >
                        {/* SVG dấu cộng */}
                        {uploadingImage? (
                            <GradientCircularProgress size={20} />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8 mb-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        )}
                        {/* Nút Upload Image */}
                        {
                            uploadingImage? (
                                <span className="text-sm font-bold text-center">Uploading</span>
                            ) : (
                                <span className="text-sm font-bold text-center">{placeholder}</span>
                            )
                        }
                    </label>
                </div>
            ) : (
                <div
                    className="relative h-32 w-32"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                    />
                    <div
                        className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 rounded-full transition-opacity duration-200 ease-in-out ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                        {/* Preview Button */}
                        <button
                            onClick={openModal}
                            className="text-white shadow-md"
                        >
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </button>

                        {/* Remove Button */}
                        <button
                            onClick={handleRemoveImage}
                            className="text-white shadow-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out transform ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={closeModal}
            >
                <div
                    className={`rounded-lg`}
                    onClick={handleModalClick}
                >
                    <img
                        src={preview || ''}
                        alt="Full Preview"
                        style={{maxHeight: '90vh', maxWidth: "90vw"}}
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadImage;