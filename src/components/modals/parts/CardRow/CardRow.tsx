import { ReactElement } from "react";
import styles from "./CardRow.module.css";

interface ICardRow {
  title: string;
  children?: ReactElement | string;
  required?: boolean;
}

function CardRow({ title, required = false, children }: ICardRow) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span
          className={`${styles.titleSpan} ${required ? styles.required : ""}`}
        >
          {title}
        </span>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}

export default CardRow;
