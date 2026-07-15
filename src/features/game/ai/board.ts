import type {
  BoardState,
  Player,
} from "../types/types";

export function cloneBoard(
  board: BoardState
): BoardState {
  return [...board];
}

export function getAvailableMoves(
  board: BoardState
): number[] {
  return board.reduce<number[]>(
    (moves, cell, index) => {
      if (cell === null) {
        moves.push(index);
      }

      return moves;
    },
    []
  );
}

export function isBoardFull(
  board: BoardState
): boolean {
  return board.every(
    (cell) => cell !== null
  );
}

export function applyMove(
  board: BoardState,
  index: number,
  player: Player
): BoardState {
  const nextBoard =
    cloneBoard(board);

  nextBoard[index] = player;

  return nextBoard;
}