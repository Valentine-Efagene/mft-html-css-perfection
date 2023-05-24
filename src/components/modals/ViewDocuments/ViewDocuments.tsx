import { IModalProps } from "../../../types/modals";
import Button from "../../common/inputs/Button/Button";
import Modal from "../../common/modal/Modal/Modal";
import CardRow from "../parts/CardRow/CardRow";
import styles from "./ViewDocuments.module.css";
import { GrClose } from "react-icons/gr";

interface IViewDocumentsProps extends IModalProps {
  onConfirm: () => void;
  documents: string[];
}

function ViewDocuments({
  show,
  documents = [],
  onCancel,
  onConfirm,
}: IViewDocumentsProps) {
  return (
    <Modal className={styles.container} show={show} onCancel={onCancel}>
      <div className={styles.header}>
        <span>투자유형 변경</span>
        <button onClick={onCancel} className={styles.closeBtn}>
          <GrClose className={styles.icon} />
        </button>
      </div>
      <div className={styles.content}>
        <CardRow
          className={styles.card}
          required
          title="서류"
          rightClassName={styles.right}
          leftClassName={styles.left}
        >
          <ul className={styles.images}>
            {documents.map((document) => (
              <li>
                <img src={document} />
              </li>
            ))}
          </ul>
        </CardRow>
      </div>
      <div className={styles.footer}>
        <Button onClick={onConfirm}>파일 다운로드</Button>
        <Button variant="outline" onClick={onCancel}>
          확인
        </Button>
      </div>
    </Modal>
  );
}

export default ViewDocuments;
