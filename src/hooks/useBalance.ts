"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'

interface BalanceData {
  deposit: number
  country: string
  currency: string
  lastUpdated: number
}

export function useBalance() {
  const { user, isAuthenticated } = useAuth()
  const [balance, setBalance] = useState<BalanceData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = useCallback(async () => {
    if (!isAuthenticated || !user?.user_id) return

    setLoading(true)
    setError(null)

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
      const response = await fetch('/api/balance', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch balance')
      }

      const data = await response.json()
      const balanceData: BalanceData = {
        deposit: parseFloat(data.balance || '0'),
        country: 'US', // Можно добавить получение страны из API
        currency: data.currency || 'USD',
        lastUpdated: data.lastUpdated || Date.now()
      }

      setBalance(balanceData)
      
      // Сохраняем в кэш
      if (typeof window !== 'undefined') {
        localStorage.setItem('cached_balance', JSON.stringify(balanceData))
        localStorage.setItem('balance_cache_timestamp', Date.now().toString())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching balance:', err)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user?.user_id])

  // Загружаем баланс только при первом входе
  useEffect(() => {
    if (!isAuthenticated || typeof window === 'undefined') return

    // Проверяем, есть ли кэшированный баланс и не устарел ли он
    const cachedBalance = localStorage.getItem('cached_balance')
    const cacheTimestamp = localStorage.getItem('balance_cache_timestamp')
    const now = Date.now()
    const CACHE_DURATION = 5 * 60 * 1000 // 5 минут

    if (cachedBalance && cacheTimestamp && (now - parseInt(cacheTimestamp)) < CACHE_DURATION) {
      try {
        const parsedBalance = JSON.parse(cachedBalance)
        setBalance(parsedBalance)
        return // Не делаем запрос, если кэш актуален
      } catch (error) {
        console.error('Error parsing cached balance:', error)
      }
    }

    fetchBalance()
  }, [isAuthenticated, fetchBalance])

  // Обновление баланса при изменении localStorage (между вкладками)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'balance_updated') {
        fetchBalance()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [fetchBalance])

  // Функция для принудительного обновления баланса
  const refreshBalance = useCallback(() => {
    fetchBalance()
  }, [fetchBalance])

  // Функция для обновления баланса после транзакции
  const updateBalanceAfterTransaction = useCallback((newBalance: number) => {
    if (balance) {
      const updatedBalance = {
        ...balance,
        deposit: newBalance,
        lastUpdated: Date.now()
      }
      
      setBalance(updatedBalance)
      
      // Обновляем кэш
      if (typeof window !== 'undefined') {
        localStorage.setItem('cached_balance', JSON.stringify(updatedBalance))
        localStorage.setItem('balance_cache_timestamp', Date.now().toString())
        
        // Уведомляем другие вкладки
        localStorage.setItem('balance_updated', Date.now().toString())
      }
    }
  }, [balance])

  return {
    balance,
    loading,
    error,
    refreshBalance,
    updateBalanceAfterTransaction,
    formattedBalance: balance ? balance.deposit.toFixed(2) : '0.00',
    currency: balance?.currency || 'USD'
  }
}
