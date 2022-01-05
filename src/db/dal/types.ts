interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllUsuariosFilters extends ListFilters {}
export interface GetAllMenusFilters extends ListFilters {}
export interface GetAllRolsFilters extends ListFilters {
    isPublished?: boolean
    isNotPublished?: boolean
}