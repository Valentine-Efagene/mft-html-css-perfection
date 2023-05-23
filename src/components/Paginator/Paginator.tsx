import { Link } from "react-router-dom";
import QueryParamsHelper from "../../helpers/QueryParamsHelper";
import styles from "./Paginator.module.css";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";

interface IPaginator {
  page: number;
  url: string;
  total: number;
  limit: number;
}

function Paginator({ page, url, total, limit }: IPaginator) {
  const generateNewPath = (newPage: number) => {
    return `${url}?${QueryParamsHelper.generateProfessionQueryParams({
      page: newPage,
    })}`;
  };

  const maxPage = Math.ceil(total / limit);

  return (
    <menu className={styles.container}>
      <li className={styles.first}>
        <Link className={`${styles.link}`} to={generateNewPath(1)}>
          <RxDoubleArrowLeft />
        </Link>
      </li>
      <li className={styles.second}>
        <Link
          className={`${styles.link}`}
          to={generateNewPath(page > 1 ? page - 1 : page)}
        >
          <RxChevronLeft />
        </Link>
      </li>
      {Array.from({ length: maxPage }, (_, i) => {
        const _page = i + 1;
        return (
          <li key={_page}>
            <Link
              className={`${page === _page ? styles.active : ""} ${
                styles.link
              }`}
              to={generateNewPath(_page)}
            >
              {_page}
            </Link>
          </li>
        );
      })}

      <li className={styles.pen}>
        <Link
          className={`${styles.link}`}
          to={generateNewPath(page < maxPage ? page + 1 : maxPage)}
        >
          <RxChevronRight />
        </Link>
      </li>
      <li className={styles.last}>
        <Link className={`${styles.link}`} to={generateNewPath(maxPage)}>
          <RxDoubleArrowRight />
        </Link>
      </li>
    </menu>
  );
}

export default Paginator;
