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

interface AlphaBetaResult {
  score: number;

  move: number;
}

function terminalScore(
  board: BoardState,
  depth: number,
  aiPlayer: Player
): number {
  const score =
    evaluatePosition(
      board,
      aiPlayer
    );

  if (score > 0) {
    return score - depth;
  }

  if (score < 0) {
    return score + depth;
  }

  return score;
}

export function alphaBeta(
  board: BoardState,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  aiPlayer: Player
): AlphaBetaResult {
  if (isTerminalState(board)) {
    return {
      score: terminalScore(
        board,
        depth,
        aiPlayer
      ),

      move: -1,
    };
  }

  const moves =
    getAvailableMoves(board);

  let bestMove = -1;

  const humanPlayer: Player =
    aiPlayer === "X"
      ? "O"
      : "X";

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

      const result =
        alphaBeta(
          nextBoard,
          depth + 1,
          alpha,
          beta,
          false,
          aiPlayer
        );

      if (
        result.score >
        bestScore
      ) {
        bestScore =
          result.score;

        bestMove = move;
      }

      alpha = Math.max(
        alpha,
        bestScore
      );

      if (beta <= alpha) {
        break;
      }
    }

    return {
      score: bestScore,
      move: bestMove,
    };
  }

  let bestScore =
    Number.POSITIVE_INFINITY;

  for (const move of moves) {
    const nextBoard =
      applyMove(
        board,
        move,
        humanPlayer
      );

    const result =
      alphaBeta(
        nextBoard,
        depth + 1,
        alpha,
        beta,
        true,
        aiPlayer
      );

    if (
      result.score <
      bestScore
    ) {
      bestScore =
        result.score;

      bestMove = move;
    }

    beta = Math.min(
      beta,
      bestScore
    );

    if (beta <= alpha) {
      break;
    }
  }

  return {
    score: bestScore,
    move: bestMove,
  };
}

export function getBestMoveAlphaBeta(
  board: BoardState,
  aiPlayer: Player
): number {
  return alphaBeta(
    board,
    0,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    true,
    aiPlayer
  ).move;
}