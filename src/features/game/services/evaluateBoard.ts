import { WINNING_COMBINATIONS } from "../utils/constants";

import type {
  BoardState,
  GameResult,
} from "../types";

export function evaluateBoard(
  board: BoardState
): GameResult {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return {
        winner: board[a],
        isDraw: false,
        winningLine: line,
      };
    }
  }

  return {
    winner: null,
    isDraw: board.every(
      (cell) => cell !== null
    ),
    winningLine: [],
  };
}