import type { GameStore } from "./types";

export const gameSelectors = {
  // -----------------------------
  // Game State
  // -----------------------------

  board: (state: GameStore) => state.board,
  currentPlayer: (state: GameStore) => state.currentPlayer,
  winner: (state: GameStore) => state.winner,
  winningLine: (state: GameStore) => state.winningLine,
  isDraw: (state: GameStore) => state.isDraw,
  moves: (state: GameStore) => state.moves,
  xScore: (state: GameStore) => state.xScore,
  oScore: (state: GameStore) => state.oScore,
  drawScore: (state: GameStore) => state.drawScore,
  mode: (state: GameStore) => state.mode,
  ai: (state: GameStore) => state.ai,
  isThinking: (state: GameStore) => state.isThinking,

  // -----------------------------
  // Actions
  // -----------------------------

  playMove: (state: GameStore) => state.playMove,
  undo: (state: GameStore) => state.undo,
  restart: (state: GameStore) => state.restart,
  resetScores: (state: GameStore) => state.resetScores,
  setMode: (state: GameStore) => state.setMode,
  updateAI: (state: GameStore) => state.updateAI,
};