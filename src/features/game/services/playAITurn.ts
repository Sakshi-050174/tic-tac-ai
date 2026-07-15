import {
  createMove,
  performAITurn,
  updateScores,
} from ".";

import { getNextPlayer } from "../utils/getNextPlayer";

import type {
  PlayAITurnOptions,
  TurnResult,
} from "./types";

export function playAITurn({
  board,
  aiPlayer,
  difficulty,
  moves,
  scores,
}: PlayAITurnOptions): TurnResult | null {
  const aiResult = performAITurn({
    board,
    aiPlayer,
    difficulty,
  });

  if (!aiResult) {
    return null;
  }

  const move = createMove({
    player: aiPlayer,
    index: aiResult.move,
    moveNumber: moves.length + 1,
  });

  const updatedScores = updateScores({
    xScore: scores.xScore,
    oScore: scores.oScore,
    drawScore: scores.drawScore,
    winner: aiResult.result.winner,
    isDraw: aiResult.result.isDraw,
  });

  return {
    board: aiResult.board,

    result: aiResult.result,

    move,

    scores: updatedScores,

    nextPlayer: getNextPlayer(
      aiPlayer
    ),
  };
}