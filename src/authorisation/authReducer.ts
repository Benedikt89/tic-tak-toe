import {CHECK_IS_AUTH, I_userState, LOGIN_SUCCESS, LOGOUT_SUCCESS, usersReducerActions} from "./actions";

const initialState: I_userState = {
    isAuth: false,
    //for multiply users information
    userId: null,
    userName: null,
    error: null
};

const authorisationReducer = (state: I_userState = initialState, action: usersReducerActions) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: action.status,
                userName: action.userInfo.userName,
                error: null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                userId: null,
                userName: null,
                error: null
            };
        case CHECK_IS_AUTH:
            if (action.status) {
                return {
                    ...state,
                    isAuth: action.status,
                    error: null
                };
            } else return {
                ...state,
                isAuth: action.status,
                error: action.message
            };
        default:
            return state;
    }
};

export default authorisationReducer;