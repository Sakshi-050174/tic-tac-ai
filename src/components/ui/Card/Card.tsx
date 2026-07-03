import styles from "./Card.module.scss";

import type { CardProps } from "./Card.types";

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <section className={`${styles.card} ${className}`}>
      {title && (
        <header className={styles.header}>
          <h3>{title}</h3>
        </header>
      )}
       <div className={styles.body}>
        {children}
    </div> 
    </section>
  );
}