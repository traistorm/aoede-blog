import Container from "../components/container";
import DefaultLayout from "../layout/defaultlayout/default.layout";
import ContainerPage from "../components/container-page";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useFormValidate from "../hook/useFormValidate";
import {createPost} from "../api/user.api";
//import Select from 'react-select'
import {useTheme} from "next-themes";
import Dropdown from "../components/ui/dropdown";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const initDataFrom = {
    value: {
        title: '',
        description: '',
        content: "<p><br></p>",
        categories: []
    },
    rules: {
        title: { required: true, minLength: 20, maxLength: 100 },
        description: { required: true, minLength: 20, maxLength: 100 },
        content: { required: true, minLength: 100, maxLength: 2000 },
        categories: { required: true },
    },
    types: {
        title: 'input',
        description: 'input', // Thêm description nếu bạn cần loại này
        categories: 'dropdown',
        content: "input-react-quill",
    },
};

const categories = [
    { key: 'tech', label: 'Technology' },
    { key: 'health', label: 'Health' },
    { key: 'finance', label: 'Finance' },
    { key: 'education', label: 'Education' },
    // Thêm các mục khác nếu cần
];


export default function CreatePost({settings}) {
    const { theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(theme); // State để lưu theme hiện tại
    /*const categories = [
        { value: 'cat1', label: 'Category 1' },
        { value: 'cat2', label: 'Category 2' },
        { value: 'cat3', label: 'Category 3' },
    ];*/

    // Hàm kiểm tra và thiết lập theme từ localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setCurrentTheme(savedTheme);
            setTheme(savedTheme);
        }
    }, []);
    const {
        values,
        errors,
        register,
        handleSubmit,
        isValid,
        setValues
    } = useFormValidate(initDataFrom);
    const [content, setContent] = useState('');

    const createNewPost = () => {
        const postData = {
            title: values.title,
            content: values.content,
        }
        createPost(postData).then((res) => {

        }, (err) => {

        })
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            height: 50, // Thay đổi chiều cao tại đây
            minHeight: 50, // Chiều cao tối thiểu
            border: `2px solid ${state.isFocused ? (errors.categories ? 'red' : 'gray') : (errors.categories ? 'red' : 'rgb(209, 213, 219)')}`, // Border color
            boxShadow: state.isFocused ? (errors.categories ? '0 0 0 1px rgba(255, 0, 0, 0.5)' : '0 0 0 1px rgba(0, 0, 0, 0.2)') : null, // Shadow khi focus
            '&:hover': {
                border: `2px solid ${errors.categories ? 'red' : 'gray'}`, // Border hover
            },
            padding: '', // Padding tương ứng với py-3 px-4
            backgroundColor: state.isFocused ? (theme === 'dark' ? 'rgb(23,23,23)' : 'white') : (currentTheme === 'dark' ? 'rgb(23,23,23)' : 'white'), // Màu nền
        }),
        placeholder: (provided) => ({
            ...provided,
            marginLeft: '0.5em', // Đảm bảo margin là 0
            color: (theme === 'dark' ? 'white' : 'black')
        }),
        input: (provided) => ({
            ...provided,

            marginLeft: '0.5em'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#1a202c' : 'white', // Màu nền của menu
            border: `2px solid ${theme === 'dark' ? 'gray' : 'rgb(209, 213, 219)'}`, // Màu border của menu
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? (theme === 'dark' ? '#4a5568' : '#e2e8f0') : (theme === 'dark' ? '#1a202c' : 'white'), // Màu nền của option
            color: theme === 'dark' ? 'white' : 'black', // Màu chữ khi focus
        }),
    };

    const options = [
        { value: '1', label: 'Tùy chọn 1' },
        { value: '2', label: 'Tùy chọn 2' },
        { value: '3', label: 'Tùy chọn 3' },
        { value: '4', label: 'Tùy chọn 4' },
        { value: '5', label: 'Tùy chọn 5' },
    ];

    return (
        <Container>
            <ContainerPage>
                <div className="text-center mb-5">
                    <p className="text-lg">Create your post here!</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="email_address" className="sr-only">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        value={values.title}
                        {...register('title', 'input', { required: true, minLength: 20, maxLength: 100 })}
                        className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                            errors.title
                                ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                                : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                        }`}
                    />
                    {errors.title && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.title}</small> {/* Hiển thị thông báo lỗi */}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="email_address" className="sr-only">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        placeholder="description"
                        value={values.description}
                        {...register('description', 'input', { required: true, minLength: 20, maxLength: 100 })}
                        className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                            errors.description
                                ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                                : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                        }`}
                    />
                    {errors.description && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.description}</small> {/* Hiển thị thông báo lỗi */}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <Dropdown
                        options={options}
                        placeholder={"Select"}
                        onChange={(selectedOptions) => {
                            const event = {
                                target: { name: 'categories', value: selectedOptions || [] },
                            };
                            register('categories', 'dropdown', {required: true}).onChange(event);
                        }}
                        onFocus={(selectedOptions) => {
                            const event = {
                                target: { name: 'categories', value: selectedOptions || [] },
                            };
                            register('categories', 'dropdown', {required: true}).onFocus(event);
                        }}
                        onBlur={(selectedOptions) => {
                            const event = {
                                target: { name: 'categories', value: selectedOptions || [] },
                            };
                            register('categories', 'dropdown', {required: true}).onBlur(event);
                        }}
                    >
                    </Dropdown>
                    {errors.categories && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.categories}</small>
                        </div>
                    )}
                </div>
                {/*<div className="mb-5">
                    <select
                        multiple
                        value={selectedOptions}
                        onChange={handleChange}
                        className="block w-full h-36 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="1">Tùy chọn 1</option>
                        <option value="2">Tùy chọn 2</option>
                        <option value="3">Tùy chọn 3</option>
                        <option value="4">Tùy chọn 4</option>
                        <option value="5">Tùy chọn 5</option>
                    </select>
                    <Select
                        isMulti
                        name="categories"
                        options={categories}
                        styles={customStyles}
                        onChange={(selectedOptions) => {
                            const event = {
                                target: { name: 'categories', value: selectedOptions || [] },
                            };
                            register('categories', 'react-select', {required: true}).onChange(event);
                        }}
                        onFocus={(selectedOptions) => {
                            const event = {
                                target: { name: 'categories', value: selectedOptions || [] },
                            };
                            register('categories', 'react-select', {required: true}).onFocus(event);
                        }}
                        onBlur={(selectedOptions) => {
                            const event = {
                                target: { name: 'categories', value: selectedOptions || [] },
                            };
                            register('categories', 'react-select', {required: true}).onBlur(event);
                        }}
                        className={`basic-multi-select ${
                            errors.categories ? 'border-red-600' : ''
                        }`}
                        classNamePrefix="select"
                    />
                    {errors.categories && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.categories}</small>
                        </div>
                    )}
                </div>*/}
                <div className="mb-5">
                    <ReactQuill
                        id="content"
                        value={values.content}
                        onChange={(value) => {
                            // Gọi onChange từ register
                            register('content', 'input-react-quill', {required: true, minLength: 100, maxLength: 2000}).onChange({ target: { value } });
                        }}
                        onFocus={() => register('content', 'input-react-quill', { required: true }).onFocus()} // Gọi onFocus
                        onBlur={() => register('content', 'input-react-quill', { required: true }).onBlur()}   // Gọi onBlur
                        className={`border-2 ${
                            errors.content ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0' : 
                                'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                        }`}
                    />
                    {errors.content && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.content}</small> {/* Hiển thị thông báo lỗi */}
                        </div>
                    )}
                </div>
                <button
                    onClick={createNewPost}
                    disabled={!isValid()}
                    className={`py-4 font-semibold text-white transition-colors rounded-md pl-5 pr-5 pt-2 pb-2 
                    ${!isValid() ? 'bg-gray-400 ' : 'bg-gray-900 hover:bg-gray-800'} 
                    focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 
                    dark:bg-white dark:text-black ${!isValid() ? 'dark:bg-gray-600' : ''}`}>
                    Post
                </button>
            </ContainerPage>
        </Container>
    );
}

CreatePost.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}