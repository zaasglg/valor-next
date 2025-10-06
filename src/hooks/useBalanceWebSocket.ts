"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useBalanceContext } from '@/contexts/BalanceContext'
import { useSmartBalance } from './useSmartBalance'

export function useBalanceWebSocket() {
    const { updateBalanceAfterTransaction } = useBalanceContext()
    const { smartRefresh } = useSmartBalance({
      updateOnFocus: true,
      updateOnVisibility: true,
      minUpdateInterval: 60000 // 1 минута минимум между обновлениями
    })
    
    const wsRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const connect = useCallback(() => {
        try {
            // Подключаемся к WebSocket серверу (если есть)
            // wsRef.current = new WebSocket('ws://localhost:8080/balance')
            
            // Используем умное обновление баланса вместо постоянного polling
            
            return () => {
                // Cleanup функция
            }
        } catch (error) {
            console.error('WebSocket connection error:', error)
        }
    }, [smartRefresh])

    const disconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null
        }
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }
    }, [])

    useEffect(() => {
        const cleanup = connect()
        
        return () => {
            disconnect()
            if (cleanup) cleanup()
        }
    }, [connect, disconnect])

    // Функция для отправки обновления баланса
    const notifyBalanceUpdate = useCallback((newBalance: number) => {
        updateBalanceAfterTransaction(newBalance)
        
        // Отправляем уведомление другим вкладкам
        localStorage.setItem('balance_updated', Date.now().toString())
        
        // Если есть WebSocket соединение, отправляем через него
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'balance_update',
                balance: newBalance,
                timestamp: Date.now()
            }))
        }
    }, [updateBalanceAfterTransaction])

    // Функция для принудительного обновления баланса
    const forceRefresh = useCallback(() => {
        smartRefresh()
    }, [smartRefresh])

    return {
        notifyBalanceUpdate,
        forceRefresh,
        isConnected: wsRef.current?.readyState === WebSocket.OPEN
    }
}
