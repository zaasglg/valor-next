import useSWR from 'swr'
import { fetcher } from '@/lib/swr-config'

// Хук для получения баланса пользователя
export function useBalance() {
  const { data, error, isLoading, mutate } = useSWR('/api/balance', fetcher, {
    refreshInterval: 5000, // Обновляем баланс каждые 5 секунд
    revalidateOnFocus: true
  })

  return {
    balance: data?.balance || 0,
    isLoading,
    isError: error,
    refresh: mutate
  }
}

// Хук для получения профиля пользователя
export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR('/api/profile', fetcher)

  return {
    profile: data,
    isLoading,
    isError: error,
    refresh: mutate
  }
}

// Хук для получения истории транзакций
export function useTransactions(page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/transactions?page=${page}&limit=${limit}`,
    fetcher
  )

  return {
    transactions: data?.transactions || [],
    totalPages: data?.totalPages || 0,
    isLoading,
    isError: error,
    refresh: mutate
  }
}

// Хук для получения игр
export function useGames(category?: string) {
  const url = category ? `/api/games?category=${category}` : '/api/games'
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0 // Игры не меняются часто
  })

  return {
    games: data?.games || [],
    isLoading,
    isError: error
  }
}