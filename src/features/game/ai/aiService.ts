import type { BoardState, Difficulty, Player } from "../types/types";
import { getAIMove } from "./AIEngine";
import { getAvailableMoves } from "./board";

export interface AIRequest {
  board: BoardState;
  aiPlayer: Player;
  difficulty: Difficulty;
}

export interface AIResponse {
  move: number;
  success: boolean;
}

export function getBestAIMove({
  board,
  aiPlayer,
  difficulty,
}: AIRequest): AIResponse {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    return { move: -1, success: false };
  }

  const move = getAIMove({ board, difficulty, aiPlayer });

  if (move < 0 || !availableMoves.includes(move)) {
    return { move: availableMoves[0], success: true };
  }

  return {
    move,
    success: true,
  };
}
