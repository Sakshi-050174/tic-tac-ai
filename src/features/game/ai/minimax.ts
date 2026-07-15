import type {
  BoardState,
  Player,
} from "../types/types";

import {
  applyMove,
  getAvailableMoves,
} from "./board";

import {
  evaluatePosition,
  isTerminalState,
} from "./evaluator";

interface MinimaxResult {
  score: number;
  move: number;
}

export function minimax(
  board: BoardState,
  depth: number,
  maximizing: boolean,
  aiPlayer: Player
): MinimaxResult {
  if (isTerminalState(board)) {
    return {
      score:
        evaluatePosition(
          board,
          aiPlayer
        ) - depth,
      move: -1,
    };
  }

  const moves =
    getAvailableMoves(board);

  let bestMove = -1;

  if (maximizing) {
    let bestScore =
      Number.NEGATIVE_INFINITY;

    for (const move of moves) {
      const nextBoard =
        applyMove(
          board,
          move,
          aiPlayer
        );

      const {
        score,
      } = minimax(
        nextBoard,
        depth + 1,
        false,
        aiPlayer
      );

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return {
      score: bestScore,
      move: bestMove,
    };
  }

  const humanPlayer: Player =
    aiPlayer === "X"
      ? "O"
      : "X";

  let bestScore =
    Number.POSITIVE_INFINITY;

  for (const move of moves) {
    const nextBoard =
      applyMove(
        board,
        move,
        humanPlayer
      );

    const {
      score,
    } = minimax(
      nextBoard,
      depth + 1,
      true,
      aiPlayer
    );

    if (score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return {
    score: bestScore,
    move: bestMove,
  };
}

export function getBestMove(
  board: BoardState,
  aiPlayer: Player
): number {
  return minimax(
    board,
    0,
    true,
    aiPlayer
  ).move;
}