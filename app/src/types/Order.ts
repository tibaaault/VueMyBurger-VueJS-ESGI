export interface CreateOrderRequest {
  userId: number
  address: string
  items: {
    burgerId: number
    quantity: number
  }[]
}

export interface OrderItem {
  id: number
  burgerId: number
  quantity: number
  unitPrice: number
  burger: {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    ingredients: string
  }
}

export interface Order {
  id: number
  userId: number
  address: string
  totalPrice: number
  createdAt: string
  items: OrderItem[]
  user?: {
    id: number
    username: string
    email: string
  }
}
