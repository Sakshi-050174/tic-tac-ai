import type { BoardState, Player } from "../types/types";

export const cloneBoard = (board: BoardState): BoardState => [...board];

export const getAvailableMoves = (board: BoardState): number[] => {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(index);
    }
    return moves;
  }, []);
};

export const isBoardFull = (board: BoardState): boolean =>
  board.every((cell) => cell !== null);

export const applyMove = (
  board: BoardState,
  index: number,
  player: Player,
): BoardState => {
  const nextBoard = cloneBoard(board);
  nextBoard[index] = player;
  return nextBoard;
};
