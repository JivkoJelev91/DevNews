import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import loginReducer from './loginReducer';
import isAuthenthenticatedReducer from './isAuthenticatedReducer';
import commentsReducer from './commentsReducer';
import {reducer as notifications} from 'react-notification-system-redux';

export default combineReducers({
    posts: postsReducer,
    login: loginReducer,
    isAuth: isAuthenthenticatedReducer,
    comments: commentsReducer,
    notifications: notifications,
})