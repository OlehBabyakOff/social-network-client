import {api} from "./index.js"

export const getAllUsers = async () => {
    return api.get("/users")
}

export const getLimitedUsers = async () => {
    return api.get("/limitedUsers")
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

export const followUserService = async (id) => {
    return api.post(`/user/${id}/follow`)
}