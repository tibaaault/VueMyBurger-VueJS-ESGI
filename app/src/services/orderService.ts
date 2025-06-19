import type { CartItem } from '@/types/Cart'
import type { CreateOrderRequest, Order } from '@/types/Order'
import { getAuthHeaders } from '@/utils/auth'

const BASE_URL = 'http://localhost:3000/api/orders'

export class OrderService {
  static async createOrder(orderData: CreateOrderRequest): Promise<{ message: string; order: Order }> {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
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

  static async getUserOrders(userId: number): Promise<Order[]> {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        headers: getAuthHeaders(),
      })

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

  static async getOrderById(orderId: number): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/${orderId}`, {
        headers: getAuthHeaders(),
      })

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
  static cartItemsToOrderItems(cartItems: CartItem[]): { burgerId: number; quantity: number }[] {
    return cartItems.map((item) => ({
      burgerId: item.burger.id,
      quantity: item.quantity,
    }))
  }
}
