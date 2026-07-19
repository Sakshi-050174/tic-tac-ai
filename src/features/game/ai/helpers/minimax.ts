import type { BoardState, Player } from "../../types";
import { evaluateBoard } from "../../services";
import { availableMoves } from "./availableMoves";

export interface MinimaxResult {
  move: number;
  score: number;
}

interface MinimaxOptions {
  board: BoardState;
  aiPlayer: Player;
  currentPlayer: Player;
  depth: number;
  alpha: number;
  beta: number;
}

/**
 * Scores a finished game.
 */
function evaluateTerminalState(
  board: BoardState,
  aiPlayer: Player,
  depth: number
): number | null {

  const result = evaluateBoard(board);

  if (result.winner) {
    return result.winner === aiPlayer ? 10 - depth : depth - 10
  }

  if (result.isDraw) {
    return 0;
  }

  return null;
}

/**
 * Alpha-Beta Minimax.
 *
 * Returns the optimal move and score
 * for the current board state.
 */
export function minimax({
  board,
  aiPlayer,
  currentPlayer,
  depth,
  alpha,
  beta,
}: MinimaxOptions): MinimaxResult {

  const terminalScore = evaluateTerminalState(board, aiPlayer, depth);

  if (terminalScore !== null) {
    return { move: -1, score: terminalScore };
  }

  const maximizing = currentPlayer === aiPlayer;

  let bestMove = -1;

  let bestScore = maximizing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;

  for (const move of availableMoves(board)) {

    const nextBoard = [...board];

    nextBoard[move] = currentPlayer;

    const nextPlayer: Player = currentPlayer === "X" ? "O" : "X";

    const { score } =
      minimax({
        board: nextBoard,
        aiPlayer,
        currentPlayer:
          nextPlayer,
        depth: depth + 1,
        alpha,
        beta,
      });

    if (maximizing) {

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }

      alpha = Math.max(alpha, bestScore);

    } else {

      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }

      beta = Math.min(beta, bestScore);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return { move: bestMove, score: bestScore };
}
