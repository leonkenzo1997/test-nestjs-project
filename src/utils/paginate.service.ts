import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginateService {
  constructor() {
    // empty
  }

  public create(
    data: any[] = [],
    total: number = 0,
    currentPage: number = 0,
    limit: number = 10,
  ) {
    const totalPages = Math.ceil(total / limit);
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;
    return {
      results: data,
      metaData: {
        currentPage,
        firstPage: total ? 1 : 0,
        lastPage: totalPages,
        nextPage: nextPage > currentPage ? currentPage : nextPage,
        pageSize: limit,
        previousPage: previousPage < 1 ? currentPage : previousPage,
        totalRecords: total,
        totalPages: totalPages,
      },
    };
  }
}
