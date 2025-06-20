interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: any
  token?: string
}

const baseUrl = 'http://localhost:3000/api/auth'

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Une erreur est survenue lors de la connexion.')
  }

  return response.json()
}

export const register = async (userData: any): Promise<any> => {
  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Une erreur est survenue lors de l\'inscription.')
  }

  return response.json()
}