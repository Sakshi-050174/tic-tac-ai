import type { BoardState, Player } from "../../types";

import { findWinningMove } from "./findWinningMove";

/**
 * Finds the highest-priority immediate move.
 *
 * Priority:
 * 1. Win immediately.
 * 2. Block opponent.
 *
 * Returns null if neither exists.
 */
export function findImmediateMove(board: BoardState, aiPlayer: Player): number | null {

  const winningMove = findWinningMove(board, aiPlayer);

  if (winningMove !== null) {
    return winningMove;
  }

  const opponent: Player = aiPlayer === "X" ? "O" : "X";

  return findWinningMove(board, opponent);
}