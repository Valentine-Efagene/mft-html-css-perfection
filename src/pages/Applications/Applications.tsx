import styles from "./Applications.module.css";
import ApplicationsTable from "../../components/tables/Applications/Applications";
import applications from "../../mock/applications";
import Button from "../../components/common/inputs/Button/Button";
import Paginator from "../../components/Paginator/Paginator";
import { useNavigate, useSearchParams } from "react-router-dom";
import FauxSelect from "../../components/common/inputs/FauxSelect/FauxSelect";
import { IOptionValue } from "../../types/inputs";
import { useState } from "react";

interface IApplicationsProps {
  className?: string;
  style?: object;
}

function Applications({ className, style }: IApplicationsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  let _page: number = Number(searchParams.get("page")) ?? 1;
  _page = _page > 0 ? _page : 1;

  const [approval, setApproval] = useState<IOptionValue>("승인여부 전체");
  const [dateTime, setDateTime] = useState<IOptionValue>("신청일시순");
  const [approvalStatus, setApprovalStatus] =
    useState<IOptionValue>("승인상태 변경");

  const handleApprovalChange = (value: IOptionValue) => {
    setApproval(value);
  };

  const handleApprovalStatusChange = (value: IOptionValue) => {
    setApprovalStatus(value);
  };

  const handleApprovalDateTimeChange = (value: IOptionValue) => {
    setDateTime(value);
  };

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={styles.toolbar}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>신청 목록</span>
          <span className={styles.info}>(총 100명 | 승인대기 1건)</span>
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
          <FauxSelect
            onChange={handleApprovalStatusChange}
            value={approvalStatus}
          >
            <option value="승인상태 변경"></option>
            <option value="승인완료"></option>
            <option value="승인거부"></option>
          </FauxSelect>
        </div>
      </div>
      <div className={styles.selectPanel}>
        <Button>등록</Button>
        <div className={styles.actions}>
          <span className={styles.status}>승인상태 변경</span>
          <FauxSelect
            onChange={handleApprovalStatusChange}
            value={approvalStatus}
          >
            <option value="승인상태 변경"></option>
            <option value="승인완료"></option>
            <option value="승인거부"></option>
          </FauxSelect>
          <Button>저장</Button>
        </div>
      </div>
      <ApplicationsTable data={undefined} />
      <Paginator limit={5} page={_page} url="/applications" total={50} />
    </div>
  );
}

export default Applications;
