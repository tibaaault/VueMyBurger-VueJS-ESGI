import type { CartItem } from '@/types/Cart'

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

class OrderService {
  private baseUrl = 'http://localhost:3000/api/orders'

  async createOrder(orderData: CreateOrderRequest): Promise<{ message: string; order: Order }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création de la commande')
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error)
      throw error
    }
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    try {
      const response = await fetch(`${this.baseUrl}/user/${userId}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la récupération des commandes')
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error)
      throw error
    }
  }

  async getOrderById(orderId: number): Promise<Order> {
    try {
      const response = await fetch(`${this.baseUrl}/${orderId}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la récupération de la commande')
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error)
      throw error
    }
  }

  // Méthode utilitaire pour convertir les items du panier en format pour la commande
  cartItemsToOrderItems(cartItems: CartItem[]): { burgerId: number; quantity: number }[] {
    return cartItems.map((item) => ({
      burgerId: item.burger.id,
      quantity: item.quantity,
    }))
  }
}

export const orderService = new OrderService()
