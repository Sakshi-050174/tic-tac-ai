import { useEffect, useRef } from "react";

import { useMediaQuery } from "react-responsive";
import { useReducedMotion } from "framer-motion";

import Board from "../Board";
import Timeline from "./Timeline";
import Toolbar from "../Toolbar";
import Status from "../Status";
import ScoreCard from "../ScoreCard";

import { celebrateWinner } from "@/features/game/utils/confetti";

import {
  gameSelectors,
  useGameStore,
} from "@/features/game/store";

import styles from "./Game.module.scss";
import OSymbol from "../symbols/OSymbol";
import XSymbol from "../symbols/XSymbol";
import { soundManager } from "@/features/game/services/audio";

export default function Game() {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });

  const shouldReduceMotion =
    useReducedMotion();

  const winner =
    useGameStore(gameSelectors.winner);

  const previousWinner =
    useRef<string | null>(null);

  const xScore = useGameStore(gameSelectors.xScore);
  const oScore = useGameStore(gameSelectors.oScore);
  const drawScore = useGameStore(gameSelectors.drawScore)


  useEffect(() => {
    if (
      !shouldReduceMotion &&
      !previousWinner.current &&
      winner
    ) {
      soundManager.play('win');
      celebrateWinner();
    }

    previousWinner.current = winner;
  }, [winner, shouldReduceMotion]);

  return (
    <main className={styles.game}>
      <section className={styles.top}>
        <Status />

        <div className={styles.scores}>
          <ScoreCard
            label="Player X"
            value={xScore}
            icon={<XSymbol />}
            variant="x"
          />

          <ScoreCard
            label="Draws"
            value={drawScore}
            icon={<span>—</span>}
            variant="draw"
          />

          <ScoreCard
            label="Player O"
            value={oScore}
            icon={<OSymbol />}
            variant="o"
          />
        </div>

      </section>

      <section className={styles.content}>
        <div className={styles.boardSection}>
          <Board />
        </div>

        {!isMobile && <Timeline />}
      </section>

      <Toolbar />
    </main>
  );
}