export type Player = "X" | "O";

export type CellValue = Player | null;

export type BoardState = CellValue[];

export type GameMode = "human-vs-human" | "human-vs-ai";

export type Difficulty = "easy" | "medium" | "hard" | "impossible";

export interface Move {
  id: number;

  player: Player;

  index: number;

  timestamp: number;
}

export interface GameResult {
  winner: Player | null;

  isDraw: boolean;

  winningLine: ReadonlyArray<number>;
}

export interface AIConfig {
  enabled: boolean;

  player: Player;

  difficulty: Difficulty;

  thinkingDelay: number;
}
