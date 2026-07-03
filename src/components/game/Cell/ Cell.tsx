import { motion } from "framer-motion";

import CellContent from "./CellContent";

import styles from "./Cell.module.scss";

import type { CellProps } from "./Cell.types";

export default function Cell({
  value,
  isWinning = false,
  disabled = false,
  onClick,
}: CellProps) {
  return (
    <motion.button
      type="button"
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.04,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.96,
            }
      }
      className={`${styles.cell} ${
        isWinning ? styles.winning : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={
        value
          ? `Cell ${value}`
          : "Empty Cell"
      }
    >
      <CellContent value={value} />
    </motion.button>
  );
}