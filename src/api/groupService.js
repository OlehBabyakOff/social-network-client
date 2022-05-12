import {api} from "./index.js"

export const createGroupService = async (data) => {
    return api.post("/group/create", data)
}

export const createGroupPostService = async (id, data) => {
    return api.post(`/group/${id}/posts/create`, data)
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

export const getLimitedGroupsService = async () => {
    return api.get("/limitedGroups")
}

export const getGroupPostsService = async (id) => {
    return api.get(`/group/${id}/posts/get`)
}

export const getGroupMembersService = async (id) => {
    return api.get(`/group/${id}/members`)
}

export const likeGroupPostService = async (id, postId) => {
    return api.post(`/group/${id}/${postId}/like`)
}

export const getGroupPostLikeService = async (id, postId) => {
    return api.get(`/group/${id}/post/${postId}/like/get`)
}

export const getGroupPostService = async (id, postId) => {
    return api.get(`/group/${id}/posts/${postId}`)
}

export const getGroupPostCommentsService = async (id, postId) => {
    return api.get(`/group/${id}/${postId}/comments/get`)
}
