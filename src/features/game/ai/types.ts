import type { BoardState, Difficulty, Player } from "../types";

/**
 * Context shared with every AI strategy.
 */
export interface AIContext {
  /**
   * Current board state.
   */
  board: BoardState;

  /**
   * Which side the AI controls.
   */
  aiPlayer: Player;

  /**
   * Difficulty selected by the user.
   */
  difficulty: Difficulty;
}

/**
 * Every AI strategy must return the index
 * of the cell it wants to play.
 *
 * Returning -1 indicates that no legal move
 * is available.
 */
export interface AIStrategy {
  getMove(context: AIContext): number;
}
