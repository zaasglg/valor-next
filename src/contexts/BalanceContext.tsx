"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { useBalance } from '@/hooks/useBalance'

interface BalanceContextType {
  balance: ReturnType<typeof useBalance>['balance']
  loading: boolean
  error: string | null
  refreshBalance: () => void
  updateBalanceAfterTransaction: (newBalance: number) => void
  formattedBalance: string
  currency: string
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined)

interface BalanceProviderProps {
  children: ReactNode
}

export function BalanceProvider({ children }: BalanceProviderProps) {
  const balanceData = useBalance()

  return (
    <BalanceContext.Provider value={balanceData}>
      {children}
    </BalanceContext.Provider>
  )
}

export function useBalanceContext() {
  const context = useContext(BalanceContext)
  if (context === undefined) {
    throw new Error('useBalanceContext must be used within a BalanceProvider')
  }
  return context
}
