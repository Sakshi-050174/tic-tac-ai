import {
  rebuildBoard,
} from "./rebuildBoard";
import type { UndoMoveOptions } from "./types";

export function undoMove({
  moves,
  mode,
}: UndoMoveOptions) {
  const removeCount =
    mode === "human-vs-ai"
      ? 2
      : 1;

  const updatedMoves =
    moves.slice(
      0,
      Math.max(
        0,
        moves.length -
          removeCount
      )
    );

  return {
    moves: updatedMoves,

    board:
      rebuildBoard(
        updatedMoves
      ),
  };
}