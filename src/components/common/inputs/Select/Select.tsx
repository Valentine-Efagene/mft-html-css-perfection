import styles from "./Select.module.css";
import { FaChevronDown } from "react-icons/fa";
import { InputHTMLAttributes, ReactElement } from "react";

// https://dev.to/giselamd/creating-a-react-input-component-in-typescript-hai

interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  //children?: ReactHTMLElement<HTMLOptionElement>[];
  children?: ReactElement[];
}

function Select({
  children,
  name,
  id,
  className,
  defaultValue,
  style,
  value,
}: ISelectProps) {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <select value={value} name={name} id={id} defaultValue={defaultValue}>
        {children}
      </select>
      <span className={styles.customArrow}>
        <FaChevronDown className={styles.icon} />
      </span>
    </div>
  );
}

export default Select;
