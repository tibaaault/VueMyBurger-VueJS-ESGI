export interface Burger {
  id: number
  name: string
  description: string
  price: number
  img?: string // Changé de 'image' à 'img' pour correspondre au JSON
  ingredients: string[]
  category: 'classic' | 'cheese' | 'premium' | 'vegetarian' | 'spicy' | 'gourmet'
}

// Type pour le panier
export interface CartItem extends Burger {
  quantity: number
}

// Type pour les filtres côté client
export interface BurgerFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
}
