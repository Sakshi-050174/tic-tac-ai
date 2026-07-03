import { INITIAL_BOARD } from "../utils/constants";

import type {
  BoardState,
  Move,
} from "../types";

export interface UndoResult {
  board: BoardState;

  moves: Move[];
}

export function undoMove(
  moves: Move[]
): UndoResult {
  const updatedMoves = moves.slice(0, -1);

  if (updatedMoves.length === 0) {
    return {
      board: [...INITIAL_BOARD],
      moves: [],
    };
  }

  return {
    board: [
      ...updatedMoves[
        updatedMoves.length - 1
      ].board,
    ],
    moves: updatedMoves,
  };
}