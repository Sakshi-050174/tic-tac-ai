import type { BoardState, Move } from "../types";
import { INITIAL_BOARD } from "../utils/constants";

export function rebuildBoard(
    moves: Move[]
): BoardState {

    const board:BoardState = [...INITIAL_BOARD];

    for (const move of moves) {
        board[move.index] = move.player;
    }

    return board;

}