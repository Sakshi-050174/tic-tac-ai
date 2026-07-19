import type { AIStrategy } from "../types";

import { availableMoves } from "../helpers/availableMoves";

/**
 * Easy AI
 *
 * Picks a completely random legal move.
 */
export const EasyStrategy: AIStrategy = {
  getMove({ board }) {
    const moves = availableMoves(board);

    if (moves.length === 0) {
      return -1;
    }

    const randomIndex = Math.floor( Math.random() * moves.length);

    return moves[randomIndex];
  },
};