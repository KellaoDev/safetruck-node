import { defineStore } from 'pinia'
import AuthService from '../services/AuthService.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async login(email, password) {
      const response = await AuthService.login(email, password)
      if (response.success) {
        this.user = response.data.user
        this.token = response.data.token
        this.isAuthenticated = true

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
      }
      return response
    },

    async create(userData) {
      const response = await AuthService.create(userData)
      if (response.success) {
        this.user = response.data.user
        this.token = response.data.token
        this.isAuthenticated = true
      }
      return response
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },

  persist: true
})