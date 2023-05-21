import { IConfirmationModalProps, IModalProps } from "../../../types/modals";
import Button from "../../common/inputs/Button/Button";
import Modal from "../../common/modal/Modal/Modal";
import styles from "./Confirmation.module.css";

function Confirmation({
  show,
  onCancel,
  prompt,
  onConfirm,
  cancellationPrompt,
  confirmationPrompt,
}: IConfirmationModalProps) {
  return (
    <Modal
      className={styles.container}
      show={show}
      onCancel={onCancel}
      type="warning"
    >
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
