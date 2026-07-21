import type { BoardState, Player } from "../../types";

import { WINNING_COMBINATIONS } from "../../utils/constants";

/**
 * Finds an immediate winning move for the given player.
 *
 * Returns:
 * - cell index if one move wins the game
 * - null if no winning move exists
 */
export function findWinningMove(
  board: BoardState,
  player: Player,
): number | null {
  for (const line of WINNING_COMBINATIONS) {
    let playerCount = 0;
    let emptyCell: number | null = null;

    for (const cell of line) {
      if (board[cell] === player) {
        playerCount++;
      } else if (board[cell] === null) {
        emptyCell = cell;
      }
    }

    if (playerCount === 2 && emptyCell !== null) {
      return emptyCell;
    }
  }

  return null;
}
