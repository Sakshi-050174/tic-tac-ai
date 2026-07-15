import { getBestAIMove } from "../ai";

import { makeMove } from "./makeMove";

import { evaluateBoard } from "./evaluateBoard";

import type {
  BoardState,
  Difficulty,
  GameResult,
  Player,
} from "../types/types";

export interface PerformAITurnOptions {
  board: BoardState;

  aiPlayer: Player;

  difficulty: Difficulty;
}

export interface PerformAITurnResult {
  board: BoardState;

  move: number;

  result: GameResult;
}

export function performAITurn({
  board,
  aiPlayer,
  difficulty,
}: PerformAITurnOptions): PerformAITurnResult | null {
  const response =
    getBestAIMove({
      board,
      aiPlayer,
      difficulty,
    });

  if (!response.success) {
    return null;
  }

  const nextBoard =
    makeMove(
      board,
      response.move,
      aiPlayer
    );

  return {
    board: nextBoard,

    move: response.move,

    result:
      evaluateBoard(
        nextBoard
      ),
  };
}