export interface Pagination {

    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    team?: boolean;

}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
