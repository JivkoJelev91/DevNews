import axios from 'axios';
import { url } from '../../Config/Config';
import { authenticateUser } from './AuthActions';
import Notifications from 'react-notification-system-redux';

export const GET_PROFILE_SUCCESS = 'LOGIN_SUCCESS';
export const GET_PROFILE_FAILED = 'LOGIN_FAILED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const getProfile = (token) => dispatch => {
    axios.defaults.headers.common = {
        'Authorization': `Basic ${token.toString()}`
    }
    return axios.get(`${url}/users/profile` )
            .then(user => dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: user.data
            }))
            .catch(err => dispatch({
                type: GET_PROFILE_FAILED,
            }))
};

export const loginFacebook = (userDetails) => dispatch => {
    return axios.post(`${url}/users/get-or-create-profile`, userDetails)
        .then(user => {
            if (user && user.data.success) {
                dispatch(authenticateUser(user.data.token));
                dispatch(Notifications.success({ message: 'Login succsess!' }))
            }
        })
        .catch(err => {
            dispatch(Notifications.error({ message: 'Login was failed!' }))
        });
};

// export const loginGoogle = (userDetails) => dispatch => {
//     return axios.post(`${url}/auth/google`, userDetails)
//         .then(user => dispatch({
//             type: LOGIN_SUCCESS,
//             payload: user
//         }))
//         .catch(err => dispatch({
//             type: LOGIN_FAILED,
//             payload: err
//         }))
// };

// export const loginTwiiter = () => dispatch => {
//     return axios.post(`${url}/auth/twitter`)
//         .then(user => dispatch({
//             type: LOGIN_SUCCESS,
//             payload: user
//         }))
//         .catch(err => dispatch({
//             type: LOGIN_FAILED,
//             payload: err
//         }))
// };

// export const loginGithub = () => dispatch => {
//     return axios.post(`${url}/auth/github`)
//         .then(user => dispatch({
//             type: LOGIN_SUCCESS,
//             payload: user
//         }))
//         .catch(err => dispatch({
//             type: LOGIN_FAILED,
//             payload: err
//         }))
// };