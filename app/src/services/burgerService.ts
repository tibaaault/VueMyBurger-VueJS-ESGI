import type { Burger } from '@/types/Burger'

const API_BASE_URL = 'http://localhost:3000/api/burgers'

export function getAllBurgers() {
  return fetch(`${API_BASE_URL}/all`)
    .then(response => response.json())
    .then(data => data as Burger[])
}
