import styles from "./Applications.module.css";
import ApplicationsTable from "../../components/tables/Applications/Applications";
import applications from "../../mock/applications";
import Button from "../../components/common/inputs/Button/Button";
import Paginator from "../../components/Paginator/Paginator";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IApplicationsProps {
  className?: string;
  style?: object;
}

function Applications({ className, style }: IApplicationsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  let _page: number = Number(searchParams.get("page")) ?? 1;
  _page = _page > 0 ? _page : 1;

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <Button>등록</Button>
      <ApplicationsTable data={applications} />
      <Paginator limit={5} page={_page} url="/applications" total={50} />
    </div>
  );
}

export default Applications;
