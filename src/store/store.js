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
            this.setLoading(true)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    async logout() {
        try {
            const res = await logoutService()
            localStorage.removeItem('token')
            this.setUser(null)
            this.setLoading(false)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth() {
        try {
            const res = await axios.get(`http://localhost:5000/api/refresh`, {withCredentials: true})
            localStorage.setItem('token', res.data.accessToken)
            this.setUser(res.data.user)
            this.setLoading(false)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    async getUsers() {
        try {
            const res = await getAllUsers()
            this.setUsers(res.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}