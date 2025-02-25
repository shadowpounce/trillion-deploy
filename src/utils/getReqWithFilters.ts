export const getReqWithFilters = (url: string, filter?: string) => {
    return `${url}${filter ? filter : ""}`
}
