// Khởi tạo trạng thái ban đầu của ứng dụng
const initialState = {
    //videoUrl: ""
};

// Định nghĩa reducers
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIDEO_URL':
            return {
                ...state,
                videoUrl: "https://www.youtube.com/watch?v=" + action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
};

export default rootReducer;