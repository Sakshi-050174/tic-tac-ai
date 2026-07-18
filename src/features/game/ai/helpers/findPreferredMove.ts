import type { BoardState } from "../../types";

/**
 * Preferred move priority for Tic Tac Toe.
 *
 * Order:
 * Center → Corners → Edges
 */
const PREFERRED_MOVES = [
  4, // Center

  0,
  2,
  6,
  8, // Corners

  1,
  3,
  5,
  7, // Edges
] as const;

/**
 * Returns the highest priority
 * available move.
 */
export function findPreferredMove(
  board: BoardState
): number | null {
  for (const move of PREFERRED_MOVES) {
    if (board[move] === null) {
      return move;
    }
  }

  return null;
}