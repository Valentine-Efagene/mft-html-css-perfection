import styles from "./Applications.module.css";
import ApplicationsTable from "../../components/tables/Applications/Applications";
import {
  applications as _applications,
  //noneFound as _applications,
} from "../../mock/applications";
import Button from "../../components/common/inputs/Button/Button";
import Paginator from "../../components/Paginator/Paginator";
import { useSearchParams, Link } from "react-router-dom";
import FauxSelect from "../../components/common/inputs/FauxSelect/FauxSelect";
import { IOptionValue } from "../../types/inputs";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Confirmation from "../../components/modals/Confirmation/Confirmation";
import { IApplication } from "../../types/data";

import InvestmentTypeChange from "../../components/modals/InvestmentTypeChange/InvestmentTypeChange";
import EnterTheReasonForApprovalRefusal from "../../components/modals/EnterTheReasonForApprovalRefusal/EnterTheReasonForApprovalRefusal";

interface IApplicationsProps {
  className?: string;
  style?: object;
}

type modalName =
  | "noApplicant"
  | "changeApprovalStatus"
  | "alreadyApproved"
  | "alreadyDenied"
  | "saved"
  | "reasonForRejection";

const TOTAL = _applications.length;

function Applications({ className, style }: IApplicationsProps) {
  const [applications, setApplications] =
    useState<IApplication[]>(_applications);
  const [approval, setApproval] = useState<IOptionValue>("승인여부 전체");
  const [dateTime, setDateTime] = useState<IOptionValue>("신청일시순");
  const [approvalStatus, setApprovalStatus] = useState<IOptionValue>("");
  const [limit, setLimit] = useState<number>(50);

  const [activeModal, setActiveModal] = useState<modalName>("noApplicant");
  const [showModal, setShowModal] = useState(false);
  const [searchParams, _] = useSearchParams();
  const _checked = Array(_applications.length).fill(false);
  const _disabled = _applications.map(
    (application) => application.approval !== "승인대기"
  );
  const [disabled, setDisabled] = useState<boolean[]>(_disabled);
  const [checked, setChecked] = useState<boolean[]>(_checked);
  useState<IApplication | null>();

  let _page: number = Number(searchParams.get("page")) ?? 1;
  _page = _page > 0 ? _page : 1;

  const resetChecks = useCallback(() => {
    () => setChecked(Array(applications.length).fill(false));
  }, [applications]);

  const hideModal = () => setShowModal(false);

  function save() {
    setApplications((prevState) => {
      const _prev = [...prevState];

      const result = _prev.map((application, index) => {
        if (checked[index] === true) {
          application.approval = approvalStatus as string;
          return application;
        }

        return application;
      });

      return result;
    });

    resetChecks();
  }

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
        onConfirm={() => {
          if (approvalStatus === "승인거부" && countSelected() === 1) {
            setActiveModal("reasonForRejection");
            hideModal();
            displayModal();
          } else {
            save();
            hideModal();
          }
        }}
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
    reasonForRejection: (
      <EnterTheReasonForApprovalRefusal
        show={showModal}
        application={applications[checked.findIndex((check) => check)]}
        onCancel={hideModal}
        onConfirm={() => {
          save();
          hideModal();
        }}
      />
    ),
    investmentTypeChange: (
      <InvestmentTypeChange
        investmentType=""
        setInvestmentType={() => {
          console.log("first");
        }}
        show={showModal}
        application={applications[checked.findIndex((check) => check)]}
        onCancel={hideModal}
        onConfirm={() => {
          save();
          hideModal();
        }}
      />
    ),
  };

  const displayModal = () => setShowModal(true);

  const countSelected = () => checked.filter((check) => check === true).length;

  const checkSelected = (value: IOptionValue) => {
    if (value === "") return;

    if (countSelected() < 1) {
      setActiveModal("noApplicant");
      displayModal();
    }
  };

  const resetApplications = () => setApplications(_applications);

  /**
   * Filter
   * @param value
   */
  const handleApprovalChange = (value: IOptionValue) => {
    setApproval(value);

    if (value === "승인여부 전체") {
      resetApplications();
    } else {
      setApplications(
        _applications.filter((application) => application.approval === value)
      );
    }
  };

  /**
   * Edit
   * @param value
   */
  const handleApprovalStatusChange = (value: IOptionValue) => {
    checkSelected(value);
    setApprovalStatus(value);
  };

  /**
   * Sort
   * @param value
   */
  const handleApprovalDateTimeChange = (value: IOptionValue) => {
    setDateTime(value);
    setApplications((prevState) => {
      if (value === "신청일시순") {
        return prevState.sort(
          (a, b) =>
            new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime()
        );
      } else {
        return prevState.sort(
          (a, b) =>
            new Date(a.approvalDate).getTime() -
            new Date(b.approvalDate).getTime()
        );
      }
    });
  };

  useEffect(() => {
    resetChecks();
    setDisabled(
      applications.map((application) => application.approval !== "승인대기")
    );
  }, [applications, resetChecks]);

  const handleLimitChange = (value: IOptionValue) => {
    setLimit((prevState) => Number(value) ?? prevState);
  };

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {modalMap[activeModal]}
      <div className={styles.toolbar}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>신청 목록</span>
          <span className={styles.info}>
            (총 {_applications.length}명 | 승인대기{" "}
            {
              _applications.filter(
                (application) => application.approval === "승인대기"
              ).length
            }
            건)
          </span>
        </div>
        <div className={styles.controls}>
          <FauxSelect onChange={handleApprovalChange} value={approval}>
            <option value="승인여부 전체"></option>
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
            <option value={100}>승인상태 변경</option>
          </FauxSelect>
        </div>
      </div>
      <div className={styles.selectPanel}>
        <Button>등록</Button>
        <div className={styles.actions}>
          <span className={styles.status}>선택한 {countSelected()}건</span>
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
              setActiveModal("changeApprovalStatus");
              displayModal();
            }}
          >
            저장
          </Button>
        </div>
      </div>

      <ApplicationsTable
        limit={limit}
        page={_page}
        checked={checked}
        disabled={disabled}
        setChecked={setChecked}
        data={applications.slice((_page - 1) * limit, _page * limit)}
      />
      <Paginator
        limit={limit}
        page={_page}
        url="/investment-management"
        total={TOTAL}
      />

      <Link to="/modals" className={styles.linkToModals}>
        다른 모달
      </Link>
    </div>
  );
}

export default Applications;
