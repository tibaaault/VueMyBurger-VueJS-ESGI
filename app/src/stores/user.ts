import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '',
  }),
  actions: {
    setUsername(name: string) {
      this.userName = name
    },
    clearUsername() {
      this.userName = ''
    }
  }
})
