import axios from "axios"

const API_URL = `http://localhost:5000/api`

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalReq = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry || error.response.status === 500 && error.config && !error.config._isRetry) {
        originalReq._isRetry = true
        try {
            const res = await axios.get(`http://localhost:5000/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', res.data.accessToken)
            return api.request(originalReq)
        } catch (e) {
        }
    }
    throw error
})