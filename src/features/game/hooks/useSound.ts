import { useCallback } from "react";

import { soundManager, type SoundName } from "@/features/game/services/audio";

export function useSound() {
    const play = useCallback(
        (sound: SoundName) =>
            soundManager.play(sound),
        []
    );

    return {
        play,

        mute: () =>
            soundManager.mute(),

        unmute: () =>
            soundManager.unmute(),

        toggle: () =>
            soundManager.toggle(),

        isMuted: () =>
            soundManager.isMuted(),

        setVolume: (volume: number) =>
            soundManager.setVolume(volume),
    };
}