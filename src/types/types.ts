export interface I_fieldItem {
    id: number,
    status: string | null,
}

export interface I_scoreData {
    winsScore: number,
    failsScore: number,
    drawsScore: number
}

export interface I_gameState {
    fields: Array<I_fieldItem>,
    player1Score: I_scoreData,
    player2Score: I_scoreData,
    turns: 0,
    isFrozen: boolean,
    isFetching: boolean,
    selectedFilter: 'USER' | 'COMPUTER',
    winner: I_winner
}

export type I_winner = 'USER' | 'COMPUTER' | 'DRAW' | null

export interface I_dataToStore {
    fields: Array<I_fieldItem>,
    userScore: I_scoreData,
    computerScore: I_scoreData,
    turns: number,
}