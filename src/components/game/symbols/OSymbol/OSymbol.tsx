import styles from "./OSymbol.module.scss";

export default function OSymbol({ size = 56 }) {
  const style = {
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <svg style={style} viewBox="0 0 100 100" aria-hidden>
      <circle className={styles.circle} cx="50" cy="50" r="32" />
    </svg>
  );
}
