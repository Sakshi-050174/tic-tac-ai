import type {
  BoardState,
  Difficulty,
  Player,
} from "../types/types";

import {
  getAvailableMoves,
  applyMove,
} from "./board";

import { calculateWinner } from "../utils/gameLogic";

import { getBestMove } from "./minimax";

import { getBestMoveAlphaBeta } from "./alphaBeta";

function randomMove(
  board: BoardState
): number {
  const moves =
    getAvailableMoves(board);

  const index = Math.floor(
    Math.random() * moves.length
  );

  return moves[index];
}

function winningMove(
  board: BoardState,
  player: Player
): number | null {
  const moves =
    getAvailableMoves(board);

  for (const move of moves) {
    const nextBoard =
      applyMove(
        board,
        move,
        player
      );

    if (
      calculateWinner(
        nextBoard
      ) === player
    ) {
      return move;
    }
  }

  return null;
}

function mediumMove(
  board: BoardState,
  aiPlayer: Player
): number {
  const humanPlayer: Player =
    aiPlayer === "X"
      ? "O"
      : "X";

  const win =
    winningMove(
      board,
      aiPlayer
    );

  if (win !== null) {
    return win;
  }

  const block =
    winningMove(
      board,
      humanPlayer
    );

  if (block !== null) {
    return block;
  }

  return randomMove(board);
}

export function getMoveForDifficulty(
  board: BoardState,
  difficulty: Difficulty,
  aiPlayer: Player
): number {
  switch (difficulty) {
    case "easy":
      return randomMove(board);

    case "medium":
      return mediumMove(
        board,
        aiPlayer
      );

    case "hard":
      return getBestMove(
        board,
        aiPlayer
      );

    case "impossible":
      return getBestMoveAlphaBeta(
        board,
        aiPlayer
      );

    default:
      return randomMove(board);
  }
}