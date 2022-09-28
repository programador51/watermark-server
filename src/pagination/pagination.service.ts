import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/pagination.interface';

@Injectable()
export class PaginationService {
  /**
   * Get the information in order to request a certain pagination
   * @param page - Number of page requested
   * @param perPage - Registers to display per page
   * @returns {Pagination} Information in order to request the pagination data
   */
  get(page = 1, perPage = 5): Pagination {
    return {
      skip: (page - 1) * perPage,
      limit: perPage,
    };
  }
}
