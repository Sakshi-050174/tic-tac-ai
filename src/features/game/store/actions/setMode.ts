import type { GameActions } from "../types";

import type { SetState } from "./helpers";

/**
 * Updates the game mode.
 *
 * Human vs Human  -> AI disabled
 * Human vs AI     -> AI enabled
 */
export function createSetMode(set: SetState): GameActions["setMode"] {
  return (mode) => {
    set((state) => ({
      mode,
      isThinking: false,
      ai: {
        ...state.ai,
        enabled: mode === "human-vs-ai",
      },
    }));
  };
}
