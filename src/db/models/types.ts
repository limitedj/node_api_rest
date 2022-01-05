interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllUsuariosFilters extends ListFilters {}
export interface GetAllMenusFilters extends ListFilters {}
export interface GetAllRolesFilters extends ListFilters {
    isPublished?: boolean
    isNotPublished?: boolean
}