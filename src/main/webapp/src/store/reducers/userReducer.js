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
} from '../actions/actionTypes';

// import placeholder_user_image from '../../assets/images/placeholder.png';
// import default_background_image from '../../assets/images/default-background-image.jpg';

// loggedInUserDataReducer
const initialStateLoggedInUserData = {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    search: '',
    category: '',
    // profilePicUrl: placeholder_user_image,
    // backgroundImageUrl: default_background_image,
    authority: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const loggedInUserDataReducer = (state = initialStateLoggedInUserData, action) => {
    switch (action.type) {
        case FETCH_LOGGEDIN_USERDATA_BEGIN:
            return Object.assign({},
                state,
                initialStateLoggedInUserData,
                { loading: true }
            )
        case FETCH_LOGGEDIN_USERDATA_SUCCESS:
            return Object.assign({},
                state,
                action.payload,
                {
                    hasError: false,
                    error: '',
                    message: '',
                    status: '',
                    path: '',
                    loading: false,
                }
            )
        case FETCH_LOGGEDIN_USERDATA_ERROR:
            return Object.assign({},
                state,
                initialStateLoggedInUserData,
                {
                    hasError: true,
                    error: action.error,
                    message: action.message,
                    status: action.status,
                    path: action.path,
                    loading: false,
                }
            )
        case UPDATE_LOGGEDIN_USERDATA:
            return {
                ...state,
                ...action.payload,
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            };
        default:
            return state
    }
}

// timeLineUserDataReducer
const initialStateTimeLineUserData = {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    search: '',
    category: '',
    // profilePicUrl: placeholder_user_image,
    // backgroundImageUrl: default_background_image,
    authority: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const timeLineUserDataReducer = (state = initialStateTimeLineUserData, action) => {
    switch (action.type) {
        case FETCH_TIMELINE_USERDATA_BEGIN:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                { loading: true }
            )
        case FETCH_TIMELINE_USERDATA_SUCCESS:
            return Object.assign({},
                state,
                action.payload,
                {
                    hasError: false,
                    error: '',
                    message: '',
                    status: '',
                    path: '',
                    loading: false,
                }
            )
        case FETCH_TIMELINE_USERDATA_ERROR:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                {
                    hasError: true,
                    error: action.error,
                    message: action.message,
                    status: action.status,
                    path: action.path,
                    loading: false,
                }
            )
        case UPDATE_TIMELINE_USERDATA:
            return {
                ...state,
                ...action.payload,
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            };
        default:
            return state
    }
}


