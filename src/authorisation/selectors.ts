import {AppStateType} from "../redux/store";

export const getIsAuth = (state:AppStateType) => state.auth.isAuth;
