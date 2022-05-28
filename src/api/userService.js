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

export const reportUserService = async (id, violation) => {
    return api.post(`/user/${id}/report`, {violation})
}

export const getReportsService = async (id) => {
    return api.get(`/user/${id}/reports`)
}

export const addGalleryService = async (data) => {
    return api.post(`/user/gallery/add`, data)
}

export const getGallery = async (id) => {
    return api.get(`/user/${id}/gallery`)
}

export const deleteGalleryService = async (id) => {
    return api.delete(`/user/gallery/${id}/delete`)
}

export const updateInfoService = async (email, username, first_name, second_name, phone) => {
    return api.put(`/user/updateInfo`, {email, username, first_name, second_name, phone})
}