import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: localStorage.getItem('userName') || '',
  }),
  actions: {
    setUsername(name: string) {
      this.userName = name
      localStorage.setItem('userName', name)
    },
    clearUsername() {
      this.userName = ''
      localStorage.removeItem('userName')
    }
  }
})
