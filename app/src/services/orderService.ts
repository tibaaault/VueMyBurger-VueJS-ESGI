import type { CartItem } from '@/types/CartItem'
import type { Order } from '@/types/Order'
import type { CreateOrderRequest } from '@/types/CreateOrderRequest'

const API_BASE_URL = 'http://localhost:3000/api/orders'

class OrderService {
  async createOrder(orderData: CreateOrderRequest): Promise<{ message: string; order: Order }> {
    try {
      const response = await fetch(API_BASE_URL, {
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
      const response = await fetch(`${API_BASE_URL}/user/${userId}`)

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

  cartItemsToOrderItems(
    cartItems: CartItem[],
  ): { burgerId?: number; burgerName: string; burgerPrice: number; quantity: number }[] {
    return cartItems.map((item) => {
      // voir si c'est un burger créé manuellement
      const isManualBurger = item.burger.id > 100000 

      return {
        burgerId: isManualBurger ? undefined : item.burger.id,
        burgerName: item.burger.name,
        burgerPrice: item.burger.price,
        quantity: item.quantity,
      }
    })
  }
}

export const orderService = new OrderService()
