import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    GET_CURRENT_POST,
    GET_DRAFT_POST,
} from '../actions/postsActions';

import { uniqueBy } from '../../helpers/helper';

const initialState = {
    posts: [],
    totalPages: 0,
    loading: false,
    coverImage: '',
    currentPost: null,
    draftPost: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: uniqueBy(state.posts.concat(action.payload.posts), '_id'),
                totalPages: action.payload.total_pages,
                loading: false,
            }
        case FETCH_POSTS_ERROR:
            return {
                ...state,
                loading: false,
            }

        case GET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload,
            }
        case GET_DRAFT_POST:
            return {
                ...state,
                draftPost: action.payload,
            }
      
        default: return state;
    }
}