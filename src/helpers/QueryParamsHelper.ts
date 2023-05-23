import { createSearchParams } from "react-router-dom";

class QueryParamsHelper {
  public static generateQueryParams(data: { page: number }): string {
    return createSearchParams({
      ...data,
      page: data.page.toString(),
    }).toString();
  }
}

export default QueryParamsHelper;
