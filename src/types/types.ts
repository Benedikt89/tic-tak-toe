export interface I_FieldItem {
    id: number,
    status: null | 'ZERO' | 'CROSS',
}

export interface I_ScoreData {
    winsScore: number,
    failsScore: number,
    drawsScore: number
}

export interface IGameState {
    fields: Array<I_FieldItem>,
    userScore: I_ScoreData,
    computerScore: I_ScoreData,
    isFreezed: boolean,
    isFetching: boolean,
    selectedFilter: 'USER' | 'COMPUTER',
}