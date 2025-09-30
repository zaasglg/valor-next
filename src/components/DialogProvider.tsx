"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { LoginDialog } from './LoginDialog'
import { RegisterDialog } from './RegisterDialog'

interface DialogContextType {
  openLogin: () => void
  openRegister: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider')
  }
  return context
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  const openLogin = () => {
    setRegisterOpen(false)
    setLoginOpen(true)
  }

  const openRegister = () => {
    setLoginOpen(false)
    setRegisterOpen(true)
  }

  return (
    <DialogContext.Provider value={{ openLogin, openRegister }}>
      {children}
      <LoginDialog isOpen={loginOpen} onOpenChange={setLoginOpen} onRegisterClick={openRegister} />
      <RegisterDialog isOpen={registerOpen} onOpenChange={setRegisterOpen} onLoginClick={openLogin} />
    </DialogContext.Provider>
  )
}