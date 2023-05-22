import { IApplication } from "../../../types/data";
import { IModalProps } from "../../../types/modals";
import Modal from "../../common/modal/Modal/Modal";
import CardRow from "../parts/CardRow/CardRow";
import styles from "./InvestmentTypeChange.module.css";
import { GrClose } from "react-icons/gr";

interface IInvestmentTypeChangeProps extends IModalProps {
  application: IApplication;
}

function InvestmentTypeChange({ show, onCancel }: IInvestmentTypeChangeProps) {
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
          <div></div>
        </CardRow>
      </div>
    </Modal>
  );
}

export default InvestmentTypeChange;
