import { Link, useLocation } from "react-router-dom";
import styles from "./Tab.module.css";
import { tab } from "../../../types/inputs";

interface ITabProps {
  tabs: tab[];
}

const Tab = ({ tabs }: ITabProps) => {
  const { pathname } = useLocation();

  return (
    <ul className={`${styles.container} ${styles.nav}`}>
      {tabs?.map((tab) => {
        const { to, title } = tab;

        return (
          <li
            key={to}
            className={`${styles.navItem} ${
              pathname === to ? styles.active : null
            }`}
          >
            <Link to={to} className={styles.anchor}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tab;
