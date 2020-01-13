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
            // checking if data is a string
            if (resAsString.length > 0) {
                return typeof resAsString === "string" ? data = JSON.parse(resAsString) : resAsString;
            }
            if (data) dispatch(_fetchSuccess(data));
            else if (resAsString.turns && resAsString.fields.length === 9) {
                dispatch(_fetchSuccess(resAsString));
            }
            dispatch(_setError(null));
            dispatch(_toggleIsFetching(false));
        } catch (err) {
            console.log(err);
            //if its no data return
            if (err.response && err.response.config.url === "api.user.getstate" && err.response.status === 403) {
                dispatch(_toggleIsFetching(false));
                dispatch(_setError(null));
            } else {
                dispatch(_setError('network Problems'));
                dispatch(_toggleIsFetching(false));
            }
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
                winner: state.winner
            };
            //stringify data before sending
            let dataAsString = JSON.stringify(data);
            let res = await gameDataApi.postData(dataAsString);
            console.log(res);
            //if it was some errors remove them
            dispatch(_setError(null));
        } catch (err) {
            console.log(err);
        }
    };