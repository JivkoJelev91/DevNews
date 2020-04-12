import axios from 'axios'
import Notifications from 'react-notification-system-redux';
import { url } from '../../Config/Config';

export const GET_COMMENTS = 'GET_COMMENTS';

export const submitComment = (comment) => dispatch => {
    return axios.post(`${url}/comments/submit-comment`, { comment })
        .then(comment => {
            dispatch(getComments(comment.post_id));
            dispatch(Notifications.success({ message: 'Comment added succsesfully!' }))
        })
        .catch(err => {
            dispatch(Notifications.error({ message: 'Something went wrong!',  }))
        })
}

export const getComments = (postId) => dispatch => {
    return axios.post(`${url}/comments/post-comments/${postId}`)
        .then(comments => {
            dispatch({
                type: GET_COMMENTS,
                payload: comments.data
            })
        })
        .catch(err => err)
}




