import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux/store";
import {I_dataToStore, I_fieldItem, I_winner} from "../types/types";
import {getWinner} from "./gameLogic";
import {postGameData} from "./api-actions";

type GetStateType = () => AppStateType

export const RESET_COUNT = 'game/RESET_COUNT';
export const SET_TURN = 'game/SET_TURN';
export const SET_AI_TURN = 'game/SET_AI_TURN';
export const END_GAME = 'game/SET_END_GAME';
export const SET_IS_GAME_FROZEN = 'game/SET_IS_GAME_FROZEN';

export const SET_FETCH_SUCCESS = 'app/SET_FETCH_SUCCESS';
export const SET_IS_FETCHING = 'app/SET_IS_FETCHING';
export const SET_ERROR = 'app/SET_ERROR';
export const SET_DEMOMODE = 'app/SET_DEMOMODE';

export type I_actions =
    I_resetCount | I_turnCross | I_turnZero |
    I_toggleIsFetching | I_isGameFrozen | I_isGameFrozen |
    I_fetchSuccess | I_endGame | I_setError |
    I_setDemomode

//interfaces
interface I_resetCount {
    type: typeof RESET_COUNT,
}

interface I_fetchSuccess {
    type: typeof SET_FETCH_SUCCESS,
    data: any
}

interface I_turnCross {
    type: typeof SET_TURN,
    newFields: Array<I_fieldItem>
}

interface I_turnZero {
    type: typeof SET_AI_TURN,
    newFields: Array<I_fieldItem>
}

interface I_endGame {
    type: typeof END_GAME,
    winner: I_winner,
    fields: Array<I_fieldItem>
}

interface I_toggleIsFetching {
    type: typeof SET_IS_FETCHING,
    status: boolean
}

interface I_isGameFrozen {
    type: typeof SET_IS_GAME_FROZEN,
    status: boolean
}

interface I_setError {
    type: typeof SET_ERROR,
    message: null | string
}

interface I_setDemomode {
    type: typeof SET_DEMOMODE,
    status: boolean
}

//Internal ACTIONS CREATORS
export const _fetchSuccess = (data: I_dataToStore): I_fetchSuccess => ({ type: SET_FETCH_SUCCESS, data});

export const _turnCross = (newFields: Array<I_fieldItem>): I_turnCross => ({ type: SET_TURN, newFields});

export const _turnZero = (newFields: Array<I_fieldItem>): I_turnZero => ({ type: SET_AI_TURN, newFields});

export const _toggleIsFetching = (status: boolean): I_toggleIsFetching => ({ type: SET_IS_FETCHING, status});

export const _toggleIsGameFrozen = (status: boolean): I_isGameFrozen => ({ type: SET_IS_GAME_FROZEN, status});

export const _setError = (message: string | null): I_setError => ({ type: SET_ERROR, message});

export const _endGame = (winner: I_winner, fields: Array<I_fieldItem>): I_endGame => ({ type: END_GAME, winner, fields });

export const resetCount = (): I_resetCount => ({type: RESET_COUNT});

export const _setDemoMode = (status: boolean): I_setDemomode => ({type: SET_DEMOMODE, status});

//EXTERNAL ACTIONS
export const endGame = (winner: I_winner, fields: Array<I_fieldItem>) =>
    (dispatch: ThunkDispatch<{}, {}, I_actions>) => {
        dispatch(_endGame(winner, fields));
    };
export const setDemoMode = (status: boolean) => (dispatch: ThunkDispatch<{}, {}, I_actions>) => {
    dispatch(_setDemoMode(status));
};

export const onUserMove = (pressedField: I_fieldItem) =>
    async (dispatch: ThunkDispatch<{}, {}, any>, getState: GetStateType) => {
        let ifDemoMode = getState().reducer.demomode;
        //freezing game for block user actions during requests
        dispatch(_toggleIsGameFrozen(true));

        //create copy of fields and set field satus to cross
        let newFields: Array<I_fieldItem> = getState().reducer.fields.map((f: I_fieldItem) => {
            if (f.id === pressedField.id && !f.status) {
                return {...f, status: 'CROSS'};
            } else return f;
        });

        //setting new fields on user move
        dispatch(_turnCross(newFields));

        //timeout for imitation of computer is thinking
        setTimeout(async () => {
            let isUserWinner = getWinner(newFields, getState().reducer.turns);

            //if user is not winner making move for AI
            if (!isUserWinner.winner) {

                //Generate random number
                let computerMove = Math.floor(Math.random() * 8);
                let newFields = [...getState().reducer.fields];

                //check is field in array free to set status
                for (computerMove; computerMove < newFields.length; computerMove++) {
                    if (newFields[computerMove].status === null) {
                        newFields[computerMove].status = "ZERO";
                        break;
                    }
                //if array ends, reset computerMove value to run from start
                    if(computerMove === 8) {
                        computerMove = -1;
                    }
                }

                dispatch(_turnZero(newFields));

                //check for AI wins
                let isAIwinner = getWinner( getState().reducer.fields, getState().reducer.turns);

                if (isAIwinner.winner) {
                    dispatch(endGame(isAIwinner.winner, isAIwinner.fields));
                }
            } else {
                dispatch(endGame(isUserWinner.winner, isUserWinner.fields))
            }
            if (!ifDemoMode) {
                await Promise.all([dispatch(postGameData())]);
            }
            dispatch(_toggleIsGameFrozen(false));
        }, 1000)
    };