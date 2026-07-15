import type {
  BoardState,
  Move,
  Player,
} from "./types";

export interface GameSnapshot {
  board: BoardState;

  currentPlayer: Player;

  winner: Player | null;

  winningLine: readonly number[];

  isDraw: boolean;

  moves: Move[];

  xScore: number;

  oScore: number;

  drawScore: number;

  isThinking: boolean;
}