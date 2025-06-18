export interface Burger {
  id: number
  name: string
  description: string
  price: number
  img?: string 
  ingredients: string[]
  // category: 'classic' | 'cheese' | 'premium' | 'vegetarian' | 'spicy' | 'gourmet'
}

// Type pour les filtres côté client
export interface BurgerFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
}
