import {api} from "./index.js"

export const createGroupService = async (data) => {
    return api.post("/group/create", data)
}

export const subscribeGroupService = async (id) => {
    return api.post(`/group/${id}/follow`)
}

export const getGroupService = async (id) => {
    return api.get(`/group/${id}`)
}

export const getMyGroupsService = async () => {
    return api.get("/myGroups")
}

export const getAllGroupsService = async () => {
    return api.get("/groups")
}

export const getGroupPostsService = async (id) => {
    return api.get(`/group/${id}/posts/get`)
}

export const getGroupMembersService = async (id) => {
    return api.get(`/group/${id}/members`)
}
