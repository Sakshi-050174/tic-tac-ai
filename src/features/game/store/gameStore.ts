import { create } from "zustand";

import { INITIAL_BOARD } from "../utils/constants";

import {
  evaluateBoard,
  makeMove,
  undoMove,
} from "../services";

import type {
  BoardState,
  Move,
  Player,
} from "../types";

export interface GameStore {
  board: BoardState;

  currentPlayer: Player;

  winner: Player | null;

  winningLine: ReadonlyArray<number>;

  isDraw: boolean;

  moves: Move[];

  xScore: number;

  oScore: number;

  drawScore: number;

  playMove: (index: number) => void;

  undo: () => void;

  restart: () => void;

  resetScores: () => void;
}

const cloneBoard = (): BoardState => [...INITIAL_BOARD];

export const useGameStore =
  create<GameStore>((set, get) => ({
    board: cloneBoard(),

    currentPlayer: "X",

    winner: null,

    winningLine: [],

    isDraw: false,

    moves: [],

    xScore: 0,

    oScore: 0,

    drawScore: 0,

    playMove(index) {
      const state = get();

      if (state.board[index] !== null) {
        return;
      }

      if (state.winner || state.isDraw) {
        return;
      }

      const board = makeMove(
        state.board,
        index,
        state.currentPlayer
      );

      const result =
        evaluateBoard(board);

      const move: Move = {
        id: state.moves.length + 1,

        player: state.currentPlayer,

        index,

        board: [...board],

        timestamp: Date.now(),
      };

      set({
        board,

        currentPlayer:
          state.currentPlayer === "X"
            ? "O"
            : "X",

        winner: result.winner,

        winningLine:
          result.winningLine ?? [],

        isDraw: result.isDraw,

        moves: [
          ...state.moves,
          move,
        ],

        xScore:
          result.winner === "X"
            ? state.xScore + 1
            : state.xScore,

        oScore:
          result.winner === "O"
            ? state.oScore + 1
            : state.oScore,

        drawScore:
          result.isDraw
            ? state.drawScore + 1
            : state.drawScore,
      });
    },

    undo() {
      const state = get();

      if (state.moves.length === 0) {
        return;
      }

      const {
        board,
        moves,
      } = undoMove(state.moves);

      const result =
        evaluateBoard(board);

      set({
        board,

        moves,

        winner: result.winner,

        winningLine:
          result.winningLine ?? [],

        isDraw: result.isDraw,

        currentPlayer:
          moves.length % 2 === 0
            ? "X"
            : "O",
      });
    },

    restart() {
      set((state) => ({
        board: cloneBoard(),

        currentPlayer: "X",

        winner: null,

        winningLine: [],

        isDraw: false,

        moves: [],

        xScore: state.xScore,

        oScore: state.oScore,

        drawScore: state.drawScore,
      }));
    },

    resetScores() {
      set({
        board: cloneBoard(),

        currentPlayer: "X",

        winner: null,

        winningLine: [],

        isDraw: false,

        moves: [],

        xScore: 0,

        oScore: 0,

        drawScore: 0,
      });
    },
  }));