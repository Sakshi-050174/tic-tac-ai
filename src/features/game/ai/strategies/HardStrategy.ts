import type { AIStrategy } from "../types";

import {
  findForkMove,
  findImmediateMove,
  findPreferredMove,
} from "../helpers";

import type { Player } from "../../types";

/**
 * Hard AI
 *
 * Strategy:
 * 1. Win immediately.
 * 2. Block opponent.
 * 3. Create a fork.
 * 4. Block opponent's fork.
 * 5. Prefer center → corners → edges.
 */
export const HardStrategy: AIStrategy = {
  getMove({
    board,
    aiPlayer,
  }) {
    const immediateMove =
      findImmediateMove(
        board,
        aiPlayer
      );

    if (immediateMove !== null) {
      return immediateMove;
    }

    const forkMove =
      findForkMove(
        board,
        aiPlayer
      );

    if (forkMove !== null) {
      return forkMove;
    }

    const opponent: Player =
      aiPlayer === "X"
        ? "O"
        : "X";

    const blockFork =
      findForkMove(
        board,
        opponent
      );

    if (blockFork !== null) {
      return blockFork;
    }

    return (
      findPreferredMove(board) ??
      -1
    );
  },
};