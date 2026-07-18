import type { Player } from "./types";

export type GameMode =
  | "human-vs-human"
  | "human-vs-ai";

export type Difficulty =
  | "easy"
  | "medium"
  | "hard"
  | "impossible";

export interface AIConfig {
  enabled: boolean;

  player: Player;

  difficulty: Difficulty;

  thinkingDelay: number;
}