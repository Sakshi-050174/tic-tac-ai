import { memo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import styles from "./ScoreCard.module.scss";

import type { ScoreCardProps } from "./ScoreCard.types";

function ScoreCard({
  label,
  value,
  icon,
  variant = "draw",
}: ScoreCardProps) {
  return (
    <motion.article
      layout
      className={clsx(styles.card, styles[variant])}
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>

        <span className={styles.label}>{label}</span>
      </div>

      <motion.span
        key={value}
        className={styles.value}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {value}
      </motion.span>
    </motion.article>
  );
}

export default memo(ScoreCard);