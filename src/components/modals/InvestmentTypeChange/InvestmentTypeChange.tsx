import { Dispatch, SetStateAction, useState } from "react";
import { IApplication } from "../../../types/data";
import { IModalProps } from "../../../types/modals";
import Button from "../../common/inputs/Button/Button";
import Modal from "../../common/modal/Modal/Modal";
import CardRow from "../parts/CardRow/CardRow";
import styles from "./InvestmentTypeChange.module.css";
import { GrClose } from "react-icons/gr";
import { FaTimesCircle } from "react-icons/fa";
import FauxSelect from "../../common/inputs/FauxSelect/FauxSelect";
import { IOptionValue } from "../../../types/inputs";

interface IInvestmentTypeChangeProps extends IModalProps {
  application: IApplication;
  onConfirm: () => void;
  investmentType: string;
  setInvestmentType: Dispatch<SetStateAction<string>>;
}

function InvestmentTypeChange({
  show,
  onCancel,
  onConfirm,
  investmentType,
  setInvestmentType,
}: IInvestmentTypeChangeProps) {
  const [proofs, setProofs] = useState<File[]>([]);

  return (
    <Modal className={styles.container} show={show} onCancel={onCancel}>
      <div className={styles.header}>
        <span>투자유형 변경</span>
        <button onClick={onCancel} className={styles.closeBtn}>
          <GrClose className={styles.icon} />
        </button>
      </div>
      <div className={styles.content}>
        <CardRow title="회원번호">abc111</CardRow>
        <CardRow title="회원명/법인명">김길동</CardRow>
        <CardRow required title="투자유형">
          <FauxSelect
            value={investmentType}
            onChange={(value: IOptionValue) =>
              setInvestmentType(value as string)
            }
          >
            <option value="일반개인"></option>
            <option value="소득적격"></option>
            <option value="개인전문"></option>
            <option value="법인"></option>
            <option value="여신금융"></option>
            <option value="P2P온투"></option>
          </FauxSelect>
        </CardRow>
        <CardRow rightClassName={styles.right} required title="서류첨부">
          <div className={styles.fileSection}>
            <label htmlFor="proof" className={styles.proof}>
              파일 선택
              <input
                onChange={(e) => {
                  const value = e.target?.files?.[0];
                  setProofs((prevState) =>
                    value ? [...prevState, value] : prevState
                  );
                }}
                accept="image/png, image/jpeg"
                id="proof"
                type="file"
                hidden
              />
            </label>
            <ul className={styles.proofs}>
              {proofs.map((proof) => (
                <li className={styles.proofItem} key={proof.name}>
                  <span className={styles.name}>{proof.name}</span>
                  <button
                    onClick={() => {
                      setProofs((prevState) =>
                        prevState.filter((_proof) => _proof.name !== proof.name)
                      );
                    }}
                    className={styles.remove}
                  >
                    <FaTimesCircle fill="#ebeef3" className={styles.icon} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CardRow>
      </div>
      <ul>
        <li>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</li>
        <li>최대 10개, 100MB까지 등록이 가능합니다.</li>
      </ul>
      <div className={styles.footer}>
        <Button onClick={onConfirm}>저장</Button>
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </Modal>
  );
}

export default InvestmentTypeChange;
