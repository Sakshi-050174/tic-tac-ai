import { getAIMove } from "../../ai";

import { playHumanTurn } from "../../services";

import { soundManager } from "../../services/audio";

import type { GameActions } from "../types";

import type { GetState, SetState } from "./helpers";

import { applyTurn, canPlayMove, delay, shouldPlayAI } from "./helpers";

/**
 * Executes a human or AI move and updates the store.
 */
function executeTurn(
  set: SetState,
  state: ReturnType<GetState>,
  index: number,
) {
  const turn = playHumanTurn({
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

  set((current) => applyTurn(turn, current.moves));
}

/**
 * Executes the AI turn if required.
 */
async function executeAITurn(set: SetState, get: GetState) {
  const state = get();

  if (!shouldPlayAI(state)) {
    return;
  }

  set({
    isThinking: true,
  });

  await delay(state.ai.thinkingDelay);

  const latest = get();

  if (latest.winner || latest.isDraw) {
    set({
      isThinking: false,
    });

    return;
  }

  const move = getAIMove({
    board: latest.board,
    aiPlayer: latest.ai.player,
    difficulty: latest.ai.difficulty,
  });

  executeTurn(set, latest, move);

  set({
    isThinking: false,
  });
}

/**
 * Creates the playMove action.
 */
export function createPlayMove(
  set: SetState,
  get: GetState,
): GameActions["playMove"] {
  return async (index: number) => {
    const state = get();

    if (!canPlayMove(state, index)) {
      return;
    }

    soundManager.play("click");

    executeTurn(set, state, index);

    await executeAITurn(set, get);
  };
}
