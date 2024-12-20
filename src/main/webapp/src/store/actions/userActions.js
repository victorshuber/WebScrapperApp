import { requester } from '../../infrastructure';
import {
    FETCH_LOGGEDIN_USERDATA_BEGIN, FETCH_LOGGEDIN_USERDATA_SUCCESS, FETCH_LOGGEDIN_USERDATA_ERROR, UPDATE_LOGGEDIN_USERDATA,
    FETCH_TIMELINE_USERDATA_BEGIN, FETCH_TIMELINE_USERDATA_SUCCESS, FETCH_TIMELINE_USERDATA_ERROR, UPDATE_TIMELINE_USERDATA,
    UPDATE_USER_SUCCESS, UPDATE_USER_BEGIN, UPDATE_USER_ERROR,
    FETCH_ALLUSERS_SUCCESS, FETCH_ALLUSERS_BEGIN, FETCH_ALLUSERS_ERROR,
    PROMOTE_USER_SUCCESS, PROMOTE_USER_BEGIN, PROMOTE_USER_ERROR,
    DEMOTE_USER_SUCCESS, DEMOTE_USER_BEGIN, DEMOTE_USER_ERROR, CHANGE_USERROLE,
    CHANGE_TIMELINE_USERDATA_SUCCESS, CHANGE_TIMELINE_USERDATA_BEGIN, CHANGE_TIMELINE_USERDATA_ERROR,
    DELETE_USER_SUCCESS, DELETE_USER_BEGIN, DELETE_USER_ERROR,
    SEARCH_RESULTS_SUCCESS, SEARCH_RESULTS_BEGIN, SEARCH_RESULTS_ERROR,
} from './actionTypes';




// fetchLoggedInUser
const fetchLoggedInUserSuccess = (userData) => {
    return {
        type: FETCH_LOGGEDIN_USERDATA_SUCCESS,
        payload: userData
    }
}

const fetchLoggedInUserBegin = () => {
    return {
        type: FETCH_LOGGEDIN_USERDATA_BEGIN,
    }
}

