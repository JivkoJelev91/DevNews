import axios from 'axios'
import { url } from '../../Config/Config';

export const submitComment = (comment) => dispatch => {
    return axios.post(`${url}/comments/submit-comment`, { comment })
        .then(comment => comment)
        .catch(err => err)
}

// req.body.post.post_id, req.body.comment i



