import { useState } from 'react';

type InputType = 'input' | 'input-react-quill' | 'react-select' | 'dropdown';
type Rule = {
    required?: boolean;

    minLength?: number;

    maxLength?: number;
};

const useFormValidate = (initialData) => {
    const [types, setTypes] = useState(initialData.types);
    const [values, setValues] = useState(initialData.value);
    const [errors, setErrors] = useState({});
    const [rulesData, setRulesData] = useState(initialData.rules);
    const [isFirstFocus, setIsFirstFocus] = useState({});

    const validate = (name, value, rules) => {
        const newErrors = { ...errors };
        // Kiểm tra điều kiện required
        if (types[name] === "input-react-quill") {
            if (rules.required && value === "<p><br></p>") {
                newErrors[name] = 'This field is required';
            } else {
                newErrors[name] = null;
            }
        } else if (types[name] === "dropdown") {
            if (rules.required && Array.isArray(value) && value.length === 0) {
                newErrors[name] = 'This field is required';
            } else {
                newErrors[name] = null;
            }
        } else {
            if (rules.required && !value) {
                newErrors[name] = 'This field is required';
            } else {
                newErrors[name] = null;
            }
        }
        if (newErrors[name] == null) {
            if (rules.minLength && value.length < rules.minLength) {
                newErrors[name] = `Must be at least ${rules.minLength} characters`;
            } else if (rules.maxLength && value.length > rules.maxLength) {
                newErrors[name] = `Must be at most ${rules.maxLength} characters`;
            } else {
                delete newErrors[name];
            }
        }
        // Kiểm tra điều kiện maxLength
        setErrors(newErrors);

    };

    const register = (name, type: InputType, rules: Rule) => ({
        name,
        value: values[name] || '',
        onChange: (e) => {
            const value = e.target.value;

            setTypes({
                ...types,
                [name]: type
            })

            setValues({
                ...values,
                [name]: value,
            });

            setRulesData({
                ...rulesData,
                [name]: rules
            })

            if (isFirstFocus[name]) {
                validate(name, value, rules);
            }
        },
        onFocus: () => {
            if (!isFirstFocus[name]) {
                setIsFirstFocus((prev) => ({ ...prev, [name]: true }));
            }
        },
        onBlur: () => {
            if (isFirstFocus[name]) {
                validate(name, values[name], rules);
            }
        },
    });

    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        const newErrors = {};

        Object.keys(values).forEach((key) => {
            validate(key, values[key], errors[key] || {});
        });

        if (Object.keys(newErrors).length === 0) {
            callback(values);
        } else {
            setErrors(newErrors);
        }
    };
    const isValid = () => {
        // Giả định rằng `rulesData` và `types` đã được khai báo và chứa dữ liệu hợp lệ
        for (let key of Object.keys(values)) {
            // Kiểm tra điều kiện required
            if (types[key] === "input-react-quill") {
                if (rulesData[key]?.required && values[key] === "<p><br></p>") {
                    return false; // Trả về false nếu vi phạm điều kiện required
                }
            } else {
                if (rulesData[key]?.required && !values[key]) {
                    return false; // Trả về false nếu vi phạm điều kiện required
                }
            }

            // Kiểm tra điều kiện minLength
            if (rulesData[key]?.minLength && values[key].length < rulesData[key].minLength) {
                return false; // Trả về false nếu vi phạm điều kiện minLength
            }

            // Kiểm tra điều kiện maxLength
            if (rulesData[key]?.maxLength && values[key].length > rulesData[key].maxLength) {
                return false; // Trả về false nếu vi phạm điều kiện maxLength
            }
        }

        // Nếu tất cả đều hợp lệ, trả về true
        return true;
    };

    return {
        values,
        errors,
        register,
        handleSubmit,
        isValid,
        setValues
    };
};

export default useFormValidate;
