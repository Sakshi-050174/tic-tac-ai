import type { BoardState, Player } from "../../types";
import { availableMoves } from "./availableMoves";
import { findWinningMove } from "./findWinningMove";

/**
 * Finds a fork opportunity.
 *
 * A fork creates two simultaneous winning threats.
 */
export function findForkMove(
    board: BoardState,
    player: Player
): number | null {
    const moves =
        availableMoves(board);

    for (const move of moves) {
        const copy = [...board];

        copy[move] = player;

        let winningLines = 0;

        const nextMoves = availableMoves(copy);

        for (const next of nextMoves) {
            const future = [...copy];

            future[next] = player;

            if (findWinningMove(future, player) !== null) {

                winningLines++;

                if (winningLines >= 2) {
                    return move;
                }
            }
        }
    }

    return null;
}