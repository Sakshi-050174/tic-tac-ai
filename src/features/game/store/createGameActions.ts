import type {
  StoreApi,
  UseBoundStore,
} from "zustand";

import {
  evaluateBoard,
  playAITurn,
  playHumanTurn,
  undoMove,
} from "../services";

import type {
  Move,
} from "../types";

import {
  createInitialState,
} from "./initialState";

import type {
  GameStore,
} from "./types";
import { soundManager } from "../services/audio";

type SetState =
  UseBoundStore<
    StoreApi<GameStore>
  >["setState"];

type GetState =
  UseBoundStore<
    StoreApi<GameStore>
  >["getState"];

const delay = (ms: number) =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, ms)
  );

function applyTurn(
  turn: ReturnType<typeof playHumanTurn>,
  moves: Move[]
) {
  return {
    board: turn.board,

    currentPlayer: turn.nextPlayer,

    winner: turn.result.winner,

    winningLine: turn.result.winningLine,

    isDraw: turn.result.isDraw,

    moves: [...moves, turn.move],

    xScore: turn.scores.xScore,

    oScore: turn.scores.oScore,

    drawScore: turn.scores.drawScore,
  };
}

export function createGameActions(
  set: SetState,
  get: GetState
) {
  return {
    setMode(mode) {
      set((state) => ({
        mode,
        ai: {
          ...state.ai,
          enabled: mode === "human-vs-ai",
        },
      }));
    },

    setDifficulty(
      difficulty
    ) {
      set((state) => ({
        difficulty,

        ai: {
          ...state.ai,

          difficulty,
        },
      }));
    },

    setAIPlayer(player) {
      set((state) => ({
        ai: {
          ...state.ai,

          player,
        },
      }));
    },

    setThinking(
      isThinking
    ) {
      set({
        isThinking,
      });
    },

    async playMove(index) {
      const state =
        get();

      if (
        state.board[index] !==
        null ||
        state.winner ||
        state.isDraw ||
        state.isThinking
      ) {
        return;
      }

      soundManager.play("click");

      //--------------------------------
      // Human Turn
      //--------------------------------

      const humanTurn =
        playHumanTurn({
          board:
            state.board,

          player:
            state.currentPlayer,

          index,

          moves:
            state.moves,

          scores: {
            xScore:
              state.xScore,

            oScore:
              state.oScore,

            drawScore:
              state.drawScore,
          },
        });

      set((state) =>
        applyTurn(
          humanTurn,
          state.moves
        )
      );

      const latest =
        get();

      const shouldPlayAI =
        latest.ai.enabled &&
        !latest.winner &&
        !latest.isDraw &&
        latest.currentPlayer ===
        latest.ai.player;

      if (!shouldPlayAI) {
        return;
      }

      //--------------------------------
      // AI Thinking
      //--------------------------------

      set({
        isThinking: true,
      });

      await delay(
        latest.ai
          .thinkingDelay
      );

      const current =
        get();

      //--------------------------------
      // Game may have changed
      //--------------------------------

      if (
        current.winner ||
        current.isDraw
      ) {
        set({
          isThinking:
            false,
        });

        return;
      }

      //--------------------------------
      // AI Turn
      //--------------------------------

      const aiTurn =
        playAITurn({
          board:
            current.board,

          aiPlayer:
            current.ai.player,

          difficulty:
            current.ai
              .difficulty,

          moves:
            current.moves,

          scores: {
            xScore:
              current.xScore,

            oScore:
              current.oScore,

            drawScore:
              current.drawScore,
          },
        });

      if (!aiTurn) {
        set({
          isThinking:
            false,
        });

        return;
      }

      set((state) => ({
        ...applyTurn(
          aiTurn,
          state.moves
        ),

        isThinking:
          false,
      }));
    },

    undo() {
      const state =
        get();

      const undoState =
        undoMove({
          moves:
            state.moves,

          mode:
            state.mode,
        });

      const result =
        evaluateBoard(
          undoState.board
        );

      soundManager.play('undo');

      set({
        board:
          undoState.board,

        moves:
          undoState.moves,

        currentPlayer:
          undoState.moves
            .length % 2 ===
            0
            ? "X"
            : "O",

        winner:
          result.winner,

        winningLine:
          result.winningLine,

        isDraw:
          result.isDraw,

        isThinking:
          false,
      });
    },

    restart() {

      soundManager.play("restart");

      set((state) => ({
        ...createInitialState(),

        mode:
          state.mode,

        difficulty:
          state.difficulty,

        ai:
          state.ai,

        xScore:
          state.xScore,

        oScore:
          state.oScore,

        drawScore:
          state.drawScore,
      }));
    },

    resetScores() {
      soundManager.play('restart');
      set((state) => ({
        ...createInitialState(),

        mode:
          state.mode,

        difficulty:
          state.difficulty,

        ai:
          state.ai,
      }));
    },
  };
}