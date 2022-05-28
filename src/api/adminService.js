import {api} from "./index.js"

export const allowBanService = async (reporterId, accusedId) => {
    return api.post(`/admin/${reporterId}/${accusedId}/ban`)
}

export const denyBanService = async (reporterId, accusedId) => {
    return api.post(`/admin/${reporterId}/${accusedId}/deny`)
}

export const banService = async (userId) => {
    return api.post(`/admin/${userId}/ban`)
}

export const unbanService = async (userId) => {
    return api.post(`/admin/${userId}/unban`)
}

export const setAdminService = async (userId) => {
    return api.post(`/admin/${userId}/setAdmin`)
}

export const unAdminService = async (userId) => {
    return api.post(`/admin/${userId}/unAdmin`)
}

export const getUsersService = async () => {
    return api.get("/admin/users")
}

export const getGroupsService = async () => {
    return api.get("/admin/groups")
}

export const getGroupPostsService = async () => {
    return api.get(`/admin/group/posts`)
}

export const getPostsService = async () => {
    return api.get("/admin/posts")
}

export const getReportsService = async () => {
    return api.get("/admin/reports")
}