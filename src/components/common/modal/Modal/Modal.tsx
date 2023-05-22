import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { IModalProps } from "../../../../types/modals";

function Modal({ show, children, className, style, onCancel }: IModalProps) {
  return (
    <Backdrop show={show} onClick={onCancel}>
      <dialog open className={`${styles.container} ${className}`} style={style}>
        {children}
      </dialog>
    </Backdrop>
  );
}

export default Modal;
