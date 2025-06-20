import type { OrderItem } from "./OrderItem"
import type { User } from "./User"

export interface Order {
  id: number
  userId: number
  address: string
  totalPrice: number
  createdAt: string
  items: OrderItem[]
  user?: User
}