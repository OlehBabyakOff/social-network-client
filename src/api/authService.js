import {api} from "./index.js"

export const registrationService = async (data) => {
    return api.post("/registration", data)
}

export const loginService = async (data) => {
    return api.post("/login", data)
}

export const logoutService = async () => {
    return api.post("/logout")
}