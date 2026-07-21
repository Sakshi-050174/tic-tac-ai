import type { AIConfig } from "../../types";
import type { GameActions } from "../types";

import type { SetState } from "./helpers";

/**
 * Updates one or more AI configuration options.
 */
export function createUpdateAI(set: SetState): GameActions["updateAI"] {
  return (config: AIConfig) => {
    set((state) => ({
      ai: { ...state.ai, ...config },
    }));
  };
}
