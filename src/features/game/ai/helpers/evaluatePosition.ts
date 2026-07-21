import type { BoardState, Player } from "../../types";

import { evaluateBoard } from "../../services";

/**
 * Scores a terminal board position.
 *
 * Used exclusively by Minimax.
 */
export function evaluatePosition(
  board: BoardState,
  aiPlayer: Player,
  depth: number,
): number {
  const result = evaluateBoard(board);

  if (!result.winner) {
    return 0;
  }

  if (result.winner === aiPlayer) {
    return 10 - depth;
  }

  return depth - 10;
}
