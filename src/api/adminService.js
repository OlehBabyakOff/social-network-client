import {api} from "./index.js"

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