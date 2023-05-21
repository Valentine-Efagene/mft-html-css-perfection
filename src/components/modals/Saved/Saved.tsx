import { IModalProps } from "../../../types/modals";
import Confirmation from "../Confirmation/Confirmation";

function Saved({ show, onCancel }: IModalProps) {
  return (
    <Confirmation
      show={show}
      onCancel={onCancel}
      type="ok"
      prompt="저장되었습니다."
      confirmationPrompt="확인"
      onConfirm={onCancel}
    />
  );
}

export default Saved;
