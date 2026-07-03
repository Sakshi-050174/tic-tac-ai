import { type Player } from "../../../features/game/types";

export interface StatusCardProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
}