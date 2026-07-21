import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "react-responsive";
import { useReducedMotion } from "framer-motion";

import Board from "../Board";
import Timeline from "../Timeline";
import Header from "../Header";
import ScoreBar from "../ScoreBar";
import GameSettings from "../GameSettings";

import { celebrateWinner } from "@/features/game/utils/confetti";

import { gameSelectors, useGameStore } from "@/features/game/store";

import { soundManager } from "@/features/game/services/audio";

import styles from "./Game.module.scss";

export default function Game() {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });

  const shouldReduceMotion = useReducedMotion();

  const [showSettings, setShowSettings] = useState(false);

  const winner = useGameStore(gameSelectors.winner);

  const previousWinner = useRef<string | null>(null);

  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSettings) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSettings]);

  useEffect(() => {
    if (!shouldReduceMotion && !previousWinner.current && winner) {
      soundManager.play("win");

      celebrateWinner();
    }

    previousWinner.current = winner;
  }, [winner, shouldReduceMotion]);

  return (
    <main className={styles.game}>
      <div ref={settingsRef} className={styles.settingsContainer}>
        <Header onSettingsClick={() => setShowSettings((prev) => !prev)} />

        {showSettings && (
          <div className={styles.settingsWrapper}>
            <GameSettings />
          </div>
        )}
      </div>

      <ScoreBar />

      <section className={styles.content}>
        <div className={styles.boardSection}>
          <Board />
        </div>

        {!isMobile && <Timeline />}
      </section>
    </main>
  );
}
