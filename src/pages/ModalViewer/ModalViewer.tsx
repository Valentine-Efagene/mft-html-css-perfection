import { useState, ReactNode } from "react";
import styles from "./ModalViewer.module.css";
import InvestmentTypeChange from "../../components/modals/InvestmentTypeChange/InvestmentTypeChange";
import { applications } from "../../mock/applications";
import Button from "../../components/common/inputs/Button/Button";
import EnterTheReasonForApprovalRefusal from "../../components/modals/EnterTheReasonForApprovalRefusal/EnterTheReasonForApprovalRefusal";
import ViewDocuments from "../../components/modals/ViewDocuments/ViewDocuments";
import documents from "../../mock/documents";

type IModalName = "investment" | "reasonForRejection" | "documents";

function ModalViewer() {
  const [activeModal, setActiveModal] = useState<IModalName>("investment");
  const [investmentType, setInvestmentType] = useState<string>("일반개인");

  const japMap: { [name: string]: string } = {
    investment: "투자유형 변경",
    reasonForRejection: "승인거부 사유 입력",
    documents: "서류 보기",
  };

  const [showModal, setShowModal] = useState(false);

  const hideModal = () => setShowModal(false);

  const displayModal = () => setShowModal(true);

  const modalMap: { [modalName: string]: ReactNode } = {
    investment: (
      <InvestmentTypeChange
        investmentType={investmentType}
        setInvestmentType={(value) => setInvestmentType(value)}
        show={showModal}
        application={applications[0]}
        onCancel={hideModal}
        onConfirm={hideModal}
      />
    ),
    reasonForRejection: (
      <EnterTheReasonForApprovalRefusal
        show={showModal}
        application={applications[0]}
        onCancel={hideModal}
        onConfirm={hideModal}
      />
    ),
    documents: (
      <ViewDocuments
        documents={documents}
        show={showModal}
        onCancel={hideModal}
        onConfirm={hideModal}
      />
    ),
  };

  return (
    <div className={styles.container}>
      <menu>
        {Object.keys(modalMap).map((modalName) => (
          <li>
            <Button
              onClick={() => {
                setActiveModal(modalName as IModalName);
                displayModal();
              }}
            >
              {japMap[modalName]}
            </Button>
          </li>
        ))}
      </menu>
      {modalMap[activeModal]}
    </div>
  );
}

export default ModalViewer;
