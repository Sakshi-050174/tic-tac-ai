import type { KeyboardEvent } from "react";

import type { CellValue } from "@/features/game/types";

export interface CellProps {
  index: number;

  value: CellValue;

  isWinning?: boolean;

  disabled?: boolean;

  tabIndex?: number;

  onClick: (index: number) => void;

  onKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => void;
}