const fetchLoggedInUserError = (error, message, status, path) => {
    return {
        type: FETCH_LOGGEDIN_USERDATA_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateLoggedInUserDataAction = (userData) => {
    return {
        type: UPDATE_LOGGEDIN_USERDATA,
        payload: userData
    }
}

const fetchLoggedInUserAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchLoggedInUserBegin())
        return requester.get(`/users/details/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchLoggedInUserError(error, message, status, path));
            } else {
                dispatch(fetchLoggedInUserSuccess(response));

            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchLoggedInUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// fetchTimeLineUser
const fetchTimeLineUserSuccess = (userData) => {
    return {
        type: FETCH_TIMELINE_USERDATA_SUCCESS,
        payload: userData
    }
}

const fetchTimeLineUserBegin = () => {
    return {
        type: FETCH_TIMELINE_USERDATA_BEGIN,
    }
}

const fetchTimeLineUserError = (error, message, status, path) => {
    return {
        type: FETCH_TIMELINE_USERDATA_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateTimeLineUserDataAction = (userData) => {
    return {
        type: UPDATE_TIMELINE_USERDATA,
        payload: userData
    }
}

const fetchTimeLineUserAction = (userId) => {
    return (dispatch) => {
        dispatch(fetchTimeLineUserBegin())
        return requester.get(`/users/details/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchTimeLineUserError(error, message, status, path));
            } else {
                dispatch(fetchTimeLineUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchTimeLineUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// changeCurrentTimeLineUser
const changeCurrentTimeLineUserSuccess = (userData) => {
    return {
        type: CHANGE_TIMELINE_USERDATA_SUCCESS,
        payload: userData
    }
}

const changeCurrentTimeLineUserBegin = () => {
    return {
        type: CHANGE_TIMELINE_USERDATA_BEGIN,
    }
}

const changeCurrentTimeLineUserError = (error, message, status, path) => {
    return {
        type: CHANGE_TIMELINE_USERDATA_ERROR,
        error,
        message,
        status,
        path,
    }
}

const changeCurrentTimeLineUserAction = (userId) => {
    return (dispatch) => {
        dispatch(changeCurrentTimeLineUserBegin())
        return requester.get(`/users/details/${userId}`, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(changeCurrentTimeLineUserError(error, message, status, path));
            } else {
                dispatch(updateTimeLineUserDataAction(response));
                dispatch(changeCurrentTimeLineUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(changeCurrentTimeLineUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}


// updateUser
const updateUserSuccess = (response) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: response
    }
}

const updateUserBegin = () => {
    return {
        type: UPDATE_USER_BEGIN,
    }
}

const updateUserError = (error, message, status, path) => {
    return {
        type: UPDATE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const updateUserAction = (loggedInUserId, otherProps) => {
    const timeLineUserId = otherProps.id;

    return (dispatch) => {
        dispatch(updateUserBegin())
        return requester.put('/users/update/' + loggedInUserId, { ...otherProps }, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(updateUserError(error, message, status, path));
            } else {
                dispatch(updateTimeLineUserDataAction(otherProps));
                if (loggedInUserId === timeLineUserId) {
                    dispatch(updateLoggedInUserDataAction(otherProps));
                }
                dispatch(updateUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(updateUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// deleteUser
const deleteUserSuccess = (response, userId) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: response,
        deletedUserId: userId,
    }
}

const deleteUserBegin = () => {
    return {
        type: DELETE_USER_BEGIN,
    }
}

const deleteUserError = (error, message, status, path) => {
    return {
        type: DELETE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const deleteUserAction = (userId) => {
    return (dispatch) => {
        dispatch(deleteUserBegin())
        return requester.delete('/users/delete/' + userId, {}, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(deleteUserError(error, message, status, path));
            } else {
                dispatch(deleteUserSuccess(response, userId));
           
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(deleteUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// fetchAllUsers
const fetchAllUsersSuccess = (userArr) => {
    return {
        type: FETCH_ALLUSERS_SUCCESS,
        payload: userArr
    }
}

const fetchAllUsersBegin = () => {
    return {
        type: FETCH_ALLUSERS_BEGIN,
    }
}

const fetchAllUsersError = (error, message, status, path) => {
    return {
        type: FETCH_ALLUSERS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const fetchAllUsersAction = (loggedInUserId) => {
    return (dispatch) => {
        dispatch(fetchAllUsersBegin())
        return requester.get('/users/all/' + loggedInUserId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(fetchAllUsersError(error, message, status, path));
            } else {
                dispatch(fetchAllUsersSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(fetchAllUsersError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// updateUserRole
const updateUserRoleAction = (data) => {
    return {
        type: CHANGE_USERROLE,
        payload: data
    }
}

// promoteUser
const promoteUserSuccess = (userArr) => {
    return {
        type: PROMOTE_USER_SUCCESS,
        payload: userArr
    }
}

const promoteUserBegin = () => {
    return {
        type: PROMOTE_USER_BEGIN,
    }
}

const promoteUserError = (error, message, status, path) => {
    return {
        type: PROMOTE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const promoteUserAction = (userId) => {
    return (dispatch) => {
        dispatch(promoteUserBegin())
        return requester.post('/users/promote?id=' + userId, userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(promoteUserError(error, message, status, path));
            } else {
                dispatch(updateUserRoleAction({ role: 'ADMIN', id: userId }));
                dispatch(promoteUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(promoteUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

// demoteUser
const demoteUserSuccess = (userArr) => {
    return {
        type: DEMOTE_USER_SUCCESS,
        payload: userArr
    }
}

const demoteUserBegin = () => {
    return {
        type: DEMOTE_USER_BEGIN,
    }
}

const demoteUserError = (error, message, status, path) => {
    return {
        type: DEMOTE_USER_ERROR,
        error,
        message,
        status,
        path,
    }
}

const demoteUserAction = (userId) => {
    return (dispatch) => {
        dispatch(demoteUserBegin())
        return requester.post('/users/demote?id=' + userId, userId, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(demoteUserError(error, message, status, path));
            } else {
                dispatch(updateUserRoleAction({ role: 'USER', id: userId }));
                dispatch(demoteUserSuccess(response));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(demoteUserError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}





// searchResults
const searchResultsSuccess = (response, search) => {
    return {
        type: SEARCH_RESULTS_SUCCESS,
        payload: response,
        search: search,
    }
}

const searchResultsBegin = () => {
    return {
        type: SEARCH_RESULTS_BEGIN,
    }
}

const searchResultsError = (error, message, status, path) => {
    return {
        type: SEARCH_RESULTS_ERROR,
        error,
        message,
        status,
        path,
    }
}

const searchResultsAction = (loggedInUserId, search) => {
    return (dispatch) => {
        dispatch(searchResultsBegin())
        return requester.post('/relationship/search', {loggedInUserId, search}, (response) => {
            if (response.error) {
                const { error, message, status, path } = response;
                dispatch(searchResultsError(error, message, status, path));
            } else {
                dispatch(searchResultsSuccess(response, search));
            }
        }).catch(err => {
            if (err.status === 403 && err.message === 'Your JWT token is expired. Please log in!') {
                localStorage.clear();
            }
            dispatch(searchResultsError('', `Error: ${err.message}`, err.status, ''));
        })
    }
}

export {
    fetchLoggedInUserAction,
    updateLoggedInUserDataAction,
    fetchTimeLineUserAction,
    updateTimeLineUserDataAction,
    updateUserAction,
    fetchAllUsersAction,
    promoteUserAction,
    demoteUserAction,
    updateUserRoleAction,
    changeCurrentTimeLineUserAction,
    deleteUserAction,
    searchResultsAction,
};