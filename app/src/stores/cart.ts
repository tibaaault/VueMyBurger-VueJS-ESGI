import { defineStore } from 'pinia'
import type { Cart } from '@/types/Cart'
import type { Burger } from '@/types/Burger'

export const useCartStore = defineStore('cart', {
  state: (): Cart => ({
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  }),

  getters: {
    cartItems: (state) => state.items,
    cartTotalPrice: (state) => state.totalPrice,
    cartTotalQuantity: (state) => state.totalQuantity,
  },

  actions: {
    addItem(item: { burger: Burger; quantity: number }) {
      const existingItem = this.items.find((i) => i.burger.id === item.burger.id)

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }
      this.updateTotals()
    },

    removeItem(burgerId: number) {
      const existingItem = this.items.find((i) => i.burger.id === burgerId)

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Si quantité > 1, on décrémente
          existingItem.quantity -= 1
        } else {
          // Si quantité = 1, on supprime l'article
          this.items = this.items.filter((i) => i.burger.id !== burgerId)
        }
      }

      this.updateTotals()
    },

    removeItemCompletely(burgerId: number) {
      this.items = this.items.filter((i) => i.burger.id !== burgerId)
      this.updateTotals()
    },

    updateTotals() {
      this.totalPrice = this.items.reduce((sum, item) => sum + item.burger.price * item.quantity, 0)
      this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    countItems() {
      return this.items.reduce((count, item) => count + item.quantity, 0)
    },

    removeItems() {
      this.items = []
      this.updateTotals()
    },
  },
})
