import click from "@/assets/sounds/click.mp3";
import win from "@/assets/sounds/win.mp3";

export type SoundName = "click" | "win" | "draw" | "undo" | "restart";

const STORAGE_KEY = "tic-tac-toe:sound";

export class SoundManager {
  private volume = 0.6;
  private muted = false;
  private readonly sounds: Record<SoundName, HTMLAudioElement>;

  constructor() {
    this.muted = localStorage.getItem(STORAGE_KEY) === "off";

    this.sounds = {
      click: new Audio(click),
      win: new Audio(win),
      draw: new Audio(win),
      undo: new Audio(click),
      restart: new Audio(click),
    };

    this.initialize();
  }

  private initialize() {
    Object.values(this.sounds).forEach((audio) => {
      audio.preload = "auto";
      audio.volume = this.volume;
    });
  }

  play(sound: SoundName) {
    if (this.muted) {
      return;
    }

    const audio = this.sounds[sound];
    audio.pause();
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem(STORAGE_KEY, this.muted ? "off" : "on");
  }

  isMuted() {
    return this.muted;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));

    Object.values(this.sounds).forEach((audio) => {
      audio.volume = this.volume;
    });
  }
}

export const soundManager = new SoundManager();
