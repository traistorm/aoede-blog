// redux/store.js
import {applyMiddleware, compose, createStore} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Tạo reducers của bạn ở đây

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
));

export default store;