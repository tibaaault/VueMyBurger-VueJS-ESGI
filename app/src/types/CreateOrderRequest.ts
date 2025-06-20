export interface CreateOrderRequest {
  userId: number
  address: string
  items: {
    burgerId?: number
    burgerName: string
    burgerPrice: number
    quantity: number
  }[]
}
