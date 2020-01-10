import {createSelector} from "reselect";
import {AppStateType} from "../redux/store";

export const getSelectedFilter = (state:AppStateType) => state.reducer.selectedFilter;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getIsAuth = (state:AppStateType) => state.auth.isAuth;
