import {makeAutoObservable} from "mobx"

import {loginService, logoutService, registrationService} from "../api/authService.js";
import {getAllUsers} from "../api/userService";
import axios from "axios";

export default class Store {
    user = null
    users = null
    loading = true
    errors = []

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.user = user
    }

    setUsers(users) {
        this.users = users
    }

    setLoading(loading) {
        this.loading = loading
    }

    setErrors(error) {
        this.errors.push(error)
    }

    clearErrors() {
        this.errors = []
    }

    async registration(data) {
        try {
            const res = await registrationService(data)
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user.user)
        } catch (e) {
        }
    }

    async login(data) {
        try {
            const res = await loginService(data)
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user.user)
        } catch (e) {
        }
    }
    async logout() {
        try {
            const res = await logoutService()
            localStorage.removeItem('token')
            this.setUser(null)
            this.setLoading(false)
        } catch (e) {
        }
    }
    async checkAuth() {
        try {
            this.setLoading(true)
            const res = await axios.get(`http://localhost:5000/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user)
            this.setLoading(false)
        } catch (e) {
        }
    }
    async getUsers() {
        try {
            const res = await getAllUsers()
            this.setUsers(res.data)
        } catch (e) {
        }
    }
}