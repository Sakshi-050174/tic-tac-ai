import type {
  Move,
  Player,
} from "../types";

interface CreateMoveOptions {
  moveNumber: number;

  player: Player;

  index: number;
}

export function createMove({
  moveNumber,
  player,
  index,
}: CreateMoveOptions): Move {
  return {
    id: moveNumber,

    player,

    index,

    timestamp:
      Date.now(),
  };
}