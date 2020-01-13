import {ThunkDispatch} from "redux-thunk";
import {_fetchSuccess, _setError, _toggleIsFetching, I_actions} from "./actions";
import {checkIsAuth} from "../authorisation/actions";
import {gameDataApi} from "./api";
import {AppStateType} from "../redux/store";

type GetStateType = () => AppStateType
//API ACTIONS
export const fetchGameData = () =>
    async (dispatch: ThunkDispatch<{}, {}, I_actions>) => {
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
        try {
            let state = getState().reducer;
            let data = {
                fields: state.fields,
                player1Score: state.player1Score,
                player2Score: state.player2Score,
                turns: state.turns,
            };
            let dataAsString = JSON.stringify(data);
            let res = await gameDataApi.postData(dataAsString);
            debugger;
            console.log(res);
            dispatch(_setError(null));
        } catch (err) {
            console.log(err);
        }
    };