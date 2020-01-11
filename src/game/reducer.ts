import {I_fieldItem, I_gameState} from "../types/types";
import {
    IActions,
    SET_AI_TURN, SET_FETCH_SUCCESS,
    SET_IS_FETCHING,
    SET_IS_GAME_FROZEN, SET_TURN,
} from "./actions";

const initialState: I_gameState = {
    fields: [...Array(9)].map((el, index)=> ({id: index, status: null})),

    player1Score: {
        winsScore: 0,
        failsScore: 0,
        drawsScore: 0
    },
    player2Score: {
        winsScore: 0,
        failsScore: 0,
        drawsScore: 0
    },
    turns: 0,
    isFrozen: false,
    isFetching: false,
    winner: null,
    selectedFilter: 'USER',
};

const reducer = (state: I_gameState = initialState, action: IActions) => {
    switch (action.type) {
        //setting fetching and frozen status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        case SET_IS_GAME_FROZEN:
            return {
                ...state,
                isFrozen: action.status,
            };
        //adding fetched game data to state
        case SET_FETCH_SUCCESS:
            return {
                ...state,
                ...action.data
            };
        case SET_TURN:
            return {
                ...state,
                turns: state.turns + 1,
                fields: action.newFields
            };
        case SET_AI_TURN:
            let computerMove = Math.floor(Math.random() * 9);
            let newFields = [...state.fields];

            for (computerMove; computerMove < newFields.length; computerMove++) {
                if (!newFields[computerMove].status) {
                    newFields[computerMove].status = "ZERO";
                    break;
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    computerMove === 9 ? computerMove = 0 : computerMove;
                }
            }
            return {
                ...state,
                fields: newFields,
                turns: state.turns + 1
            };
        default:
            return state;
    }
};


export default reducer;