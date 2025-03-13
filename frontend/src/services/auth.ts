const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY 

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    const tokenSanitized = token.split(' ')
    return tokenSanitized[1]
  }

  return null
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const deleteToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}