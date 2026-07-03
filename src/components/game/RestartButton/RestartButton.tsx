import { RotateCcw } from "lucide-react";

import Button from "../../ui/Button";

import { useGameStore } from "../../../features/game/store";

import styles from "./RestartButton.module.scss";

export default function RestartButton() {
  const restart = useGameStore(
    (state) => state.restart
  );

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.button}
        onClick={restart}
      >
        <RotateCcw size={18} />

        Restart Match
      </Button>
    </div>
  );
}