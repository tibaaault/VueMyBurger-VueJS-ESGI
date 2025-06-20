export interface CreateOrderRequest {
  userId: number
  address: string
  items: {
    burgerId: number
    quantity: number
  }[]
}