import type {
  BoardState,
  Difficulty,
  GameResult,
  Move,
  Player,
  GameMode
} from "../types";

export interface ScoreState {
  xScore: number;

  oScore: number;

  drawScore: number;
}

export interface TurnResult {
  board: BoardState;

  result: GameResult;

  move: Move;

  scores: ScoreState;

  nextPlayer: Player;
}

export interface UndoMoveOptions {
  moves: Move[];

  mode: GameMode;
}

export interface UndoTurnResult {
  board: BoardState;

  moves: Move[];

  currentPlayer: Player;

  result: GameResult;
}

export interface PlayHumanTurnOptions {
  board: BoardState;

  player: Player;

  index: number;

  moves: Move[];

  scores: ScoreState;
}

export interface PlayAITurnOptions {
  board: BoardState;

  aiPlayer: Player;

  difficulty: Difficulty;

  moves: Move[];

  scores: ScoreState;
}