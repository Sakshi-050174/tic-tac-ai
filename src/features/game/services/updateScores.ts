import type {
  Player,
} from "../types/types";

export interface ScoreState {
  xScore: number;
  oScore: number;
  drawScore: number;
}

interface UpdateScoresOptions
  extends ScoreState {
  winner: Player | null;
  isDraw: boolean;
}

export function updateScores({
  xScore,
  oScore,
  drawScore,
  winner,
  isDraw,
}: UpdateScoresOptions): ScoreState {
  if (winner === "X") {
    return {
      xScore: xScore + 1,
      oScore,
      drawScore,
    };
  }

  if (winner === "O") {
    return {
      xScore,
      oScore: oScore + 1,
      drawScore,
    };
  }

  if (isDraw) {
    return {
      xScore,
      oScore,
      drawScore: drawScore + 1,
    };
  }

  return {
    xScore,
    oScore,
    drawScore,
  };
}