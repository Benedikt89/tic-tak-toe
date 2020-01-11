import {I_fieldItem, I_winnerCheck} from "../types/types";

let trippleCheck = (a: string | null, b: string | null, c: string | null,): boolean => {
    if (a !== null) {
        if (b !== null) {
            if (c !== null) {
                return a === b && b === c;
            }
        }
    }
    return false;
};

export const getWinner = (fields: Array<I_fieldItem>, turns: number): I_winnerCheck => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let winner = null;
    let newFields = [...fields];
    winningCombos.forEach((combo, index) => {
        if (trippleCheck(fields[combo[0]].status, fields[combo[1]].status, fields[combo[2]].status)) {
            winner = fields[combo[0]].status === "CROSS" ? 'USER' : 'COMPUTER';
            newFields[combo[0]].usedInWin = true;
            newFields[combo[1]].usedInWin = true;
            newFields[combo[2]].usedInWin = true;
        }
    });
    return {
        winner: winner ? winner : (turns >= 9 ? "DRAW" : winner),
        fields: fields
    };
};
