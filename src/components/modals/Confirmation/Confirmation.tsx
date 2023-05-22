import { IConfirmationModalProps } from "../../../types/modals";
import Button from "../../common/inputs/Button/Button";
import Modal from "../../common/modal/Modal/Modal";
import warning from "../../../assets/icons/warning.svg";
import ok from "../../../assets/icons/ok.svg";
import styles from "./Confirmation.module.css";
import { GrClose } from "react-icons/gr";

function Confirmation({
  show,
  onCancel,
  prompt,
  onConfirm,
  type = "ok",
  cancellationPrompt,
  confirmationPrompt,
}: IConfirmationModalProps) {
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
    <Modal className={styles.container} show={show} onCancel={onCancel}>
      <div className={styles.header}>
        <img src={icon} alt="" />
        <button onClick={onCancel} className={styles.closeBtn}>
          <GrClose />
        </button>
      </div>
      <div className={styles.content}>
        <span className={styles.message}>{prompt}</span>
        <div className={styles.buttons}>
          {confirmationPrompt && (
            <Button onClick={onConfirm}>{confirmationPrompt}</Button>
          )}
          {cancellationPrompt && (
            <Button variant="outline">{cancellationPrompt}</Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Confirmation;
