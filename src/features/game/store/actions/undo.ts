import { evaluateBoard, undoMove } from "../../services";

import { soundManager } from "../../services/audio";

import type { GameActions } from "../types";

import type {
  GetState,
  SetState,
} from "./helpers";

import {
  getCurrentPlayer,
} from "./helpers";

/**
 * Undoes the last move (or last two moves in AI mode)
 * and recalculates the current game state.
 */
export function createUndo(
  set: SetState,
  get: GetState
): GameActions["undo"] {
  return () => {
    const state = get();

    const undoState = undoMove({
      moves: state.moves,

      mode: state.mode,
    });

    const result = evaluateBoard(
      undoState.board
    );

    soundManager.play("undo");

    set({
      board: undoState.board,

      moves: undoState.moves,

      currentPlayer:
        getCurrentPlayer(
          undoState.moves
        ),

      winner: result.winner,

      winningLine: [...result.winningLine],

      isDraw: result.isDraw,

      isThinking: false,
    });
  };
}