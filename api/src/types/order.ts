export interface OrderItem {
  burgerId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  userId: number;
  address: string;
  totalPrice: number;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  userId: number;
  address: string;
  items: {
    burgerId: number;
    quantity: number;
  }[];
}
