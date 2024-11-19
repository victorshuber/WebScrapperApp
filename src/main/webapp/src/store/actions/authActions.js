import { LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED, REGISTER_SUCCESS, REGISTER_ERROR, LOGOUT_SUCCESS } from './actionTypes';
import { ajaxBegin, ajaxEnd } from './ajaxActions';
import { requester } from '../../infrastructure';

function registerSuccess(message) {
    return {
        type: REGISTER_SUCCESS,
        message
    }
}

function registerError(messsage) {
    return {
        type: REGISTER_ERROR,
        messsage
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    }
}

function loginError(messsage) {
    return {
        type: LOGIN_ERROR,
        messsage
    }
}

function redirectAction() {
    return {
        type: REDIRECTED
    }
}

function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}


function registerAction(userData) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return requester.post('/register', { ...userData }, (response) => {
            if (response.status === 200) {
                dispatch(registerSuccess(response.data.message))
            } else {
                dispatch(registerError(response.data.message))
            }
            dispatch(ajaxEnd());
        }).catch(err => {
            dispatch(registerError(`${err.message}`));
            dispatch(ajaxEnd());
        })
    }
}

function loginAction(userEmail, password) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return requester.post('/login', { userEmail, password }, (response) => {
            if (response.error) {
                dispatch(loginError(' Incorrect credentials!'));
            } else {
                saveToken(response.data)
                dispatch(loginSuccess());
            }
            dispatch(ajaxEnd());
        }).catch(err => {
            localStorage.clear();
            dispatch(loginError(`${err.message}`));
            dispatch(ajaxEnd());
        })
    }
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutSuccess())
    }
}

function saveToken(response) {
    const token = response.token;
    localStorage.setItem('token', token);
}

export { loginAction, redirectAction, registerAction, logoutAction };