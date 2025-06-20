import { Burger } from './Burger';

export interface OrderItem {
  id: number
  quantity: number
  unitPrice: number
  burger: Burger
}