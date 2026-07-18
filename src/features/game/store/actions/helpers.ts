import type { Move, Player } from "../../types";

import { playHumanTurn } from "../../services";

import type { GameStore } from "../types";

/**
 * Shared Zustand types.
 */
export type SetState =
    (
        partial: | Partial<GameStore>
            | ((state: GameStore) => Partial<GameStore>)
    ) => void;

export type GetState = () => GameStore;

/**
 * Small async delay used for AI thinking.
 */
export const delay = (ms: number) =>
    new Promise<void>(
        (resolve) => setTimeout(resolve, ms)
    );

/**
 * Returns false when a move
 * should not be played.
 */
export function canPlayMove(state: GameStore, index: number) {
    return !(
        state.board[index] !== null ||
        state.winner ||
        state.isDraw ||
        state.isThinking
    );
}

/**
 * Determines whether the AI
 * should play after a human move.
 */
export function shouldPlayAI(state: GameStore) {
    return (
        state.ai.enabled &&
        !state.winner &&
        !state.isDraw &&
        state.currentPlayer === state.ai.player
    );
}

/**
 * Converts a service result
 * into a partial Zustand state.
 */
export function applyTurn(turn: ReturnType<typeof playHumanTurn>, moves: Move[]) {
    return {
        board: turn.board,

        currentPlayer: turn.nextPlayer,

        winner: turn.result.winner,

        winningLine: turn.result.winningLine,

        isDraw: turn.result.isDraw,

        moves: [...moves, turn.move],

        xScore: turn.scores.xScore,

        oScore: turn.scores.oScore,

        drawScore: turn.scores.drawScore
    };
}

/**
 * Returns the opposite player.
 */
export function getOpponent(player: Player): Player {
    return player === "X" ? "O" : "X";
}

/**
 * Returns the player whose turn it is
 * based on the current move history.
 */
export function getCurrentPlayer(moves: Move[]): Player {
  return moves.length % 2 === 0 ? "X" : "O";
}