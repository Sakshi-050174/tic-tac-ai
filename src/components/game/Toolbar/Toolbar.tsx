import Button from "../../ui/Button";

import { useGameStore } from "../../../features/game/store";
import { gameSelectors } from "../../../features/game/store/selectors";

import styles from "./Toolbar.module.scss";
import type { Move } from "@/features/game/types";
import SoundToggle from "../SoundToggle";

export default function Toolbar() {
  const undo = useGameStore(gameSelectors.undo);
  const restart = useGameStore(gameSelectors.restart);
  const resetScores = useGameStore(gameSelectors.resetScores);
  const moves: Move[] = useGameStore(gameSelectors.moves);

  const canUndo = moves.length > 0;

  return (
    <footer
      className={styles.toolbar}
      aria-label="Game Controls"
    >
      <SoundToggle />
      <Button
        variant="secondary"
        onClick={undo}
        disabled={!canUndo}
        aria-label="Undo last move"
      >
        Undo
      </Button>

      <Button
        variant="primary"
        onClick={restart}
        aria-label="Restart current game"
      >
        Restart
      </Button>

      <Button
        variant="danger"
        onClick={resetScores}
        aria-label="Reset all scores"
      >
        Reset Scores
      </Button>
    </footer>
  );
}