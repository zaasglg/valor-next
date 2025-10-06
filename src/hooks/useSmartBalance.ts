"use client"

import { useCallback, useEffect, useRef } from 'react'
import { useBalanceContext } from '@/contexts/BalanceContext'

interface SmartBalanceOptions {
  // Обновлять баланс при фокусе на окне (когда пользователь возвращается на вкладку)
  updateOnFocus?: boolean
  // Обновлять баланс при видимости страницы (когда пользователь переключается между вкладками)
  updateOnVisibility?: boolean
  // Минимальный интервал между обновлениями (в миллисекундах)
  minUpdateInterval?: number
}

export function useSmartBalance(options: SmartBalanceOptions = {}) {
  const {
    updateOnFocus = true,
    updateOnVisibility = true,
    minUpdateInterval = 30000 // 30 секунд минимум между обновлениями
  } = options

  const { refreshBalance } = useBalanceContext()
  const lastUpdateRef = useRef<number>(0)
  const isUpdatingRef = useRef<boolean>(false)

  const shouldUpdate = useCallback(() => {
    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdateRef.current
    
    return !isUpdatingRef.current && timeSinceLastUpdate >= minUpdateInterval
  }, [minUpdateInterval])

  const smartRefresh = useCallback(async () => {
    if (!shouldUpdate()) {
      console.log('Balance update skipped - too frequent or already updating')
      return
    }

    isUpdatingRef.current = true
    lastUpdateRef.current = Date.now()
    
    try {
      await refreshBalance()
    } finally {
      isUpdatingRef.current = false
    }
  }, [refreshBalance, shouldUpdate])

  // Обновление при фокусе на окне
  useEffect(() => {
    if (!updateOnFocus) return

    const handleFocus = () => {
      console.log('Window focused - checking if balance update is needed')
      smartRefresh()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [updateOnFocus, smartRefresh])

  // Обновление при изменении видимости страницы
  useEffect(() => {
    if (!updateOnVisibility) return

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible - checking if balance update is needed')
        smartRefresh()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [updateOnVisibility, smartRefresh])

  // Обновление при изменении localStorage (между вкладками)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'balance_updated') {
        console.log('Balance updated in another tab - refreshing')
        smartRefresh()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [smartRefresh])

  return {
    smartRefresh,
    isUpdating: isUpdatingRef.current,
    lastUpdate: lastUpdateRef.current
  }
}
