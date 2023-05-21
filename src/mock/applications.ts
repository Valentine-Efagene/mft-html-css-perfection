import { IApplication } from "../types/data";

const applications: IApplication[] = [
  {
    no: 1,
    existingType: "소득적격",
    applicationType: "개인전문",
    documentsToBeSubmitted: "",
    applicationDate: "2023-01-10 09:00:00",
    approval: "승인대기",
    reasonForRefusalOfApproval: null,
    approvalDate: "2023-01-10 09:00:00",
  },
  {
    no: 2,
    existingType: "소득적격",
    applicationType: "개인전문",
    documentsToBeSubmitted: "",
    applicationDate: "2023-01-10 09:00:00",
    approval: "승인거부",
    reasonForRefusalOfApproval:
      "서류 식별 불가 금융투자업자에 계좌를 개설한지 1년 미만으로 전문투자자 승인 불가",
    approvalDate: "2023-01-10 09:00:00",
  },
  {
    no: 3,
    existingType: "소득적격",
    applicationType: "소득적격",
    documentsToBeSubmitted: "",
    applicationDate: "2023-01-10 09:00:00",
    approval: "승인완료",
    reasonForRefusalOfApproval: null,
    approvalDate: "2023-01-10 09:00:00",
  },
];

export default applications;
