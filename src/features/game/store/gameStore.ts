import { create } from "zustand";
import { createInitialState } from "./initialState";
import { createGameActions } from "./createGameActions";
import type { GameStore } from "./types";

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialState(),
  ...createGameActions(set, get),
}));
