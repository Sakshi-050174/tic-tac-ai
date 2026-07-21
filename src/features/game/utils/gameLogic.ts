import { type BoardState, type Player } from "../types/types";
import { WINNING_COMBINATIONS } from "./constants";

export function calculateWinner(board: BoardState): Player | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export function calculateDraw(board: BoardState) {
  return board.every(Boolean);
}
