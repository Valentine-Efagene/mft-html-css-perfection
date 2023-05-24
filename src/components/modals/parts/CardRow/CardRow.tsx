import { ReactElement } from "react";
import styles from "./CardRow.module.css";

interface ICardRow {
  title: string;
  children?: ReactElement | string;
  required?: boolean;
  className?: string;
  rightClassName?: string;
  leftClassName?: string;
}

function CardRow({
  title,
  rightClassName,
  leftClassName,
  required = false,
  children,
  className,
}: ICardRow) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className={`${leftClassName} ${styles.left}`}>
        <span
          className={`${styles.titleSpan} ${required ? styles.required : ""}`}
        >
          {title}
        </span>
      </div>
      <div className={`${rightClassName} ${styles.right}`}>{children}</div>
    </div>
  );
}

export default CardRow;
