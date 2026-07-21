import { motion } from "framer-motion";

import XSymbol from "../symbols/XSymbol";
import OSymbol from "../symbols/OSymbol";

import type { CellValue } from "../../../features/game/types";

interface Props {
  value: CellValue;
}

export default function CellContent({ value }: Props) {
  if (!value) {
    return null;
  }

  return (
    <motion.span
      initial={{
        scale: 0,
        rotate: -90,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {value === "X" ? <XSymbol /> : <OSymbol />}
    </motion.span>
  );
}
