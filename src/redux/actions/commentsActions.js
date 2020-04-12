import axios from 'axios'
import Notifications from 'react-notification-system-redux';
import { url } from '../../Config/Config';

export const submitComment = (comment) => dispatch => {
    return axios.post(`${url}/comments/submit-comment`, { comment })
        .then(comment => {
            dispatch(Notifications.success({ message: 'Comment added succsesfully!' }))
        })
        .catch(err => {
            dispatch(Notifications.error({ message: 'Something went wrong!',  }))
        })
}




