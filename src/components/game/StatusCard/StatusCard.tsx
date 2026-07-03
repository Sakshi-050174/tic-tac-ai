import Card from "../../ui/Card";

import { useGameStore } from "../../../features/game/store";
import styles from "./StatusCard.module.scss";

export default function StatusCard() {
  const {
    winner,
    currentPlayer,
    isDraw,
  } = useGameStore();

  let status = (
    <>
      Turn:{" "}
      <span className={currentPlayer == 'X' ?styles.turnX : styles.turnO}>
        {currentPlayer}
      </span>
    </>
  );

  if (winner) {
    status = (
      <>
         <span className={styles.winner}>
          Winner:{" "}
        </span>
        <span className={winner == 'X' ?styles.turnX : styles.turnO}>
          {winner}
        </span>
      </>
    );
  }

  if (isDraw) {
    status = (
      <>
        Game Draw
      </>
    );
  }

  return (
    <Card title="Game Status">
      <h2>{status}</h2>
    </Card>
  );
}