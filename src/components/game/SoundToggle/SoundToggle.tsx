import { useState } from "react";

import Button from "@/components/ui/Button";

import { useSound } from "@/features/game/hooks/useSound";

export default function SoundToggle() {
  const {
    toggle,
    isMuted,
  } = useSound();

  const [muted, setMuted] =
    useState(isMuted());

  function handleToggle() {
    toggle();

    setMuted(isMuted());
  }

  return (
    <Button
      variant="secondary"
      onClick={handleToggle}
      aria-label={
        muted
          ? "Enable Sound"
          : "Mute Sound"
      }
    >
      {muted ? "🔇" : "🔊"}
    </Button>
  );
}