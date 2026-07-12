import { useGameStore } from "../../../../features/game/store";

import styles  from './TImeline.module.scss';

export default function Timeline() {
  const moves = useGameStore(
    (state) => state.moves
  );

  if (moves.length === 0) {
    return (
      <aside className={styles.timeline}>
        <h3>Move History</h3>

        <p className={styles.empty}>
          No moves yet.
        </p>
      </aside>
    );
  }

  return (
    <aside className={styles.timeline}>
      <h3>Move History</h3>

      <ul className={styles.list}>
        {moves.map((move) => (
          <li
            key={move.id}
            className={styles.item}
          >
            <span>
              #{move.id}
            </span>

            <span>
              {move.player}
            </span>

            <span>
              Cell {move.index + 1}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}