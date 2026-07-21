import { Settings, RotateCcw, Undo2, Volume2, VolumeX } from "lucide-react";
import { gameSelectors, useGameStore } from "@/features/game/store";
import { useState } from "react";
import styles from "./Header.module.scss";
import { useSound } from "@/features/game/hooks/useSound";

interface HeaderProps {
  onSettingsClick: () => void;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Header({ onSettingsClick }: HeaderProps) {
  const mode = useGameStore(gameSelectors.mode);
  const ai = useGameStore(gameSelectors.ai);

  const undo = useGameStore(gameSelectors.undo);
  const restart = useGameStore(gameSelectors.restart);

  const winner = useGameStore(gameSelectors.winner);
  const isDraw = useGameStore(gameSelectors.isDraw);
  const currentPlayer = useGameStore(gameSelectors.currentPlayer);
  const isThinking = useGameStore(gameSelectors.isThinking);
  const { toggle, isMuted } = useSound();

  const [muted, setMuted] = useState(isMuted());

  function toggleSound() {
    toggle();
    setMuted(isMuted());
  }

  function getStatus() {
    if (winner) {
      return `🏆 ${winner} Wins`;
    }

    if (isDraw) {
      return "🤝 Draw";
    }

    if (isThinking) {
      return "🤖 AI Thinking...";
    }

    return `${currentPlayer} Turn`;
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Tic Tac AI</h1>

        <p className={styles.subtitle}>
          {mode === "human-vs-ai"
            ? `Human vs AI • ${capitalize(ai.difficulty)}`
            : "Human vs Human"}
        </p>

        <span className={styles.status}>{getStatus()}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={undo} title="Undo">
          <Undo2 size={18} />
        </button>

        <button onClick={restart} title="Restart">
          <RotateCcw size={18} />
        </button>

        <button onClick={toggleSound} title="Sound">
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button onClick={onSettingsClick} title="Settings">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
