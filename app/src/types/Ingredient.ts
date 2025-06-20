export interface Ingredient {
    id: string
    name: string
    color: string
    price: number
    category: 'bun' | 'meat' | 'vegetable' | 'sauce' | 'cheese'
}