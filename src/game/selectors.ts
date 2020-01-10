import {createSelector} from "reselect";
import {AppStateType} from "../redux/store";

// @ts-ignore
export const _getProducts = (state:AppStateType) => state.products.products;
// @ts-ignore
export const getFilters = (state:AppStateType) => state.products.filters;
export const getSelectedFilter = (state:AppStateType) => state.reducer.selectedFilter;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getOrder = (state:AppStateType) => state.reducer.order;
export const getIsAuth = (state:AppStateType) => state.auth.isAuth;

export const getProducts = createSelector(_getProducts, getSelectedFilter, (products, selectedFilter) => {
    return products.filter((p:any) => {
        if (selectedFilter !== 'All') {
            if (p.filter)
            return p.filter.some((f:any) => f.name === selectedFilter);
        } else {
            return true;
        }
    })
});