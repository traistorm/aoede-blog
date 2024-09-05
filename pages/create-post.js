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
import Dropdown from "../components/ui/dropdown";
import {useTheme} from "next-themes";
import {getCategoryCombobox} from "../api/blogs.api";
import UploadImage from "../components/ui/upload-image";
import {useRouter} from "next/router";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const initDataFrom = {
    value: {
        title: '',
        description: '',
        content: "<p><br></p>",
        categories: [],
        thumbnailImage: ''
    },
    rules: {
        title: { required: true, minLength: 20, maxLength: 100 },
        description: { required: true, minLength: 20, maxLength: 100 },
        content: { required: true, minLength: 100, maxLength: 2000 },
        categories: { required: true },
        thumbnailImage: { required: true },
    },
    types: {
        title: 'input',
        description: 'input', // Thêm description nếu bạn cần loại này
        categories: 'dropdown',
        content: "input-react-quill",
        thumbnailImage: "image",
    },
};

export default function CreatePost({setAlertDataFunction}) {
    const router = useRouter();
    const [categoryOptions, setCategoryOptions] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);
    const {
        values,
        errors,
        register,
        handleSubmit,
        isValid,
        setValues
    } = useFormValidate(initDataFrom);

    useEffect(() => {
        getCategoryCombobox().then((res) => {
            setCategoryOptions(res)
        }, (err) => {
        })
    }, []);

    const createNewPost = () => {
        const category_ids = selectedCategories.map(label => {
            const option = categoryOptions.find(option => option.label === label);
            return option ? option.value : null; // Trả về value nếu tìm thấy, ngược lại trả về null
        }).filter(id => id !== null).join(','); // Lọc bỏ các giá trị null

        const postData = {
            description: values.description,
            title: values.title,
            content: values.content,
            categoryIds: category_ids,
            thumbnailImageUrl: values.thumbnailImage
        }
        createPost(postData).then((res) => {
            setAlertDataFunction("createSuccess", "Post created successfully");
            router.push("/post/" + res.title.replace(/\s+/g, '-').toLowerCase())
        }, (err) => {
        })
    }

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
                            <small>{errors.title}</small>
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
                            <small>{errors.description}</small>
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <Dropdown
                        selectedOptions={selectedCategories}
                        setSelectedOptions={setSelectedCategories}
                        errors={errors}
                        options={categoryOptions}
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
                <div className="mb-5">
                    {/*<div className="flex items-center space-x-2">
                        <div className="whitespace-nowrap">Thumbnail image</div>
                        <UploadImage
                            error={errors}
                            onChange={(value) => {
                                // Gọi onChange từ register
                                const event = {
                                    target: {name: 'thumbnailImage', value: value || null},
                                };
                                register('thumbnailImage', 'image', {required: true,}).onChange({target: {value}});
                            }}
                            onFocus={(value) => {
                                // Gọi onChange từ register
                                const event = {
                                    target: {name: 'thumbnailImage', value: value || null},
                                };
                                register('thumbnailImage', 'image', {required: true,}).onFocus({target: {value}});
                            }}
                        >

                        </UploadImage>
                    </div>*/}
                    <UploadImage
                        setAlertDataFunction={setAlertDataFunction}
                        value={values.thumbnailImage}
                        placeholder="Upload thumbnail"
                        error={errors}
                        onChange={(value) => {
                            // Gọi onChange từ register
                            const event = {
                                target: {name: 'thumbnailImage', value: value || null},
                            };
                            register('thumbnailImage', 'image', {required: true,}).onChange({target: {value}});
                        }}
                        onFocus={(value) => {
                            // Gọi onChange từ register
                            const event = {
                                target: {name: 'thumbnailImage', value: value || null},
                            };
                            register('thumbnailImage', 'image', {required: true,}).onFocus({target: {value}});
                        }}
                    >

                    </UploadImage>
                    {errors.thumbnailImage && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.thumbnailImage}</small>
                        </div>
                    )}
                </div>
                <div className="mb-5 custom-quill-editor">
                    <ReactQuill
                        placeholder="Typing conent here..."
                        id="content"
                        value={values.content}
                        onChange={(value) => {
                            // Gọi onChange từ register
                            register('content', 'input-react-quill', {
                                required: true,
                                minLength: 100,
                                maxLength: 2000
                            }).onChange({target: {value}});
                        }}
                        onFocus={() => register('content', 'input-react-quill', {
                            required: true,
                            minLength: 100,
                            maxLength: 2000
                        }).onFocus()} // Gọi onFocus
                        onBlur={() => register('content', 'input-react-quill', {
                            required: true,
                            minLength: 100, maxLength: 2000}).onBlur()}   // Gọi onBlur
                        className={`border-2  ${
                            errors.content ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0' : 
                                'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                        }`}
                    />
                    {errors.content && (
                        <div className="mt-1 text-red-600">
                            <small>{errors.content}</small>
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