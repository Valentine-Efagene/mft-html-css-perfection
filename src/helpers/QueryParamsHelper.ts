import { createSearchParams } from 'react-router-dom';
import { IProfessionSearchParams } from '../../interface/Interface';

class QueryParamsHelper {
  public static stripInvalid(
    data: IProfessionSearchParams,
  ): Record<string, string> {
    const qParams: Record<string, string> = {};
    const { name, page, category, from, to } = data;

    if (name && name !== '') {
      qParams['name'] = name;
    }

    if (page) {
      qParams['page'] = `${page}`;
    }

    if (category && category !== '') {
      qParams['category'] = category;
    }

    if (from && from !== '') {
      qParams['from'] = from;
    }

    if (to && to !== '') {
      qParams['to'] = to;
    }

    return qParams;
  }

  public static generateProfessionQueryParams(
    data: IProfessionSearchParams,
  ): string {
    const stripped = this.stripInvalid(data);

    return createSearchParams(stripped).toString();
  }
}

export default QueryParamsHelper;