// updateUserReducer
const initialStateUpdateUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const updateUserReducer = (state = initialStateUpdateUser, action) => {
    switch (action.type) {
        case UPDATE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case UPDATE_USER_ERROR:
            return Object.assign({}, state, {
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state
    }
}

// fetchAllUsersReducer
const initialStateAllUsers = {
    userArr: [],
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const fetchAllUsersReducer = (state = initialStateAllUsers, action) => {
    switch (action.type) {
        case FETCH_ALLUSERS_BEGIN:
            return Object.assign({}, state, {
                userArr: [],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case FETCH_ALLUSERS_SUCCESS:
            return Object.assign({}, state, {
                userArr: [...action.payload],
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: false,
            })
        case FETCH_ALLUSERS_ERROR:
            return Object.assign({}, state, {
                userArr: [],
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        case CHANGE_USERROLE:
            return updateUserRole(state, action.payload)
        case DELETE_USER_SUCCESS:
            return removeUser(state, action.deletedUserId)
        default:
            return state
    }
}

const removeUser = (state, deletedUserId) => {
    const userArr = state.userArr.filter(user => user.id !== deletedUserId);

    return Object.assign({}, state, {
        userArr: [...userArr],
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}

const updateUserRole = (state, data) => {
    const { id, role } = data;

    const newUserArr = state.userArr.map((user) => {
        if (user.id !== id) {
            return user
        }

        return {
            ...user, role
        }
    })

    return Object.assign({}, state, {
        userArr: [...newUserArr],
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}

// deleteUser
const initialStateDeleteUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const deleteUserReducer = (state = initialStateDeleteUser, action) => {
    switch (action.type) {
        case DELETE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case DELETE_USER_ERROR:
            return Object.assign({}, state, {
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state
    }
}

// promoteUserReducer
const initialStatePromoteUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const promoteUserReducer = (state = initialStatePromoteUser, action) => {
    switch (action.type) {
        case PROMOTE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case PROMOTE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case PROMOTE_USER_ERROR:
            return Object.assign({}, state, {
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state
    }
}

// demoteUserReducer
const initialStateDemoteUser = {
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const demoteUserReducer = (state = initialStateDemoteUser, action) => {
    switch (action.type) {
        case DEMOTE_USER_BEGIN:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case DEMOTE_USER_SUCCESS:
            return Object.assign({}, state, {
                hasError: false,
                error: '',
                message: action.payload.message,
                status: '',
                path: '',
                loading: false,
            })
        case DEMOTE_USER_ERROR:
            return Object.assign({}, state, {
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state
    }
}

// changeTimeLineUserDataReducer
const initialStateChangeTimeLineUserData = {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    search: '',
    category: '',
    // profilePicUrl: placeholder_user_image,
    // backgroundImageUrl: default_background_image,
    authority: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const changeTimeLineUserDataReducer = (state = initialStateChangeTimeLineUserData, action) => {
    switch (action.type) {
        case CHANGE_TIMELINE_USERDATA_BEGIN:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                { loading: true }
            )
        case CHANGE_TIMELINE_USERDATA_SUCCESS:
            return Object.assign({},
                state,
                action.payload,
                {
                    hasError: false,
                    error: '',
                    message: '',
                    status: '',
                    path: '',
                    loading: false,
                }
            )
        case CHANGE_TIMELINE_USERDATA_ERROR:
            return Object.assign({},
                state,
                initialStateTimeLineUserData,
                {
                    hasError: true,
                    error: action.error,
                    message: action.message,
                    status: action.status,
                    path: action.path,
                    loading: false,
                }
            )
        default:
            return state
    }
}


// searchResults
const initialStateSearchResults = {
    friendsArrSearch: [],
    friendsCandidatesArr: [],
    userWaitingForAcceptingRequest: [],
    usersReceivedRequestFromCurrentUser: [],
    search: '',
    hasError: false,
    error: '',
    message: '',
    status: '',
    path: '',
    loading: false,
}

const searchResultsReducer = (state = initialStateSearchResults, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_BEGIN:
            return Object.assign({}, state, {
                friendsArrSearch: [],
                friendsCandidatesArr: [],
                userWaitingForAcceptingRequest: [],
                usersReceivedRequestFromCurrentUser: [],
                search: '',
                hasError: false,
                error: '',
                message: '',
                status: '',
                path: '',
                loading: true,
            })
        case SEARCH_RESULTS_SUCCESS:
            return setSearchResultsSuccessState(state, action.payload, action.search)
        case SEARCH_RESULTS_ERROR:
            return Object.assign({}, state, {
                friendsArrSearch: [],
                friendsCandidatesArr: [],
                userWaitingForAcceptingRequest: [],
                usersReceivedRequestFromCurrentUser: [],
                search: action.search,
                hasError: true,
                error: action.error,
                message: action.message,
                status: action.status,
                path: action.path,
                loading: false,
            })
        default:
            return state
    }
}

const setSearchResultsSuccessState = (state, response, search) => {
    const friendsArrSearch = response.filter(user => user.status === 1);
    const friendsCandidatesArr = response.filter(user => user.status !== 0 && user.status !== 1);
    const userWaitingForAcceptingRequest = response.filter(user => user.status === 0 && user.starterOfAction === true);
    const usersReceivedRequestFromCurrentUser = response.filter(user => user.status === 0 && user.starterOfAction === false);

    return Object.assign({}, state, {
        friendsArrSearch,
        friendsCandidatesArr,
        userWaitingForAcceptingRequest,
        usersReceivedRequestFromCurrentUser,
        search,
        hasError: false,
        error: '',
        message: '',
        status: '',
        path: '',
        loading: false,
    })
}

export {
    loggedInUserDataReducer,
    timeLineUserDataReducer,
    updateUserReducer,
    fetchAllUsersReducer,
    promoteUserReducer,
    demoteUserReducer,
    changeTimeLineUserDataReducer,
    deleteUserReducer,
    searchResultsReducer,
}