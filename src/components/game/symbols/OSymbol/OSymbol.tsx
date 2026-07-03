import styles from "./OSymbol.module.scss";

export default function OSymbol() {
  return (
    <svg
      className={styles.symbol}
      viewBox="0 0 100 100"
      aria-hidden
    >
      <circle
        className={styles.circle}
        cx="50"
        cy="50"
        r="32"
      />
    </svg>
  );
}