import styles from "./XSymbol.module.scss";

export default function XSymbol({ size = 56 }) {
  const style = {
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <svg style={style} viewBox="0 0 100 100" aria-hidden>
      <line className={styles.line} x1="20" y1="20" x2="80" y2="80" />

      <line className={styles.line} x1="80" y1="20" x2="20" y2="80" />
    </svg>
  );
}
