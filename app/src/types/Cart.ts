import type { Burger } from './Burger'

export interface CartItem {
  burger: Burger
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
  totalQuantity: number
}
