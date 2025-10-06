"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useBalanceContext } from '@/contexts/BalanceContext'

export function useBalanceWebSocket() {
    const { refreshBalance, updateBalanceAfterTransaction } = useBalanceContext()
    const wsRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const connect = useCallback(() => {
        try {
            // Подключаемся к WebSocket серверу (если есть)
            // wsRef.current = new WebSocket('ws://localhost:8080/balance')
            
            // Пока используем polling как fallback
            const pollBalance = () => {
                refreshBalance()
            }
            
            // Обновляем баланс каждые 10 секунд
            const interval = setInterval(pollBalance, 10000)
            
            return () => clearInterval(interval)
        } catch (error) {
            console.error('WebSocket connection error:', error)
        }
    }, [refreshBalance])

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

    return {
        notifyBalanceUpdate,
        isConnected: wsRef.current?.readyState === WebSocket.OPEN
    }
}
