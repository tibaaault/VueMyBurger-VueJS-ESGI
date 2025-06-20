import type { Ingredient } from "./Ingredient"

export interface Burger {
  id: number
  name: string
  description: string
  price: number
  img?: string 
  ingredients: Ingredient[]
}

