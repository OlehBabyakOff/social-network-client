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

export const createGroupCommentService = async (id, postId, data) => {
    return api.post(`/group/${id}/${postId}/comment/create`, data)
}

export const createGroupChildCommentService = async (id, postId, parentId, data) => {
    return api.post(`/group/${id}/${postId}/comment/${parentId}/create`, data)
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
    return api.get(`/group/${id}/post/${postId}/comments/parent`)
}

export const getGroupChildCommentsService = async (id, postId, commentId) => {
    return api.get(`/group/${id}/post/${postId}/comments/${commentId}/child`)
}

export const updateGroupInfoService = async (id, title) => {
    return api.put(`/group/${id}/updateInfo`, {title})
}

export const updateGroupAvatarService = async (id, avatar) => {
    return api.put(`/group/${id}/updateAvatar`, avatar)
}

export const updateGroupBgService = async (id, bg) => {
    return api.put(`/group/${id}/updateBackground`, bg)
}

export const deleteGroupService = async (id) => {
    return api.delete(`/group/${id}/delete`)
}

export const deleteGroupPostService = async (groupId, postId) => {
    return api.delete(`/group/${groupId}/delete/${postId}`)
}

export const deleteGroupCommentService = async (groupId, postId, commentId) => {
    return api.delete(`/group/${groupId}/${postId}/comment/${commentId}/delete`)
}

export const kickUserService = async (groupId, userId) => {
    return api.delete(`/group/${groupId}/${userId}/kick`)
}