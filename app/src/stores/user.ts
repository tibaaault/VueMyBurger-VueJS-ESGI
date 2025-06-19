import { defineStore } from 'pinia'
import type { User } from '../types/User'

function getUserFromStorage(): User | null {
  const data = localStorage.getItem('user')
  return data ? JSON.parse(data) : null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUserFromStorage() as User | null,
    token: localStorage.getItem('token') || null as string | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    clearUser() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})
