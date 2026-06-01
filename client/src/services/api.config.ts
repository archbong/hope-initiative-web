// API Configuration
export const API_CONFIG = {
  USE_REAL_API: false,
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.hopeforthehopeless.org',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}

// Simulate delay for realistic testing (reduce to 50ms for faster development)
export const simulateDelay = (ms: number = 50): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...API_CONFIG.HEADERS, ...options?.headers },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}