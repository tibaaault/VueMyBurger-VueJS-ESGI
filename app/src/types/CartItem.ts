import type { Burger } from './Burger';

export interface CartItem {
  burger: Burger
  quantity: number
}