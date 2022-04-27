import {api} from "./index.js"

export const createPostService = async (data) => {
    return api.post("/post/create", data)
}

export const getAllPosts = async () => {
    return api.get("/post/get")
}

export const getMyPosts = async () => {
    return api.get("/post/getMy")
}

export const getUserPosts = async (id) => {
    return api.get(`/${id}/posts/get`)
}

export const getPost = async (id) => {
    return api.get(`/post/get/${id}`)
}

export const likePostService = async (id) => {
    return api.post(`/${id}/like`, id)
}

export const getPostLikeService = async (id) => {
    return api.get(`/${id}/like/get`)
}

export const createCommentService = async (id, content) => {
    return api.post(`/${id}/comment/create`, {content})
}

export const createChildCommentService = async (id, parentId, content) => {
    return api.post(`/${id}/comment/${parentId}/create`, {content})
}

export const getPostCommentsService = async (id) => {
    return api.get(`/${id}/comments/get/parent`)
}

export const getPostChildCommentsService = async (id, parentId) => {
    return api.get(`/${id}/comments/get/${parentId}/child`)
}

export const deletePostService = async (id) => {
    return api.delete(`/post/delete/${id}`)
}

export const deleteCommentService = async (id, commentId) => {
    return api.delete(`/${id}/comment/${commentId}/delete`)
}