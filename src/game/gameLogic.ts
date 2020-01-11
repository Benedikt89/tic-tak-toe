import {I_FieldItem} from "../types/types";

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

export const getWinner = (fields: Array<I_FieldItem>, turns: number): 'USER' | 'COMPUTER' | 'DRAW' | null => {
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
    winningCombos.forEach((combo, index) => {
        if (trippleCheck(fields[combo[0]].status, fields[combo[1]].status, fields[combo[2]].status))
            winner = fields[combo[0]].status === "CROSS" ? 'USER' : 'COMPUTER';
    });
    return winner ? winner : turns >= 9 ? winner : "DRAW";
};

