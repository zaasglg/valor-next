"use client"

import { lazy, Suspense } from 'react'
import DotsLoader from './DotsLoader'

// Lazy load диалогов
const LoginDialog = lazy(() => import('./LoginDialog').then(module => ({ default: module.LoginDialog })))
const RegisterDialog = lazy(() => import('./RegisterDialog').then(module => ({ default: module.RegisterDialog })))

interface LazyLoginDialogProps {
  children?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onRegisterClick?: () => void
}

interface LazyRegisterDialogProps {
  children?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onLoginClick?: () => void
}

export function LazyLoginDialog(props: LazyLoginDialogProps) {
  return (
    <Suspense fallback={<DotsLoader />}>
      <LoginDialog {...props} />
    </Suspense>
  )
}

export function LazyRegisterDialog(props: LazyRegisterDialogProps) {
  return (
    <Suspense fallback={<DotsLoader />}>
      <RegisterDialog {...props} />
    </Suspense>
  )
}