import Card from "../../ui/Card";

import { useGameStore } from "../../../features/game/store";

import styles from "./StatsCard.module.scss";

export default function StatsCard() {
  const {
    xScore,
    oScore,
    drawScore,
  } = useGameStore();

  return (
    <Card title="Statistics">
      <div className={styles.stats}>
        <div>
          <span className={styles.symbol}>X</span>

          <strong>{xScore}</strong>
        </div>

        <div>
          <span className={`${styles.symbol} ${styles.OSymbol}`}>O</span>

          <strong>{oScore}</strong>
        </div>

        <div>
          <span className={styles.draw}>Draw</span>

          <strong>{drawScore}</strong>
        </div>
      </div>
    </Card>
  );
}