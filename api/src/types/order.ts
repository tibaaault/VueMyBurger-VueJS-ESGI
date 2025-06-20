import { OrderItem } from "./orderItem";

export interface Order {
  userId: number;
  address: string;
  totalPrice: number;
  items: OrderItem[];
}


