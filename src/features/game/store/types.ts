import type {
  AIConfig,
  BoardState,
  GameMode,
  Move,
  Player,
} from "../types";

export interface ScoreState {
  xScore: number;
  oScore: number;
  drawScore: number;
}

export interface GameState extends ScoreState {
  board: BoardState;
  currentPlayer: Player;
  winner: Player | null;
  winningLine: readonly number[];
  isDraw: boolean;
  moves: Move[];
  mode: GameMode;
  ai: AIConfig;
  isThinking: boolean;
}

export interface GameActions {
  setMode(mode: GameMode): void;
  updateAI(config: Partial<AIConfig>): void;
  playMove(index: number): Promise<void>;
  undo(): void;
  restart(): void;
  resetScores(): void;
}

export type GameStore = GameState & GameActions;