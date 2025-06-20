import { OrderItem } from "./OrderItem";

export interface Order {
  userId: number;
  address: string;
  totalPrice: number;
  items: OrderItem[];
}


