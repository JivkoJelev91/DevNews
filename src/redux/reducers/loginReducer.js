import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED
} from '../actions/loginActions';

const initialState = {
    user: {},
    isLogedIn: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case GET_PROFILE_FAILED:
            return {
                ...state,
                user: {}
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogedIn: action.payload
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLogedIn: action.payload
            }
        default: return state;
    }
}