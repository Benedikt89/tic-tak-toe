import {I_FieldItem, I_ScoreData, IGameState} from "../types/types";
import {
    IActions,
    INCREASE_COUNT,
    SET_IS_FETCHING,
    SET_IS_GAME_FREEZED,
    SET_TURN_SUCCESS
} from "./actions";
import {onMove} from "./gameLogic";

const initialState:IGameState = {
    fields: [
        {
            id: 0,
            status: null,
        },
        {
            id: 1,
            status: null,
        },
        {
            id: 2,
            status: null,
        },
        {
            id: 3,
            status: null,
        },
        {
            id: 4,
            status: null,
        },
        {
            id: 5,
            status: null,
        },
        {
            id: 6,
            status: null,
        },
        {
            id: 7,
            status: null,
        },
        {
            id: 8,
            status: null,
        }
    ],
    userScore: {
        winsScore: 0,
        failsScore: 0,
        drawsScore: 0
    },
    computerScore: {
        winsScore: 0,
        failsScore: 0,
        drawsScore: 0
    },
    turns: 0,
    isFreezed: false,
    isFetching: false,
    winner: null,
    selectedFilter: 'USER',
};

const reducer = (state:IGameState = initialState, action:IActions) => {
    switch (action.type) {
        //setting fetching and freezed status
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status,
            };
        case SET_IS_GAME_FREEZED:
            return {
                ...state,
                isFreezed: action.status,
            };
        //adding feched gamedata to state
        case INCREASE_COUNT:
            return {
                ...state,
                totalQuantity: action.count
            };
        case SET_TURN_SUCCESS:
            let isWinner = onMove(state.fields, state.turns);
            let newFields = [...state.fields];
            if (!isWinner) {
                let computerMove = Math.floor(Math.random() * 9);

                for (computerMove; computerMove < newFields.length; computerMove++) {
                    if (!newFields[computerMove].status) {
                        newFields[computerMove].status = "ZERO";
                        break;
                    } else {
                        computerMove === 9 ? computerMove = 0 : computerMove = computerMove;
                    }
                }
                return {
                    ...state,
                    fields: newFields,
                    turns: state.turns++
                };
            } else {
                return {
                    ...state,
                    winner: isWinner
                }
            }
        default:
            return state;
    }
};


export default reducer;