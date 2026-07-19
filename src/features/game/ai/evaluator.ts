import type { BoardState, Player } from "../types/types";

import { AI_PLAYER, DRAW_SCORE, LOSE_SCORE, WIN_SCORE } from "./constants";

import { calculateWinner } from "../utils/gameLogic";

export function evaluatePosition(board: BoardState, aiPlayer: Player = AI_PLAYER): number {
  const winner = calculateWinner(board);

  if (!winner) {
    return DRAW_SCORE;
  }
  
  return winner === aiPlayer ? WIN_SCORE : LOSE_SCORE;
}

export function isTerminalState(board: BoardState): boolean {
  return (
    calculateWinner(board) !== null ||
    board.every((cell) => cell !== null)
  );
}