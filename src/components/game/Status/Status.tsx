import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import { gameSelectors, useGameStore } from "@/features/game/store";

import styles from "./Status.module.scss";

export default function Status() {
  const shouldReduceMotion = useReducedMotion();

  const currentPlayer = useGameStore(gameSelectors.currentPlayer);
  const winner = useGameStore(gameSelectors.winner);
  const isDraw = useGameStore(gameSelectors.isDraw);
  const isThinking = useGameStore(gameSelectors.isThinking);

  let message = "";
  let variant = styles.turn;

  if (winner) {
    message = `🎉 Player ${winner} Wins!`;
    variant = styles.winner;
  } else if (isDraw) {
    message = "🤝 It's a Draw!";
    variant = styles.draw;
  } else if (isThinking) {
    message = "🤖 AI is thinking...";
    variant = styles.thinking;
  } else {
    message =
      currentPlayer === "X"
        ? "❌ Player X's Turn"
        : "⭕ Player O's Turn";

    variant = styles.turn;
  }

  return (
    <section
      className={styles.status}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          layout
          className={clsx(styles.content, variant)}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -8,
                }
          }
          transition={{
            duration: 0.2,
          }}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}