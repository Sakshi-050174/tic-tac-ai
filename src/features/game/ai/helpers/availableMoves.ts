import type { BoardState } from "../../types";

/**
 * Returns all currently available cell indexes.
 *
 * Example:
 * [X, null, O, null]
 * => [1, 3]
 */
export function availableMoves(
  board: BoardState
): number[] {
  const moves: number[] = [];

  for (let index = 0; index < board.length; index++) {
    board[index] === null &&  moves.push(index);
  }

  return moves;
}