import { INITIAL_BOARD } from "../utils/constants";
import type { AIConfig, BoardState } from "../types";
import type { GameState } from "./types";

const createBoard = (): BoardState => [...INITIAL_BOARD];

export const DEFAULT_AI: AIConfig = {
  enabled: false,
  player: "O",
  difficulty: "medium",
  thinkingDelay: 500,
};

export const createInitialState =
  (): GameState => ({
    board: createBoard(),
    currentPlayer: "X",
    winner: null,
    winningLine: [],
    isDraw: false,
    moves: [],
    xScore: 0,
    oScore: 0,
    drawScore: 0,
    mode: "human-vs-human",
    ai: {...DEFAULT_AI},
    isThinking: false,
  });