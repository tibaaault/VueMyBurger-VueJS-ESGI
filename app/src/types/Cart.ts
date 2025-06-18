import type { Burger } from './Burger';

export interface Cart {
  items: {
    burger: Burger;
    quantity: number;
  }[];
  totalPrice: number;
  totalQuantity: number;
}