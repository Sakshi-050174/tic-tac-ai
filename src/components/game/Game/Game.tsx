import Board from "../Board";

import Timeline from "./Timeline";

import Toolbar from "../Toolbar";

import StatusCard from "../StatusCard";

import StatisticsPanel from "../StatsCard";

import styles from "./Game.module.scss";
import { useMediaQuery } from "react-responsive";

export default function Game() {
  const isMobile = useMediaQuery({
  maxWidth: 767,
});
  return (
    <main className={styles.game}>
      <section className={styles.top}>
        <StatusCard />

        <StatisticsPanel />
      </section>

      <section className={styles.content}>
        <div className={styles.boardSection}>
          <Board />
        </div>

        {!isMobile && <Timeline />}
      </section>
      <Toolbar />

     
    </main>
  );
}