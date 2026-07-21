import { gameSelectors, useGameStore } from "@/features/game/store";

import XSymbol from "../symbols/XSymbol";
import OSymbol from "../symbols/OSymbol";

import styles from "./ScoreBar.module.scss";

export default function ScoreBar() {
  const xScore = useGameStore(gameSelectors.xScore);
  const oScore = useGameStore(gameSelectors.oScore);
  const drawScore = useGameStore(gameSelectors.drawScore);

  return (
    <section className={styles.scoreBar}>
      <div className={`${styles.item} ${styles.x}`}>
        <XSymbol size={24} />
        <span>{xScore}</span>
      </div>

      <div className={`${styles.item} ${styles.draw}`}>
        <span className={styles.drawIcon}>—</span>
        <span>{drawScore}</span>
      </div>

      <div className={`${styles.item} ${styles.o}`}>
        <OSymbol size={24} />
        <span>{oScore}</span>
      </div>
    </section>
  );
}
