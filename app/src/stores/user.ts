import { defineStore } from 'pinia'
import type { User } from '../types/User'

function getUserFromStorage(): User | null {
  const data = localStorage.getItem('user')
  return data ? JSON.parse(data) : null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUserFromStorage() as User | null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
