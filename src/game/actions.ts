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
export const SET_FETCH_SUCCESS = 'app/SET_FETCH_SUCCESS';
export const SET_IS_FETCHING = 'app/SET_IS_FETCHING';
export const SET_ERROR = 'app/SET_ERROR';
export const SET_IS_GAME_FROZEN = 'game/SET_IS_GAME_FROZEN';

export type I_actions =
    I_resetCount | I_turnCross | I_turnZero |
    I_toggleIsFetching | I_isGameFrozen | I_isGameFrozen |
    I_fetchSuccess | I_endGame | I_setError

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

//Internal ACTIONS
export const _fetchSuccess = (data: I_dataToStore): I_fetchSuccess => {
    return {
        type: SET_FETCH_SUCCESS, data
    }
};
export const _turnCross = (newFields: Array<I_fieldItem>): I_turnCross => {
    return {
        type: SET_TURN, newFields
    }
};
export const _turnZero = (newFields: Array<I_fieldItem>): I_turnZero => {
    return {
        type: SET_AI_TURN, newFields
    }
};
export const _toggleIsFetching = (status: boolean): I_toggleIsFetching => {
    return {
        type: SET_IS_FETCHING, status
    }
};
export const _toggleIsGameFrozen = (status: boolean): I_isGameFrozen => {
    return {
        type: SET_IS_GAME_FROZEN, status
    }
};
export const _setError = (message: string | null): I_setError => {
    return {
        type: SET_ERROR, message
    }
};
export const _endGame = (winner: I_winner, fields: Array<I_fieldItem>): I_endGame => ({
    type: END_GAME, winner, fields
});
export const resetCount = (): I_resetCount => ({type: RESET_COUNT});

//EXTERNAL ACTIONS
export const endGame = (winner: I_winner, fields: Array<I_fieldItem>) =>
    (dispatch: ThunkDispatch<{}, {}, I_actions>) => {
        dispatch(_endGame(winner, fields));
    };

export const onUserMove = (pressedField: I_fieldItem) =>
    async (dispatch: ThunkDispatch<{}, {}, any>, getState: GetStateType) => {
        //freezing game
        dispatch(_toggleIsGameFrozen(true));
        let newFields: Array<I_fieldItem> = getState().reducer.fields.map((f: I_fieldItem) => {
            if (f.id === pressedField.id && !f.status) {
                return {...f, status: 'CROSS'};
            } else return f;
        });
        //setting new fields on user move
        dispatch(_turnCross(newFields));

        setTimeout(async () => {
            let isUserWinner = getWinner(newFields, getState().reducer.turns);

            if (!isUserWinner.winner) {
                let computerMove = Math.floor(Math.random() * 8);
                let newFields = [...getState().reducer.fields];

                for (computerMove; computerMove < newFields.length; computerMove++) {
                    if (newFields[computerMove].status === null) {
                        newFields[computerMove].status = "ZERO";
                        break;
                    } else {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        computerMove === 9 ? computerMove = 0 : computerMove;
                    }
                }
                dispatch(_turnZero(newFields));

                let isAIwinner = getWinner( getState().reducer.fields, getState().reducer.turns);

                if (isAIwinner.winner) {
                    dispatch(endGame(isAIwinner.winner, isAIwinner.fields));
                }
            } else {
                dispatch(endGame(isUserWinner.winner, isUserWinner.fields))
            }
            await Promise.all([dispatch(postGameData())]);
            dispatch(_toggleIsGameFrozen(false));
        }, 1000)
    };