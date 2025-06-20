import { ref } from 'vue'
import type { Burger } from '@/types/Burger'

const API_BASE_URL = 'http://localhost:3000/api/burgers'


export class BurgerService {

  static async getAllBurgers(): Promise<Burger[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`)

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const burgers: Burger[] = await response.json()
      return burgers
    } catch (error) {
      console.error('Erreur lors de la récupération des burgers:', error)
      throw error
    }
  }
}

// Hook Vue.js pour utiliser le service des burgers
export function useBurgers() {
  const burgers = ref<Burger[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Charger tous les burgers
  const loadBurgers = async () => {
    loading.value = true
    error.value = null

    try {
      burgers.value = await BurgerService.getAllBurgers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
      console.error('Erreur lors du chargement des burgers:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    burgers,
    loading,
    error,
    loadBurgers,
  }
}
