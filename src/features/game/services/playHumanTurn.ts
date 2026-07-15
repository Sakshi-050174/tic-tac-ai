import {
  createMove,
  evaluateBoard,
  makeMove,
  updateScores,
} from ".";
import { getNextPlayer } from "../utils/getNextPlayer";

import type {
  PlayHumanTurnOptions,
  TurnResult,
} from "./types";

export function playHumanTurn({
  board,
  player,
  index,
  moves,
  scores,
}: PlayHumanTurnOptions): TurnResult {
  // Apply player's move
  const nextBoard = makeMove(
    board,
    index,
    player
  );

  // Evaluate updated board
  const result =
    evaluateBoard(nextBoard);

  // Create move history entry
  const move = createMove({
    player,
    index,
    moveNumber:
      moves.length + 1,
  });

  // Calculate updated scores
  const updatedScores =
    updateScores({
      xScore: scores.xScore,
      oScore: scores.oScore,
      drawScore: scores.drawScore,
      winner: result.winner,
      isDraw: result.isDraw,
    });

  return {
    board: nextBoard,
    result,
    move,
    scores: updatedScores,
    nextPlayer: getNextPlayer(player)
  };
}