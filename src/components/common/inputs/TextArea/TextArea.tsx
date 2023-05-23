import { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className } = props;

  return <textarea {...props} className={`${styles.container} ${className}`} />;
}

export default TextArea;
