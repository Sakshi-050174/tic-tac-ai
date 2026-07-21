import type { AIStrategy } from "../types";

import { availableMoves, findImmediateMove } from "../helpers";

/**
 * Medium AI
 *
 * Strategy:
 * 1. Win if possible.
 * 2. Block opponent if needed.
 * 3. Otherwise play a random legal move.
 */
export const MediumStrategy: AIStrategy = {
  getMove({ board, aiPlayer }) {
    const immediateMove = findImmediateMove(board, aiPlayer);

    if (immediateMove !== null) {
      return immediateMove;
    }

    const moves = availableMoves(board);

    if (moves.length === 0) {
      return -1;
    }

    return moves[Math.floor(Math.random() * moves.length)];
  },
};
