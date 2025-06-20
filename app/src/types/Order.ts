import { OrderItem } from "./OrderItem"

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