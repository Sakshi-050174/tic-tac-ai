import type {
  ChangeEvent,
} from "react";

import {
  gameSelectors,
  useGameStore,
} from "@/features/game/store";

import type {
  Difficulty,
  GameMode,
  Player,
} from "@/features/game/types";

import styles from "./GameSettings.module.scss";

export default function GameSettings() {
  const mode = useGameStore(
    gameSelectors.mode
  );

  const ai = useGameStore(
    gameSelectors.ai
  );

  const setMode = useGameStore(
    gameSelectors.setMode
  );

  const updateAI = useGameStore(
    gameSelectors.updateAI
  );

  function handleModeChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setMode(
      event.target.value as GameMode
    );
  }

  function handleDifficultyChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    updateAI({
      difficulty:
        event.target
          .value as Difficulty,
    });
  }

  function handlePlayerChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    updateAI({
      player:
        event.target.value as Player,
    });
  }

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>
        Game Settings
      </h2>

      <div className={styles.section}>
        <label
          htmlFor="game-mode"
          className={styles.label}
        >
          Mode
        </label>

        <select
          id="game-mode"
          className={styles.select}
          value={mode}
          onChange={
            handleModeChange
          }
        >
          <option value="human-vs-human">
            Human vs Human
          </option>

          <option value="human-vs-ai">
            Human vs AI
          </option>
        </select>
      </div>

      <div className={styles.section}>
        <label
          htmlFor="difficulty"
          className={styles.label}
        >
          Difficulty
        </label>

        <select
          id="difficulty"
          className={styles.select}
          value={ai.difficulty}
          disabled={!ai.enabled}
          onChange={
            handleDifficultyChange
          }
        >
          <option value="easy">
            Easy
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="hard">
            Hard
          </option>

          <option value="impossible">
            Impossible
          </option>
        </select>
      </div>

      <div className={styles.section}>
        <label
          htmlFor="player"
          className={styles.label}
        >
          Play As
        </label>

        <select
          id="player"
          className={styles.select}
          value={ai.player}
          disabled={!ai.enabled}
          onChange={
            handlePlayerChange
          }
        >
          <option value="X">
            X
          </option>

          <option value="O">
            O
          </option>
        </select>
      </div>
    </aside>
  );
}