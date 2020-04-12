import axios from 'axios'
import { url } from '../../Config/Config';
import Notifications from 'react-notification-system-redux';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const GET_DRAFT_POST = 'GET_DRAFT_POST';

export const GET_CURRENT_POST = 'GET_CURRENT_POST';

export const UPLOAD_COVER_IMAGE = 'UPLOAD_COVER_IMAGE';


export const likePost = (postId) => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common = {
            'Authorization': `Basic ${token.toString()}`
        }
    }
    return axios.post(`${url}/posts/like-post`, { postId })
        .then(like => like)
        .then(err => err)
}

export const getCurrentPost = (id) => dispatch => {
    return axios.get(`${url}/posts/get-published-post/${id}`)
        .then(post => {
            return dispatch({
                type: GET_CURRENT_POST,
                payload: post.data.post
            })
        })
        .then(err => err)
};

export const getPosts = (page, pageSize) => dispatch => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    return axios.get(`${url}/posts/feed/?page=${page}&pagesize=${pageSize}`)
        .then(posts => {
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: posts.data
            })
        })
        .then(err => err)
};


export const createCoverImage = (formData) => dispatch => {
    return axios.post(`${url}/posts/cover-image`, formData, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
        .then(img => {
            dispatch(Notifications.success({ message: 'Title image is uploaded!' }))
            return img;
        })
        .catch(err => dispatch(Notifications.error({ message: 'Title image is not uploaded!' })))
}

export const getDraftPost = (postId) => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common = {
            'Authorization': `Basic ${token.toString()}`
        }
    }
    if (postId) {
        return axios.get(`${url}/posts/get-draft-post/${postId}`)
            .then(draftPost => {
                dispatch({
                    type: GET_DRAFT_POST,
                    payload: draftPost.data.post
                })
            })
            .catch(err => dispatch({
                type: GET_DRAFT_POST,
                payload: null
            }))
    }
    else {
        dispatch({
            type: GET_DRAFT_POST,
            payload: null
        })
    }
}

export const createDraftPost = (post) => dispatch => {
    return axios.post(`${url}/posts/create-draft-post`, { post })
        .then(res => {
            dispatch(Notifications.success({ message: 'Draft is created succsesfully!' }))
            return res.data.post_id
        })
        .catch(err => dispatch(Notifications.error({ message: 'Draft is not created!' })))
}

export const editDraftPost = (post) => dispatch => {
    return axios.put(`${url}/posts/edit-draft-post`, { post })
        .then(res => {
            dispatch(Notifications.success({ message: 'Draft is edited succsesfully!' }))
            return res.data.post_id
        })
        .catch(err => dispatch(Notifications.error({ message: 'Draft is not edited!' })))
}

export const makePostPublic = (postId) => dispatch => {
    return axios.put(`${url}/posts/make-post-public`, { post_id: postId })
        .then(res => {
            dispatch(getDraftPost(postId))
            dispatch(Notifications.success({ message: 'Post is publish succsesfully!' }))
        })
        .catch(err => {
            dispatch(Notifications.error({ message: 'Post is not publish!' }))
        })
}

export const searchPost = (word, page, pageSize) => dispatch => {
    return axios.get(`${url}/posts/search/?q=${word}&page=${page}&pagesize=${pageSize}`)
        .then(posts => {
            return dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: posts.data.posts
            })
        })
        .catch(err => err)
}


