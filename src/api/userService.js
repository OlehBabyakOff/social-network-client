import {api} from "./index.js"

export const getAllUsers = async () => {
    return api.get("/users")
}

export const getUser = async (id) => {
    return api.get(`/user/${id}`)
}

export const getFollowersService = async (id) => {
    return api.get(`/user/${id}/followers`)
}

export const getFollowingsService = async (id) => {
    return api.get(`/user/${id}/followings`)
}