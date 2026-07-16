import type { GameStore } from "../store";

export const canPlayMove = (
  state: GameStore,
  index: number
): boolean => {
  return (
    state.board[index] === null &&
    !state.winner &&
    !state.isDraw &&
    !state.isThinking
  );
};

export const isAITurn = (
  state: GameStore
): boolean => {
  return (
    state.ai.enabled &&
    state.currentPlayer ===
      state.ai.player
  );
};