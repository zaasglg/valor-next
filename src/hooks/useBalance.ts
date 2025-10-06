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
      const token = localStorage.getItem('access_token')
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching balance:', err)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user?.user_id])

  // Автоматическое обновление баланса каждые 30 секунд
  useEffect(() => {
    if (!isAuthenticated) return

    fetchBalance()

    const interval = setInterval(fetchBalance, 30000) // 30 секунд
    return () => clearInterval(interval)
  }, [fetchBalance, isAuthenticated])

  // Обновление баланса при изменении localStorage (между вкладками)
  useEffect(() => {
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
      setBalance({
        ...balance,
        deposit: newBalance,
        lastUpdated: Date.now()
      })
      
      // Уведомляем другие вкладки
      localStorage.setItem('balance_updated', Date.now().toString())
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
