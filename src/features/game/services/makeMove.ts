import type {
  BoardState,
  Player,
} from "../types/types";

export function makeMove(
  board: BoardState,
  index: number,
  player: Player
): BoardState {
  if (board[index] !== null) {
    return board;
  }

  const nextBoard = [...board];

  nextBoard[index] = player;

  return nextBoard;
}