import {gameDataApi} from "./api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux/store";
import {I_dataToStore, I_fieldItem, I_winner} from "../types/types";
import {getWinner} from "./gameLogic";
import {checkIsAuth} from "../authorisation/actions";

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
    I_resetCount | I_turn | I_aiTurn |
    I_toggleIsFetching | I_isGameFrozen | I_isGameFrozen |
    I_fetchSuccess | I_endGame | I_setError

//interfaces
interface I_resetCount {
    type: typeof RESET_COUNT,
    count: number
}
interface I_fetchSuccess {
    type: typeof SET_FETCH_SUCCESS,
    data: any
}
interface I_turn {
    type: typeof SET_TURN,
    newFields: Array<I_fieldItem>
}
interface I_aiTurn {
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
export const _turn = (newFields: Array<I_fieldItem>): I_turn => {
    return {
        type: SET_TURN, newFields
    }
};
export const _AITurn = (newFields: Array<I_fieldItem>): I_aiTurn => {
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

//EXTERNAL ACTIONS
export const endGame = (winner: I_winner, fields: Array<I_fieldItem>): I_endGame => ({ type: END_GAME, winner, fields});

export const onUserMove = (pressedField: I_fieldItem) =>
    async (dispatch: ThunkDispatch<{}, {}, I_actions>, getState: GetStateType) => {
    //freezing game
        dispatch(_toggleIsGameFrozen(true));
        let newFields: Array<I_fieldItem> = getState().reducer.fields.map((f: I_fieldItem) => {
            if (f.id === pressedField.id && f.status === null) {
                return { id: f.id, status: 'CROSS'};
            } else return f;
        });
    //setting new fields on user move
        dispatch(_turn(newFields));

        setTimeout(()=>{
            let isUserWinner = getWinner(newFields, getState().reducer.turns);

            if (!isUserWinner.winner) {
                let computerMove = Math.floor(Math.random() * 9);
                let newFields = [...getState().reducer.fields];

                for (computerMove; computerMove < newFields.length; computerMove++) {
                    if (!newFields[computerMove].status) {
                        newFields[computerMove].status = "ZERO";
                        break;
                    } else {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        computerMove === 9 ? computerMove = 0 : computerMove;
                    }
                }
                dispatch(_AITurn(newFields));

                let isAIwinner = getWinner(newFields, getState().reducer.turns);

                if(isAIwinner.winner) {
                    dispatch(endGame(isAIwinner.winner, isAIwinner.fields));
                }
            } else {
                dispatch(endGame(isUserWinner.winner, isUserWinner.fields))
            }

            dispatch(_toggleIsGameFrozen(false))
        }, 1000)
    };

//API ACTIONS
export const fetchGameData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_actions>, getState: GetStateType) => {
        try {
            dispatch(_toggleIsFetching(true));
            let auth = dispatch(checkIsAuth());
            let resAsString = await gameDataApi.fetchData();
            await Promise.all([auth, resAsString]);
            let data = null;
            if (resAsString) {
                data = JSON.parse(resAsString);
            }
            if (data !== null) dispatch(_fetchSuccess(data));
            dispatch(_setError(null));
            dispatch(_toggleIsFetching(false));
        } catch (err) {
            console.log(err);
            dispatch(_setError('network Problems'));
            dispatch(_toggleIsFetching(false));
        }
    };
export const postGameData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_actions>, getState: GetStateType) => {
        let state = getState().reducer;
        let data = {
            fields: state.fields,
            userScore: state.userScore,
            computerScore: state.computerScore,
            turns: state.turns,
        };
        let dataAsString = JSON.stringify(data);
        let res = await gameDataApi.postData(dataAsString);
    };