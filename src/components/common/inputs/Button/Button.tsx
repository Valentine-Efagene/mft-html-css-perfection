import styles from "./Button.module.css";
import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "underline";
}

function Button(props: IButtonProps) {
  const { className, variant = "primary" } = props;

  const variantMap = {
    primary: styles.primary,
    outline: styles.outline,
    secondary: styles.secondary,
    underline: styles.underline,
  };

  return (
    <button
      {...props}
      className={`${styles.container} ${className} ${variantMap[variant]}`}
    ></button>
  );
}

export default Button;
