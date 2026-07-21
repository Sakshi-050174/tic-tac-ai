import type { StoreApi, UseBoundStore } from "zustand";
import {
  evaluateBoard,
  playAITurn,
  playHumanTurn,
  undoMove,
} from "../services";
import { soundManager } from "../services/audio";
import type { AIConfig, GameMode, Move } from "../types";
import { createInitialState } from "./initialState";
import type { GameStore } from "./types";

type SetState = UseBoundStore<StoreApi<GameStore>>["setState"];

type GetState = UseBoundStore<StoreApi<GameStore>>["getState"];

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const applyTurn = (turn: ReturnType<typeof playHumanTurn>, moves: Move[]) => {
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
};

export function createGameActions(set: SetState, get: GetState) {
  return {
    setMode(mode: GameMode) {
      set((state) => ({
        mode,
        ai: {
          ...state.ai,
          enabled: mode === "human-vs-ai",
        },
      }));
    },

    updateAI(config: Partial<AIConfig>) {
      set((state) => ({
        ai: {
          ...state.ai,
          ...config,
        },
      }));
    },

    async playMove(index: number) {
      const state = get();

      if (
        state.board[index] !== null ||
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

      const humanTurn = playHumanTurn({
        board: state.board,
        player: state.currentPlayer,
        index,
        moves: state.moves,
        scores: {
          xScore: state.xScore,
          oScore: state.oScore,
          drawScore: state.drawScore,
        },
      });

      set((state) => applyTurn(humanTurn, state.moves));

      const stateAfterHumanMove = get();

      const shouldPlayAI =
        stateAfterHumanMove.ai.enabled &&
        !stateAfterHumanMove.winner &&
        !stateAfterHumanMove.isDraw &&
        stateAfterHumanMove.currentPlayer === stateAfterHumanMove.ai.player;

      if (!shouldPlayAI) {
        return;
      }

      //--------------------------------
      // AI Thinking
      //--------------------------------

      set({ isThinking: true });

      await delay(stateAfterHumanMove.ai.thinkingDelay);

      const stateBeforeAI = get();

      if (stateBeforeAI.winner || stateBeforeAI.isDraw) {
        set({ isThinking: false });
        return;
      }

      //--------------------------------
      // AI Turn
      //--------------------------------

      const aiTurn = playAITurn({
        board: stateBeforeAI.board,
        aiPlayer: stateBeforeAI.ai.player,
        difficulty: stateBeforeAI.ai.difficulty,
        moves: stateBeforeAI.moves,
        scores: {
          xScore: stateBeforeAI.xScore,
          oScore: stateBeforeAI.oScore,
          drawScore: stateBeforeAI.drawScore,
        },
      });

      if (!aiTurn) {
        set({ isThinking: false });
        return;
      }

      set((state) => ({
        ...applyTurn(aiTurn, state.moves),
        isThinking: false,
      }));
    },

    undo() {
      const state = get();

      const undoState = undoMove({
        moves: state.moves,
        mode: state.mode,
      });

      const result = evaluateBoard(undoState.board);

      soundManager.play("undo");

      set({
        board: undoState.board,
        moves: undoState.moves,
        currentPlayer: undoState.moves.length % 2 === 0 ? "X" : "O",
        winner: result.winner,
        winningLine: result.winningLine,
        isDraw: result.isDraw,
        isThinking: false,
      });
    },

    restart() {
      soundManager.play("restart");

      set((state) => ({
        ...createInitialState(),
        mode: state.mode,
        ai: { ...state.ai },
        xScore: state.xScore,
        oScore: state.oScore,
        drawScore: state.drawScore,
      }));
    },

    resetScores() {
      soundManager.play("restart");

      set((state) => ({
        ...createInitialState(),
        mode: state.mode,
        ai: { ...state.ai },
      }));
    },
  };
}
