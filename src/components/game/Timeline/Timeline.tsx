import { motion } from "framer-motion";

import { useGameStore, gameSelectors } from "@/features/game/store";

import styles from "./Timeline.module.scss";
import XSymbol from "../symbols/XSymbol";
import OSymbol from "../symbols/OSymbol";

const CELL_NAMES = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

export default function Timeline() {
  const moves = useGameStore(gameSelectors.moves);

  if (moves.length === 0) {
    return (
      <aside className={styles.timeline}>
        <h3>Move History</h3>

        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🎮</span>

          <p>Game hasn't started yet.</p>

          <small>Make the first move.</small>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.timeline}>
      <h3>Move History</h3>

      <ul className={styles.list}>
        {moves.map((move, index) => {
          const isLatest = index === moves.length - 1;

          return (
            <motion.li
              key={move.id}
              layout
              initial={{
                opacity: 0,
                x: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`${styles.item} ${isLatest ? styles.latest : ""}`}
            >
              <span className={styles.player}>
                {move.player === "X" ? (
                  <XSymbol size={20} />
                ) : (
                  <OSymbol size={20} />
                )}
              </span>

              <span className={styles.cell}>{CELL_NAMES[move.index]}</span>

              <span className={styles.move}>#{move.id}</span>
            </motion.li>
          );
        })}
      </ul>
    </aside>
  );
}
