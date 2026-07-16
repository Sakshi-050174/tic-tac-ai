import clsx from "clsx";

import Cell from "../Cell";

import { gameSelectors, useGameStore } from "../../../features/game/store";

import styles from "./Board.module.scss";

export default function Board() {
  const board = useGameStore(gameSelectors.board);
  const playMove = useGameStore(gameSelectors.playMove);
  const winner = useGameStore(gameSelectors.winner);
  const isDraw = useGameStore(gameSelectors.isDraw);
  const winningLine = useGameStore(gameSelectors.winningLine);

  return (
    <section className={styles.boardWrapper}>
      <div
        className={clsx(
          styles.board,
          winner && styles.boardWon
        )}
        aria-label="Tic Tac Toe Board"
      >
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            isWinning={winningLine.includes(index)}
            index = {index}
            disabled={
              value !== null ||
              winner !== null ||
              isDraw
            }
           onClick={playMove}
          />
        ))}
      </div>
    </section>
  );
}