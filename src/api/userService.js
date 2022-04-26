import {api} from "./index.js"

export const getAllUsers = async () => {
    return api.get("/users")
}

export const getUser = async (id) => {
    return api.get(`/user/${id}`)
}