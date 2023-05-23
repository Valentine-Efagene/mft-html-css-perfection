import { Dispatch, SetStateAction } from "react";
import { IApplication } from "../../../types/data";
import { IModalProps } from "../../../types/modals";
import Button from "../../common/inputs/Button/Button";
import Modal from "../../common/modal/Modal/Modal";
import CardRow from "../parts/CardRow/CardRow";
import styles from "./InvestmentTypeChange.module.css";
import { GrClose } from "react-icons/gr";
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
  return (
    <Modal className={styles.container} show={show} onCancel={onCancel}>
      <div className={styles.header}>
        <span>투자유형 변경</span>
        <button className={styles.closeBtn}>
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
        <CardRow required title="서류첨부">
          <Button variant="secondary">파일 선택</Button>
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
