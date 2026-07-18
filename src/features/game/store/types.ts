import type {
  AIConfig,
  BoardState,
  Difficulty,
  GameMode,
  Move,
  Player,
} from "../types"

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

  difficulty: Difficulty;

  ai: AIConfig;

  isThinking: boolean;
}

export interface GameActions {
  setMode: (
    mode: GameMode
  ) => void;

  setDifficulty: (
    difficulty: Difficulty
  ) => void;

  setAIPlayer: (
    player: Player
  ) => void;

  setThinking: (
    thinking: boolean
  ) => void;

  playMove: (
    index: number
  ) => Promise<void>;

  undo: () => void;

  restart: () => void;

  resetScores: () => void;

  updateAI(config: Partial<AIConfig>): void;
}

export type GameStore =
  GameState &
  GameActions;