import type { ReactNode } from "react";

export interface ScoreCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  variant?: "x" | "o" | "draw";
}