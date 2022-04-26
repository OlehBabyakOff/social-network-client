import {makeAutoObservable} from "mobx"

import {loginService, logoutService, registrationService} from "../api/authService.js";
import axios from "axios";

export default class Store {
    user = null

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.user = user
    }

    async registration(data) {
        try {
            const res = await registrationService(data)
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async login(data) {
        try {
            const res = await loginService(data)
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    async logout() {
        try {
            const res = await logoutService()
            localStorage.removeItem('token')
            this.setUser(null)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth() {
        try {
            const res = await axios.get(`http://localhost:5000/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}