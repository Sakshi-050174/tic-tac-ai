import type { Player } from "@/features/game/types";

export interface StatusProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isThinking: boolean;
}