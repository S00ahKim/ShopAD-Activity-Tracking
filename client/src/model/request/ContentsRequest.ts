export interface ContentsRequest {
    page: number,
    pageSize: number,
    sortField: string,
    sortType: string,
    filter: CategoryFilter,
    expsTrtrCd: string
}

export interface CategoryFilter {
    catIdLv1?: string
}