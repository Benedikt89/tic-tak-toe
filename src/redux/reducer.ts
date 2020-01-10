import {IAppState} from "../types/types";
import {Dispatch} from "redux";
import {counterApi} from "../api/api";
import {AppStateType} from "./store";
import {ThunkDispatch} from "redux-thunk";

const INCREASE_QUANTITY = 'PRODUCTS/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'PRODUCTS/DECREASE_QUANTITY';
const SET_ORDER_SUCCESS = 'ORDER/SET_ORDER_SUCCESS';
const SET_IS_FETCHING = 'COMMON/SET_IS_FETCHING';

const initialState:IAppState = {
    totalPrice: 0,
    totalQuantity: 0,
    isFetching: false,
    order: [{name: 'one', id: '1'}],
};

type IActions = I_increaseQuantity | I_decreaseQuantity | I_orderSuccess | I_toggleIsFetching
type GetStateType = () => AppStateType

const reducer = (state:IAppState = initialState, action:IActions) => {
    switch (action.type) {
        //setting fetching status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        //adding feched products to state
        case INCREASE_QUANTITY:
            return {
                ...state,
                totalQuantity: action.count
            };
        //decrease quantity of single product in state
        case DECREASE_QUANTITY:
            return {
                ...state,
                totalQuantity: action.count
            };
        case SET_ORDER_SUCCESS:
            return {
                ...state,
                totalQuantity: action.status,
            };
        default:
            return state;
    }
};

//interfaces
interface I_increaseQuantity {
    type: typeof INCREASE_QUANTITY,
    count: number
}
interface I_decreaseQuantity {
    type: typeof DECREASE_QUANTITY,
    count: number
}
interface I_orderSuccess {
    type: typeof SET_ORDER_SUCCESS,
    status: number
}
interface I_toggleIsFetching {
    type: typeof SET_IS_FETCHING,
    status: boolean
}
//LOCAL ACTIONS
export const _increaseQuantity = (count:string):I_increaseQuantity => {
    return {
        type: INCREASE_QUANTITY, count: +count
    }
};
export const _decreaseQuantity = (count:string):I_decreaseQuantity => {
    return {
        type: DECREASE_QUANTITY, count: +count
    }
};
export const _orderSuccess = (status:string):I_orderSuccess => {
    return{
        type: SET_ORDER_SUCCESS, status: +status
    }
};

//EXTERNAL ACTIONS
export const increaseQuantity = (count:number) => async (dispatch: ThunkDispatch<{},{},IActions>) => {
    let res = await counterApi.increaseCount(count);
    dispatch(_increaseQuantity(res.count));
};
export const decreaseQuantity = (count:number) => async (dispatch: ThunkDispatch<{},{},IActions>) => {
    let res = await counterApi.decreaseCount(count);
    dispatch(_decreaseQuantity(res.count));
};
const toggleIsFetching = (status:boolean):I_toggleIsFetching => {
    return {
        type: SET_IS_FETCHING, status
    }
};

//FETCH ACTIONS
export const fetchCatalog = () => async (dispatch: ThunkDispatch<{},{},IActions>, getState: GetStateType) => {
    dispatch(toggleIsFetching(true));
    let res = await counterApi.fetchCount();
    dispatch(_orderSuccess(res.count));
    dispatch(toggleIsFetching(false));
};


export default reducer;