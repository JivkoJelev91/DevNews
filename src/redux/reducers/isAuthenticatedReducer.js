import { IS_USER_AUTHENTICATED } from '../actions/AuthActions';

const initialState = {
    isAuthenticated: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_USER_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default: return state;
    }
}