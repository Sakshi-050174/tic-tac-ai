import type { Player } from "../types";

export function getNextPlayer(
  player: Player
): Player {
  return player === "X" ? "O" : "X";
}