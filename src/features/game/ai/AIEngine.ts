import type { AIContext, AIStrategy } from "./types";
import { EasyStrategy } from "./strategies/EasyStrategy";
import { MediumStrategy } from "./strategies/MediumStrategy";
import { HardStrategy } from "./strategies/HardStrategy";
import { ImpossibleStrategy } from "./strategies/ImpossibleStrategy";

/**
 * Maps each difficulty level to its strategy.
 */
const STRATEGIES = {
    easy: EasyStrategy,
    medium: MediumStrategy,
    hard: HardStrategy,
    impossible: ImpossibleStrategy,
} as const satisfies Record<AIContext["difficulty"], AIStrategy>;

/**
 * Returns the best move for the selected difficulty.
 */
export function getAIMove(context: AIContext): number {
    return STRATEGIES[context.difficulty].getMove(context);
}