import { SWRConfiguration } from 'swr'

// Fetcher function для SWR
export const fetcher = async (url: string) => {
  const token = localStorage.getItem('access_token')
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

// Конфигурация SWR
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 30000, // 30 секунд
  dedupingInterval: 2000, // 2 секунды
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 секунд
  onError: (error) => {
    console.error('SWR Error:', error)
  }
}