import type { AIStrategy } from "../types";

import { minimax } from "../helpers";

/**
 * Impossible AI
 *
 * Uses Minimax with Alpha-Beta pruning.
 *
 * This strategy always chooses the optimal move.
 */
export const ImpossibleStrategy: AIStrategy = {
  getMove({ board, aiPlayer }) {
    return minimax({
      board,
      aiPlayer,
      currentPlayer: aiPlayer,
      depth: 0,
      alpha: Number.NEGATIVE_INFINITY,
      beta: Number.POSITIVE_INFINITY,
    }).move;
  },
};