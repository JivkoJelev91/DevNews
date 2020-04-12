export const IS_USER_AUTHENTICATED = 'IS_USER_AUTHENTICATED';

export const authenticateUser = (token) => dispatch => {
    localStorage.setItem('token', token);
    return dispatch({
        type: IS_USER_AUTHENTICATED,
        payload: true
    })
};

export const deauthenticateUser = () => dispatch => {
    localStorage.removeItem('token');
    return dispatch({
        type: IS_USER_AUTHENTICATED,
        payload: false
    })
};

export const checkUserAuth = () => dispatch => {
  const isAuth = localStorage.getItem('token') !== null;
  return isAuth ? 
      dispatch(authenticateUser(dispatch(getToken()))) : 
      dispatch({
        type: IS_USER_AUTHENTICATED,
        payload: false
      })
};

export const getToken = () => dispatch => localStorage.getItem('token');

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     *
    authenticateUser: (token) => {
      localStorage.setItem('token', token);
    },
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     *
    isUserAuthenticated: () => {
      return localStorage.getItem('token') !== null;
    },
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     *
    deauthenticateUser: () => {
      localStorage.removeItem('token');
    },
    /**
     * Get a token value.
     *
     * @returns {string}
     *
  
    getToken: () => {
      return localStorage.getItem('token');
    }**/
