import {AppStateType} from "../redux/store";

export const getFields = (state:AppStateType) => state.reducer.fields;
export const getTurns = (state:AppStateType) => state.reducer.turns;
export const getCurrentTurn = (state:AppStateType) => state.reducer.currentTurn;
export const getIsFetching = (state:AppStateType) => state.reducer.isFetching;
export const getIsFrozen = (state:AppStateType) => state.reducer.isFrozen;
export const getWinner = (state:AppStateType) => state.reducer.winner;
export const getAppError = (state:AppStateType) => state.reducer.error;

export const getScore = (state:AppStateType) => {
    return {player1Score: state.reducer.player1Score, player2Score: state.reducer.player2Score}
};