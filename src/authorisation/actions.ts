import {ThunkDispatch} from "redux-thunk";
import {authorisationAPI} from "./user-api";
import {stopSubmit} from "redux-form";

export const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'users/LOGOUT_SUCCESS';
export const CHECK_IS_AUTH = 'users/CHECK_IS_AUTH';

export interface I_logInData {username: string, password: string}

export interface I_userInfo {
    userId?: null | string,
    userName: null | string,
}
export interface I_userState extends I_userInfo {
    isAuth: boolean,
    error: string | null
}
export type usersReducerActions = I_authorisationSuccess | I_logOutSuccess | I_checkIsAuth

interface I_authorisationSuccess {
    type: typeof LOGIN_SUCCESS,
    status: boolean,
    userInfo: I_userInfo
}
interface I_logOutSuccess {
    type: typeof LOGOUT_SUCCESS,
}
interface I_checkIsAuth {
    type: typeof CHECK_IS_AUTH, status: boolean, message: string
}

//INTERNAL ACTIONS
export const _authorisationSuccess = (status: boolean, userInfo: I_userInfo): I_authorisationSuccess =>
    ({type: LOGIN_SUCCESS, status, userInfo});

export const _logOutSuccess = (): I_logOutSuccess =>
    ({type: LOGOUT_SUCCESS});

export const _checkIsAuth = (status: boolean, message: string): I_checkIsAuth =>
    ({type: CHECK_IS_AUTH, status, message});

//EXTERNAL ACTIONS
export const logOut = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    await authorisationAPI.logOut();
    dispatch(_logOutSuccess());
};
export const logIn = (data: I_logInData) => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    try {
        let res = await authorisationAPI.logIn(data);
        dispatch(_authorisationSuccess(true, res.userInfo ? res.userInfo : 'Stranger'));
    } catch (err) {
        let message = err.message.length > 0 ? err.message : "some error";
        dispatch(stopSubmit('logIn', {_error: message}))
    }
};
export const checkIsAuth = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    try {
        await authorisationAPI.checkAuth();
        dispatch(_checkIsAuth(true, 'Authorisation Success'));
    } catch (err) {
        let message = err.message ? err.message : 'Authorisation Failed';
        dispatch(_checkIsAuth(false, message));
    }
};
