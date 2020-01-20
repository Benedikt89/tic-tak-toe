import {I_gameState} from "../types/types";
import {
    END_GAME,
    I_actions, RESET_COUNT,
    SET_AI_TURN, SET_DEMOMODE, SET_ERROR, SET_FETCH_SUCCESS,
    SET_IS_FETCHING,
    SET_IS_GAME_FROZEN, SET_TURN,
} from "./actions";

let fieldCreator = () =>
    [...Array(9)].map((el, index) => ({id: index, status: null, usedInWin: null}));

const initialState: I_gameState = {
    fields: fieldCreator(),
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
    currentTurn: "CROSS",
    error: null,
    demomode: false
};

const reducer = (state: I_gameState = initialState, action: I_actions) => {
    switch (action.type) {
        //setting fetching and frozen status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.message
            };
        case SET_DEMOMODE:
            return {
                ...state,
                demomode: action.status
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
                currentTurn: 'ZERO',
                fields: action.newFields
            };
        case END_GAME:
            switch (action.winner) {
                case "COMPUTER":
                    return {
                        ...state,
                        player1Score: {...state.player1Score, failsScore: state.player1Score.failsScore + 1},
                        player2Score: {...state.player2Score, winsScore: state.player2Score.winsScore + 1},
                        winner: action.winner,
                        currentTurn: null
                    };
                case "DRAW":
                    return {
                        ...state,
                        player1Score: {...state.player1Score, drawsScore: state.player1Score.drawsScore + 1},
                        player2Score: {...state.player2Score, drawsScore: state.player2Score.drawsScore + 1},
                        winner: action.winner,
                        currentTurn: null
                    };
                case "USER":
                    return {
                        ...state,
                        player1Score: {...state.player1Score, winsScore: state.player1Score.winsScore + 1},
                        player2Score: {...state.player2Score, failsScore: state.player2Score.failsScore + 1},
                        winner: action.winner,
                        currentTurn: null
                    };
                default:
                    return state;
            }
        case RESET_COUNT:
            return {
                ...state,
                turns: 0,
                fields: fieldCreator(),
                winner: null,
                currentTurn: "CROSS"
            };
        case SET_AI_TURN:
            return {
                ...state,
                fields: action.newFields,
                turns: state.turns + 1,
                currentTurn: 'CROSS'
            };
        default:
            return state;
    }
};


export default reducer;