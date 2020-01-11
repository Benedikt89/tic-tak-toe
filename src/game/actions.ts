import {gameDataApi} from "./api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux/store";
import {I_dataToStore, I_fieldItem} from "../types/types";
import {getWinner} from "./gameLogic";

type GetStateType = () => AppStateType

export const RESET_COUNT = 'game/RESET_COUNT';
export const SET_TURN = 'game/SET_TURN';
export const SET_AI_TURN = 'game/SET_AI_TURN';
export const END_GAME = 'game/SET_AI_TURN';
export const SET_FETCH_SUCCESS = 'app/SET_FETCH_SUCCESS';
export const SET_IS_FETCHING = 'app/SET_IS_FETCHING';
export const SET_IS_GAME_FROZEN = 'game/SET_IS_GAME_FROZEN';

export type IActions =
    I_resetCount | I_turn | I_aiTurn |
    I_toggleIsFetching | I_isGameFrozen | I_isGameFrozen |
    I_fetchSuccess

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
}
interface I_endGame {
    type: typeof END_GAME,
    winner: 'USER' | 'COMPUTER' | 'DRAW' | null
}
interface I_toggleIsFetching {
    type: typeof SET_IS_FETCHING,
    status: boolean
}
interface I_isGameFrozen {
    type: typeof SET_IS_GAME_FROZEN,
    status: boolean
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
export const _AITurn = (): I_aiTurn => {
    return {
        type: SET_AI_TURN
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

//EXTERNAL ACTIONS
export const endGame = (winner: 'USER' | 'COMPUTER' | 'DRAW' | null): I_endGame => ({ type: END_GAME, winner});

export const onUserMove = (pressedField: I_fieldItem) =>
    async (dispatch: ThunkDispatch<{}, {}, IActions>, getState: GetStateType) => {
    //freezing game
        dispatch(_toggleIsGameFrozen(true));
        let newFields: Array<I_fieldItem> = getState().reducer.fields.map((f: I_fieldItem) => {
            if (f.id === pressedField.id && f.status === null) {
                return { id: f.id, status: 'CROSS'};
            } else return f;
        });
    //setting new fields on user move
        dispatch(_turn(newFields));

        let isWinner = getWinner(newFields, getState().reducer.turns);

        if (!isWinner) {
            dispatch(_AITurn());
            let isAIwinner = getWinner(getState().reducer.fields, getState().reducer.turns);
            if(isAIwinner) {
                dispatch(endGame(isAIwinner));
            }
        } else {
            dispatch(endGame(isWinner))
        }
        setTimeout(()=>{
            dispatch(_toggleIsGameFrozen(false))
        }, 1000)
    };

//API ACTIONS
export const fetchGameData = () =>
    async (dispatch: ThunkDispatch<{}, {}, IActions>, getState: GetStateType) => {
        dispatch(_toggleIsFetching(true));
        try {
            let resAsString: string = await gameDataApi.fetchData();
            let data = await JSON.parse(resAsString);
            dispatch(_fetchSuccess(data));
        } catch (e) {
            console.log(e)
        }
        dispatch(_toggleIsFetching(false));
    };
export const postGameData = () =>
    async (dispatch: ThunkDispatch<{}, {}, IActions>, getState: GetStateType) => {
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