import { registerReducer, loginReducer, registerErrorReducer, loginErrorReducer, } from './authReducer';
import { ajaxStatusReducer, ajaxErrorReducer } from './ajaxReducer';
import { addPictureReducer, removePictureReducer, fetchPictureReducer, changePictureReducer } from './pictureReducer';
import {
    loggedInUserDataReducer, timeLineUserDataReducer,
    updateUserReducer, fetchAllUsersReducer, promoteUserReducer, demoteUserReducer, changeTimeLineUserDataReducer,
    deleteUserReducer, searchResultsReducer,
} from './userReducer';
import { fetchAllLogsReducer, findLogsByUserNameReducer, clearLogsByUserNameReducer, clearAllLogsReducer } from './logsReducer';

export default {
    ajaxStatus: ajaxStatusReducer,
    ajaxError: ajaxErrorReducer,
    register: registerReducer,
    login: loginReducer,
    registerError: registerErrorReducer,
    loginError: loginErrorReducer,
    updateUserData: updateUserReducer,
    fetchAllUsers: fetchAllUsersReducer,
    fetchPictures: fetchPictureReducer,
    loggedInUserData: loggedInUserDataReducer,
    timeLineUserData: timeLineUserDataReducer,
    promoteUserData: promoteUserReducer,
    demoteUserData: demoteUserReducer,
    changeTimeLineUserData: changeTimeLineUserDataReducer,
    changePicture: changePictureReducer,
    addPicture: addPictureReducer,
    removePicture: removePictureReducer,
    fetchAllLogs: fetchAllLogsReducer,
    findLogsByUserName: findLogsByUserNameReducer,
    clearLogsByUserName: clearLogsByUserNameReducer,
    clearAllLogs: clearAllLogsReducer,
    deleteUser: deleteUserReducer,
    searchResults: searchResultsReducer,
};