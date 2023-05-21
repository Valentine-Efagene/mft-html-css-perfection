import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import warning from "../../../../assets/icons/warning.svg";
import ok from "../../../../assets/icons/ok.svg";
import { IModalProps } from "../../../../types/modals";
import { GrClose } from "react-icons/gr";

function Modal({
  show,
  children,
  className,
  style,
  onCancel,
  type = "ok",
}: IModalProps) {
  let icon = ok;

  switch (type) {
    case "ok":
      icon = ok;
      break;

    case "warning":
      icon = warning;
      break;

    case "error":
      break;

    default:
      break;
  }

  return (
    <Backdrop show={show} onClick={onCancel}>
      <dialog open className={`${styles.container} ${className}`} style={style}>
        <div className={styles.header}>
          <img src={icon} alt="" />
          <button onClick={onCancel} className={styles.closeBtn}>
            <GrClose />
          </button>
        </div>
        {children}
      </dialog>
    </Backdrop>
  );
}

export default Modal;
