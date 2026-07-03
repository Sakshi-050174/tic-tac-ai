export type Player = "X" | "O";

export type CellValue = Player | null;

export type BoardState = CellValue[];

export interface Move {
  id: number;

  player: Player;

  index: number;

  board: BoardState;

  timestamp: number;
}

export interface GameResult {
  winner: Player | null;

  isDraw: boolean;

  winningLine: ReadonlyArray<number>;
}