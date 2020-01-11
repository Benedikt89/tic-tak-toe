import {gameDataApi} from "./api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../redux/store";
import {I_FieldItem} from "../types/types";

type GetStateType = () => AppStateType

export const INCREASE_COUNT = 'count/INCREASE_COUNT';
export const RESET_COUNT = 'count/RESET_COUNT';
export const SET_TURN_SUCCESS = 'game/SET_TURN_SUCCESS';
export const SET_FETCH_SUCCESS = 'app/SET_FETCH_SUCCESS';
export const SET_IS_FETCHING = 'app/SET_IS_FETCHING';
export const SET_IS_GAME_FREEZED = 'game/SET_IS_GAME_FREEZED';

export type IActions =
    I_increaseCount | I_resetCount | I_turnSuccess |
    I_toggleIsFetching | I_isGameFreezed | I_isGameFreezed |
    I_fetchSuccess

//interfaces
interface I_increaseCount {
    type: typeof INCREASE_COUNT,
    count: number
}

interface I_resetCount {
    type: typeof RESET_COUNT,
    count: number
}

interface I_fetchSuccess {
    type: typeof SET_FETCH_SUCCESS,
    data: any
}

interface I_turnSuccess {
    type: typeof SET_TURN_SUCCESS,
    pressedField: I_FieldItem
}

interface I_toggleIsFetching {
    type: typeof SET_IS_FETCHING,
    status: boolean
}

interface I_isGameFreezed {
    type: typeof SET_IS_GAME_FREEZED,
    status: boolean
}


//Internal ACTIONS
export const _increaseCount = (count: number): I_increaseCount => {
    return {
        type: INCREASE_COUNT, count: +count
    }
};
export const _fetchSuccess = (data: any): I_fetchSuccess => {
    return {
        type: SET_FETCH_SUCCESS, data
    }
};
export const _turnSuccess = (pressedField: I_FieldItem): I_turnSuccess => {
    return {
        type: SET_TURN_SUCCESS, pressedField
    }
};
export const _toggleIsFetching = (status: boolean): I_toggleIsFetching => {
    return {
        type: SET_IS_FETCHING, status
    }
};
export const _toggleIsGameFreezed = (status: boolean): I_isGameFreezed => {
    return {
        type: SET_IS_GAME_FREEZED, status
    }
};

//EXTERNAL ACTIONS
export const onUserMove = (pressedField: I_FieldItem) =>
    async (dispatch: ThunkDispatch<{}, {}, IActions>, getState: GetStateType) => {
        dispatch(_toggleIsGameFreezed(true));
        let currentFields = getState().reducer.fields;
        currentFields.forEach(f => {
            if (f.id === pressedField.id && f.status === null) {
                dispatch(_turnSuccess(f))
            }
        })


    };

//API ACTIONS
export const fetchGameData = () =>
    async (dispatch: ThunkDispatch<{}, {}, IActions>, getState: GetStateType) => {
        dispatch(_toggleIsFetching(true));
        let res = await gameDataApi.fetchData();
        dispatch(_fetchSuccess(res));
        dispatch(_toggleIsFetching(false));
    };
export const postGameData = (count: number) =>
    async (dispatch: ThunkDispatch<{}, {}, IActions>) => {
        let res = await gameDataApi.postData(count);
        dispatch(_increaseCount(res.count));
    };