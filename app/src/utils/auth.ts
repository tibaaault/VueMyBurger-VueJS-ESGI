import { useUserStore } from '@/stores/user'

export function getAuthHeaders(): Record<string, string> {
  const userStore = useUserStore()
  const token = userStore.token
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}
