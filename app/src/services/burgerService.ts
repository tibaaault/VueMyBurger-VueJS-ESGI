import type { Burger } from '@/types/Burger'

const API_BASE_URL = 'http://localhost:3000/api/burgers'

// Fonction utilitaire pour gérer les erreurs HTTP
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`)
  }
  return response.json()
}

export async function getAllBurgers(): Promise<Burger[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/all`)
    return await handleResponse(response)
  } catch (error) {
    console.error('Erreur lors de la récupération des burgers:', error)
    throw new Error(
      error instanceof Error
        ? `Impossible de charger les burgers: ${error.message}`
        : 'Erreur inconnue lors du chargement des burgers',
    )
  }
}

export async function getBurgerById(id: number): Promise<Burger> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    return await handleResponse(response)
  } catch (error) {
    console.error(`Erreur lors de la récupération du burger ${id}:`, error)
    throw new Error(
      error instanceof Error ? `Burger introuvable: ${error.message}` : 'Burger introuvable',
    )
  }
}
