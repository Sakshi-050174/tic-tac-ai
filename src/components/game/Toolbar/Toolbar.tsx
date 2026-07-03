import Button from "../../ui/Button";

import { useGameStore } from "../../../features/game/store";

import styles from "./Toolbar.module.scss";

export default function Toolbar() {
  const {
    undo,
    restart,
    resetScores,
    moves,
  } = useGameStore();

  return (
    <footer className={styles.toolbar}>
      <Button
        variant="secondary"
        onClick={undo}
        disabled={moves.length === 0}
      >
        Undo
      </Button>

      <Button
        variant="primary"
        onClick={restart}
      >
        Restart
      </Button>

      <Button
        variant="danger"
        onClick={resetScores}
      >
        Reset Scores
      </Button>
    </footer>
  );
}