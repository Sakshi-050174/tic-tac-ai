import clsx from "clsx";

import styles from "./Container.module.scss";

import type { ContainerProps } from "./Container.types";

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div className={clsx(styles.container, className)}>
      {children}
    </div>
  );
}