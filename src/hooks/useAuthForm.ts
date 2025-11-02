import { useState } from 'react'
import { authService } from '@/lib/auth'
import { VALIDATION_MESSAGES } from '@/lib/constants'

interface UseAuthFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useAuthForm({ onSuccess, onError }: UseAuthFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      const errorMsg = VALIDATION_MESSAGES.REQUIRED_FIELDS
      setError(errorMsg)
      onError?.(errorMsg)
      return false
    }

    setIsLoading(true)
    setError('')

    try {
      await authService.login(email, password)
      onSuccess?.()
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : VALIDATION_MESSAGES.LOGIN_ERROR
      setError(errorMsg)
      onError?.(errorMsg)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (email: string, password: string, country: string) => {
    if (!email || !password || !country) {
      const errorMsg = VALIDATION_MESSAGES.REQUIRED_FIELDS
      setError(errorMsg)
      onError?.(errorMsg)
      return false
    }

    setIsLoading(true)
    setError('')

    try {
      await authService.register(email, password, country)
      onSuccess?.()
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : VALIDATION_MESSAGES.REGISTER_ERROR
      setError(errorMsg)
      onError?.(errorMsg)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError('')

  return {
    isLoading,
    error,
    handleLogin,
    handleRegister,
    clearError
  }
}