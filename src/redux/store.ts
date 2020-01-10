import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from "redux-form";
import reducer from '../game/reducer'
import authorisationReducer from "../authorisation/authReducer";


const rootReducer = combineReducers({
    reducer: reducer,
    auth: authorisationReducer,
    form: formReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;