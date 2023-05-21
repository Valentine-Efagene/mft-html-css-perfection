import styles from "./Checkbox.module.css";
import { InputHTMLAttributes, ReactElement } from "react";

// https://dev.to/giselamd/creating-a-react-input-component-in-typescript-hai

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  //children?: ReactHTMLElement<HTMLOptionElement>[];
  children?: ReactElement[];
}

function Checkbox({
  name,
  id,
  className,
  defaultValue,
  style,
  disabled,
  value,
  onChange,
}: ICheckboxProps) {
  return (
    <label className={`${styles.container} ${className}`} style={style}>
      <input
        hidden
        defaultValue={defaultValue}
        value={value}
        type="checkbox"
        name={name}
        id={id}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
}

export default Checkbox;
