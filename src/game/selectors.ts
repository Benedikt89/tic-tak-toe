import {createSelector} from "reselect";
import {AppStateType} from "../redux/store";

// @ts-ignore
export const getCurrentFields = (state:AppStateType) => state.reducer.fields;
// @ts-ignore
export const getFilters = (state:AppStateType) => state.products.filters;
export const getSelectedFilter = (state:AppStateType) => state.reducer.selectedFilter;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getIsAuth = (state:AppStateType) => state.auth.isAuth;

export const getProducts = createSelector(getCurrentFields, getSelectedFilter, (products, selectedFilter) => {
    return products.filter((p:any) => {
        if (selectedFilter !== 'USER') {
            if (p.filter)
            return p.filter.some((f:any) => f.name === selectedFilter);
        } else {
            return true;
        }
    })
});