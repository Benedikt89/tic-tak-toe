import {ThunkDispatch} from "redux-thunk";
import {authorisationAPI} from "./user-api";
import {stopSubmit} from "redux-form";

const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'users/LOGOUT_SUCCESS';
const CHECK_IS_AUTH = 'users/CHECK_IS_AUTH';


interface I_userInfo {
    userId?: null | string,
    userName: null | string,
}
interface I_userState extends I_userInfo {
    isAuth: boolean,
}

const initialState: I_userState = {
    isAuth: false,
    userId: null,
    userName: null,
};

type usersReducerActions = I_authorisationSuccess | I_logOutSuccess | I_checkIsAuthSuccess

interface I_authorisationSuccess {
    type: typeof LOGIN_SUCCESS,
    status: boolean,
    userInfo: I_userInfo
}
interface I_logOutSuccess {
    type: typeof LOGOUT_SUCCESS,
}
interface I_checkIsAuthSuccess {
    type: typeof CHECK_IS_AUTH, data: any
}

const authorisationReducer = (state: I_userState = initialState, action: usersReducerActions) => {
    switch (action.type) {
        //setting fetching status
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: action.status,
                userName: action.userInfo.userName ? action.userInfo.userName : null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                userId: null,
                userName: null,
            };
        default:
            return state;
    }
};

export const _authorisationSuccess = (status: boolean, userInfo: I_userInfo): I_authorisationSuccess => {
    return {
        type: LOGIN_SUCCESS, status, userInfo
    }
};
export const _logOutSuccess = (): I_logOutSuccess => {
    return {
        type: LOGOUT_SUCCESS
    }
};
export const _checkIsAuthSuccess = (data: any): I_checkIsAuthSuccess => {
    return {
        type: CHECK_IS_AUTH, data
    }
};

export const logOut = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    await authorisationAPI.logOut();
    dispatch(_logOutSuccess());
};
export const logIn = (data: any) => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    try {
        let res = await authorisationAPI.logIn(data);
        dispatch(_authorisationSuccess(true, res.userInfo ? res.userInfo : 'name do not exist'));
    } catch (e) {
        let message = e.message.length > 0 ? e.message : "some error";

        dispatch(stopSubmit('logIn', {_error: message}))
    }
};
export const checkIsAuth = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    let data = await authorisationAPI.checkAuth();
    dispatch(_checkIsAuthSuccess(data));
};

export default authorisationReducer;