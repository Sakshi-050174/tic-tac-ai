import type { CellValue } from "../../../features/game/types";

export interface CellProps {
  value: CellValue;

  isWinning?: boolean;

  disabled?: boolean;

  onClick: () => void;
}