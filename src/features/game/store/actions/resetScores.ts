import { createInitialState } from "../initialState";

import type { GameActions } from "../types";

import { soundManager } from "../../services/audio";

import type { SetState } from "./helpers";

/**
 * Resets the entire game including scores
 * while preserving game settings.
 */
export function createResetScores(set: SetState): GameActions["resetScores"] {
  return () => {
    soundManager.play("restart");

    set((state) => {
      const {
        mode,
        ai,
      } = state;

      return {
        ...createInitialState(),

        mode,

        ai: {...ai}
      };
    });
  };
}