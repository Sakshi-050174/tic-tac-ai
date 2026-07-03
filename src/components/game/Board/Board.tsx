import Cell from "../Cell";

import { useGameStore } from "../../../features/game/store";

import styles from "./Board.module.scss";

export default function Board() {
  const {
    board,
    playMove,
    winner,
    isDraw,
    winningLine,
  } = useGameStore();

  return (
    <section className={styles.boardWrapper}>
      <div
        className={styles.board}
        aria-label="Tic Tac Toe Board"
      >
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            isWinning={winningLine.includes(index)}
            disabled={
              value !== null ||
              winner !== null ||
              isDraw
            }
            onClick={() => playMove(index)}
          />
        ))}
      </div>
    </section>
  );
}