import { Trophy } from "lucide-react";

import Container from "../../ui/Container";

import styles from "./Header.module.scss";

import type { HeaderProps } from "./Header.types";

export default function Header({
  title = "TicTac AI",
  subtitle = "Modern Strategy Dashboard",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Trophy size={22} />
            </div>

            <div>
              <h1 className={styles.title}>{title}</h1>

              <p className={styles.subtitle}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}