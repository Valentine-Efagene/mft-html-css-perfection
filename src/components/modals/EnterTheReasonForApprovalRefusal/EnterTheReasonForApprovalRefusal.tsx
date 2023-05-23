import { IApplication } from "../../../types/data";
import { IModalProps } from "../../../types/modals";
import Button from "../../common/inputs/Button/Button";
import Checkbox from "../../common/inputs/Checkbox/Checkbox";
import TextArea from "../../common/inputs/TextArea/TextArea";
import Modal from "../../common/modal/Modal/Modal";
import CardRow from "../parts/CardRow/CardRow";
import styles from "./EnterTheReasonForApprovalRefusal.module.css";
import { GrClose } from "react-icons/gr";

interface IEnterTheReasonForApprovalRefusalProps extends IModalProps {
  application: IApplication;
  onConfirm: () => void;
}

function EnterTheReasonForApprovalRefusal({
  show,
  onCancel,
  onConfirm,
}: IEnterTheReasonForApprovalRefusalProps) {
  return (
    <Modal className={styles.container} show={show} onCancel={onCancel}>
      <div className={styles.header}>
        <span>투자유형 변경</span>
        <button className={styles.closeBtn}>
          <GrClose />
        </button>
      </div>
      <div className={styles.content}>
        <CardRow title="회원번호">abc111, abc222</CardRow>
        <CardRow title="회원명/법인명">김길동, ㈜가나다라투자</CardRow>
        <CardRow title="승인거부 사유" required>
          <div className={styles.options}>
            <label>
              <Checkbox />
              <span> 서류 식별 불가</span>
            </label>
            <label>
              <Checkbox />
              <span>서류의 내용이 등록된 회원정보와 다름</span>
            </label>
            <label>
              <Checkbox />
              <span>
                서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인,
                본인서명 등)
              </span>
            </label>
            <label>
              <Checkbox />
              <span>서류의 유효기간이 초과됨</span>
            </label>
            <label>
              <Checkbox />
              <span>직접 입력</span>
            </label>
            <TextArea
              name=""
              id=""
              rows={5}
              className={styles.textArea}
              placeholder="사유 입력"
            ></TextArea>
          </div>
        </CardRow>
      </div>
      <div className={styles.footer}>
        <Button onClick={onConfirm}>저장</Button>
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </Modal>
  );
}

export default EnterTheReasonForApprovalRefusal;
