import styles from "./Applications.module.css";
import ApplicationsTable from "../../components/tables/Applications/Applications";
import applications from "../../mock/applications";
import Button from "../../components/common/inputs/Button/Button";
import Paginator from "../../components/Paginator/Paginator";
import { useSearchParams } from "react-router-dom";
import FauxSelect from "../../components/common/inputs/FauxSelect/FauxSelect";
import { IOptionValue } from "../../types/inputs";
import { ReactNode, useState } from "react";
import Confirmation from "../../components/modals/Confirmation/Confirmation";

interface IApplicationsProps {
  className?: string;
  style?: object;
}

type modalName =
  | "noApplicant"
  | "changeApprovalStatus"
  | "alreadyApproved"
  | "alreadyDenied"
  | "saved";

const TOTAL = 450;

function Applications({ className, style }: IApplicationsProps) {
  const [approval, setApproval] = useState<IOptionValue>("");
  const [dateTime, setDateTime] = useState<IOptionValue>("신청일시순");
  const [approvalStatus, setApprovalStatus] = useState<IOptionValue>("");
  const [limit, setLimit] = useState<number>(50);

  const [activeModal, setActiveModal] = useState<modalName>("noApplicant");
  const [showModal, setShowModal] = useState(false);
  const [searchParams, _] = useSearchParams();
  const [checked, setChecked] = useState(Array(limit).fill(false));

  let _page: number = Number(searchParams.get("page")) ?? 1;
  _page = _page > 0 ? _page : 1;

  const hideModal = () => setShowModal(false);

  const modalMap: { [modalName: string]: ReactNode } = {
    noApplicant: (
      <Confirmation
        className={styles.container}
        show={showModal}
        onCancel={hideModal}
        type="warning"
        prompt="선택된 신청건이 없습니다."
        confirmationPrompt="확인"
        onConfirm={hideModal}
      />
    ),
    changeApprovalStatus: (
      <Confirmation
        className={styles.container}
        show={showModal}
        onCancel={hideModal}
        onConfirm={hideModal}
        type="warning"
        confirmationPrompt="확인"
        cancellationPrompt="취소"
        prompt="선택된 2건의 승인상태를 변경하시겠습니까?"
      />
    ),
    alreadyApproved: (
      <Confirmation
        show={showModal}
        onCancel={hideModal}
        type="warning"
        prompt="이미 승인 완료된 회원입니다."
        confirmationPrompt="확인"
        onConfirm={hideModal}
      />
    ),
    alreadyDenied: (
      <Confirmation
        show={showModal}
        onCancel={hideModal}
        type="warning"
        prompt="이미 승인 거부된 회원입니다."
        confirmationPrompt="확인"
        onConfirm={hideModal}
      />
    ),
    saved: (
      <Confirmation
        show={showModal}
        onCancel={hideModal}
        type="ok"
        prompt="저장되었습니다."
        confirmationPrompt="확인"
        onConfirm={hideModal}
      />
    ),
  };

  const displayModal = () => setShowModal(true);

  const selected: number = checked.filter((check) => check === true).length;

  const checkSelected = () => {
    if (selected < 1) {
      setActiveModal("noApplicant");
      setShowModal(true);
    }
  };

  const handleApprovalChange = (value: IOptionValue) => {
    checkSelected();
    setApproval(value);
  };

  const handleApprovalStatusChange = (value: IOptionValue) => {
    checkSelected();
    setApprovalStatus(value);
  };

  const handleApprovalDateTimeChange = (value: IOptionValue) => {
    checkSelected();
    setDateTime(value);
  };

  const handleLimitChange = (value: IOptionValue) => {
    setLimit(Number(value) ?? 50);
  };

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {modalMap[activeModal]}
      <div className={styles.toolbar}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>신청 목록</span>
          <span className={styles.info}>(총 100명 | 승인대기 1건)</span>
        </div>
        <div className={styles.controls}>
          <FauxSelect onChange={handleApprovalChange} value={approval}>
            <option value="">승인여부 전체</option>
            <option value="승인대기"></option>
            <option value="승인완료"></option>
            <option value="승인거부"></option>
          </FauxSelect>
          <FauxSelect onChange={handleApprovalDateTimeChange} value={dateTime}>
            <option value="신청일시순"></option>
            <option value="승인일시순"></option>
          </FauxSelect>
          <FauxSelect onChange={handleLimitChange} value={limit}>
            <option value={50}>승인상태 변경</option>
            <option value={50}>승인상태 변경</option>
          </FauxSelect>
        </div>
      </div>
      <div className={styles.selectPanel}>
        <Button>등록</Button>
        <div className={styles.actions}>
          <span className={styles.status}>선택한 {selected}건</span>
          <FauxSelect
            onChange={handleApprovalStatusChange}
            value={approvalStatus}
          >
            <option value="">승인상태 변경</option>
            <option value="승인완료"></option>
            <option value="승인거부"></option>
          </FauxSelect>
          <Button
            onClick={() => {
              setActiveModal("noApplicant");
              setShowModal(true);
            }}
          >
            저장
          </Button>
        </div>
      </div>

      <ApplicationsTable
        checked={checked}
        setChecked={setChecked}
        data={Array(TOTAL)
          .fill(applications[0])
          .map((app, index) => ({ ...app, no: index + 1 }))
          .slice((_page - 1) * limit, _page * limit)}
      />
      <Paginator limit={limit} page={_page} url="/applications" total={TOTAL} />
    </div>
  );
}

export default Applications;
