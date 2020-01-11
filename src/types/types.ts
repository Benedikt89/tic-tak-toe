export interface I_fieldItem {
    id: number,
    status: string | null,
    usedInWin: boolean
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
    currentTurn: I_currentTurn,
    winner: I_winner
}

export type I_currentTurn = 'CROSS' | 'ZERO' | null
export type I_winner = 'USER' | 'COMPUTER' | 'DRAW' | null

export interface I_winnerCheck {
    fields: Array<I_fieldItem>,
    winner: I_winner
}

export interface I_dataToStore {
    fields: Array<I_fieldItem>,
    userScore: I_scoreData,
    computerScore: I_scoreData,
    turns: number,
}