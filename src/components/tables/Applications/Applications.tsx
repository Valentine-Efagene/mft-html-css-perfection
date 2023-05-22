import React, { Dispatch, SetStateAction, ChangeEventHandler } from "react";
import { IApplication } from "../../../types/data";
import styles from "./Applications.module.css";
import Checkbox from "../../common/inputs/Checkbox/Checkbox";

interface IApplicationsProps {
  data: IApplication[];
  checked: boolean[];
  setChecked: Dispatch<SetStateAction<boolean[]>>;
}

function Applications({ data, checked, setChecked }: IApplicationsProps) {
  const handleCheck = (index: number, check: boolean) => {
    setChecked((prevState) => {
      const _prev = [...prevState];
      _prev[index] = check;
      return _prev;
    });
  };

  const checkAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.checked;
    setChecked(Array(checked.length).fill(value));
  };

  return (
    <div className={styles.container}>
      <table className={`${styles.table}`}>
        <thead className={styles.thead}>
          <tr>
            <th>
              <Checkbox className={styles.checkbox} onChange={checkAll} />
            </th>
            <th>NO</th>
            <th>기존유형</th>
            <th>신청유형</th>
            <th>제출서류</th>
            <th>신청일시</th>
            <th>승인여부</th>
            <th>승인거부 사유</th>
            <th>승인일시</th>
          </tr>
        </thead>
        {Array.isArray(data) && data.length > 0 && (
          <tbody>
            {data?.map((datum, index) => {
              const {
                no,
                existingType,
                applicationType,
                //documentsToBeSubmitted,
                applicationDate,
                approval,
                reasonForRefusalOfApproval,
                approvalDate,
              } = datum;

              let approvalColor = "#ffedd5";
              let approvalBg = "#ffedd5";

              switch (approval) {
                case "승인대기":
                  approvalColor = "#9A3412";
                  approvalBg = "#FFEDD5";
                  break;

                case "승인거부":
                  approvalColor = "#991B1B";
                  approvalBg = "#FEE2E2";
                  break;

                case "승인완료":
                  approvalColor = "#166534";
                  approvalBg = "#DCFCE7";
                  break;

                default:
                  break;
              }

              return (
                <tr key={index}>
                  <td>
                    <Checkbox
                      disabled={approval !== "승인대기"}
                      className={styles.checkbox}
                      checked={checked[index]}
                      onChange={(e) =>
                        handleCheck(index, e.currentTarget.checked)
                      }
                    />
                  </td>
                  <td>{no}</td>
                  <td className={styles.existingType}>{existingType}</td>
                  <td className={styles.applicationType}>{applicationType}</td>
                  <td>
                    <button className={styles.fileBtn}>보기</button>
                  </td>
                  <td className={styles.date}>{applicationDate}</td>
                  <td>
                    <span
                      style={{
                        color: approvalColor,
                        backgroundColor: approvalBg,
                      }}
                      className={styles.approval}
                    >
                      {approval}
                    </span>
                  </td>
                  <td className={styles.reasonForRefusalOfApproval}>
                    {reasonForRefusalOfApproval}
                  </td>
                  <td className={styles.date}>{approvalDate}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {Array.isArray(data) && data?.length < 1 && (
        <div className={styles.empty}>조회 결과가 없습니다.</div>
      )}
    </div>
  );
}

export default Applications;
