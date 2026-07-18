import { createInitialState } from "../initialState";

import type { GameActions } from "../types";

import { soundManager } from "../../services/audio";

import type { SetState } from "./helpers";

/**
 * Restarts the current game while
 * preserving scores and settings.
 */
export function createRestart(set: SetState): GameActions["restart"] {
  return () => {
    
    soundManager.play("restart");

    set((state) => {
      const {
        mode,
        ai,
        xScore,
        oScore,
        drawScore,
      } = state;

      return {
        ...createInitialState(),

        mode,
        ai: { ...ai},
        xScore,
        oScore,
        drawScore,
      };
    });
  };
}