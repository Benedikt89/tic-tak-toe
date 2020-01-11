import {createSelector} from "reselect";
import {AppStateType} from "../redux/store";

export const getFields = (state:AppStateType) => state.reducer.fields;
export const getTurns = (state:AppStateType) => state.reducer.turns;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getIsFrozen = (state:AppStateType) => state.reducer.isFrozen;
export const getWinner = (state:AppStateType) => state.reducer.winner;

export const getScore = (state:AppStateType) => {
    return {player1Score: state.reducer.player1Score, player2Score: state.reducer.player2Score}
};




export const getSelectedFilter = (state:AppStateType) => state.reducer.selectedFilter;
//
// export const getProducts = createSelector(getCurrentFields, getSelectedFilter, (products, selectedFilter) => {
//     return products.filter((p:any) => {
//         if (selectedFilter !== 'USER') {
//             if (p.filter)
//             return p.filter.some((f:any) => f.name === selectedFilter);
//         } else {
//             return true;
//         }
//     })
// });