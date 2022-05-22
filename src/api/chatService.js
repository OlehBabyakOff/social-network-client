import {api} from "./index.js"

export const createConversationService = async (id, data) => {
    return api.post(`/user/${id}/messages/create`, data)
}

export const sendMessageService = async (id, data) => {
    return api.post(`/user/${id}/messages/send`, data)
}

export const getConversationService = async () => {
    return api.get(`/user/conversations/get`)
}

export const getMessagesService = async (id) => {
    return api.get(`/user/${id}/messages/get`)
}