import "./App.css";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Tab from "./components/common/Tab/Tab";

const tabs = [
  {
    to: "/dfs",
    title: "기본정보 관리",
  },
  {
    to: "/investment-management",
    title: "투자유형 관리",
  },
  {
    to: "/c",
    title: "입출금내역 조회",
  },
  {
    to: "/d",
    title: "영업내역 조회",
  },
  {
    to: "/e",
    title: "투자내역 조회",
  },
  {
    to: "/f",
    title: "채권내역 조회",
  },
  {
    to: "/g",
    title: "SMS 관리",
  },
  {
    to: "/h",
    title: "상담내역 관리",
  },
  {
    to: "/i",
    title: "1:1문의내역 조회",
  },
];

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.memberDetails}>회원상세</span>
        <span className={styles.required}>필수항목</span>
      </div>
      <Tab tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default App;
