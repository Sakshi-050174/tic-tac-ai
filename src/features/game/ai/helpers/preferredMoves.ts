import type { BoardState } from "../../types";

/**
 * Preferred move order.
 *
 * Center -> Corners -> Edges
 */
const PREFERRED_ORDER = [4, 0, 2, 6, 8, 1, 3, 5, 7] as const;

/**
 * Returns the first available preferred move.
 */
export function findPreferredMove(
    board: BoardState
): number | null {
    for (const move of PREFERRED_ORDER) {
        if (board[move] === null) {
            return move;
        }
    }

    return null;
}