import { forwardRef, memo } from "react";

import { motion } from "framer-motion";
import clsx from "clsx";

import CellContent from "./CellContent";

import styles from "./Cell.module.scss";

import type { CellProps } from "./Cell.types";

const Cell = forwardRef<HTMLButtonElement, CellProps>(
  (
    {
      index,
      value,
      isWinning = false,
      disabled = false,
      tabIndex = -1,
      onClick,
      onKeyDown,
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        role="gridcell"
        tabIndex={tabIndex}
        disabled={disabled}
        aria-disabled={disabled}
        aria-selected={isWinning}
        aria-label={value ? `Occupied by ${value}` : "Empty cell"}
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
        className={clsx(styles.cell, isWinning && styles.winning)}
        onClick={() => onClick(index)}
        onKeyDown={(event) => onKeyDown?.(event, index)}
      >
        <CellContent value={value} />
      </motion.button>
    );
  },
);

Cell.displayName = "Cell";

export default memo(Cell);
