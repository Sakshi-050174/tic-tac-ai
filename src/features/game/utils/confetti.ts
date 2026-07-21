import confetti from "canvas-confetti";

export function celebrateWinner() {
  const duration = 2200;
  const animationEnd = Date.now() + duration;

  const defaults: confetti.Options = {
    startVelocity: 30,
    spread: 360,
    ticks: 80,
    zIndex: 1000,
  };

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = Math.round(50 * (timeLeft / duration));

    const fire = (originX: number) =>
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: originX,
          y: Math.random() * 0.25,
        },
      });

    fire(Math.random() * 0.3 + 0.1);
    fire(Math.random() * 0.3 + 0.6);
  }, 250);
}
