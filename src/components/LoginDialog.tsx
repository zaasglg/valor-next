"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { authService } from "@/lib/auth"


interface LoginDialogProps {
  children?: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onRegisterClick?: () => void
}

export function LoginDialog({ children, isOpen = false, onOpenChange, onRegisterClick }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegisterClick = () => {
    onOpenChange?.(false);
    onRegisterClick?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.login(email, password);
      onOpenChange?.(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        {children && (
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
        )}
        <DialogContent className="p-0 w-sm lg:w-2xl bg-[#f3f4f7] overflow-hidden rounded-2xl">
          {/* Верхняя жёлтая секция */}
          <div className="bg-[#f4ad3d] px-8 py-5 relative">
            <DialogHeader className="p-0 bg-transparent text-left">
              <DialogTitle className="text-white text-xl font-bold mb-0">Acceso</DialogTitle>
            </DialogHeader>
            {/* Декоративный элемент по центру */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '144px',
                transform: 'translate(-50%, 0)',
                overflow: 'hidden',
                height: '68px',
                pointerEvents: 'none',
              }}
            >
              <svg width="144" height="130" viewBox="0 0 144 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.1">
                  <path d="M111.628 17.8389L120.77 21.4838L106.194 37.3233L113.865 43.0161L95.2512 56.8294L98.4242 62.4229L72.1608 108.726L45.8971 62.4229L49.0701 56.8291L30.4563 43.0161L38.1275 37.3236L23.5508 21.4841L32.4245 17.946C29.8231 12.9085 27.6154 7.18264 25.5029 1.15791H0L58.4064 130H85.6008L144 1.15791H118.495C116.398 7.14004 114.206 12.8279 111.628 17.8389Z" fill="black"></path>
                  <path d="M136.333 -56.0461C109.792 -38.5286 104.918 -10.498 95.5236 0.129364C99.1967 -17.5356 92.559 -26.9903 106.935 -42.5995C89.9579 -31.28 96.0359 -15.9238 89.303 -0.683891L87.7949 -1.56792C96.2198 -25.3343 73.3298 -55.7099 108.436 -74C67.5759 -61.4941 79.3861 -34.0497 75.04 -9.04321L72.1606 -10.7307L69.281 -9.04321C64.9349 -34.0497 76.7453 -61.4941 35.8844 -74C70.9911 -55.7099 48.1017 -25.3342 56.5263 -1.5679L54.7567 -0.530853C47.9148 -15.8212 54.0985 -31.242 37.0648 -42.5994C51.4402 -26.9902 44.8028 -17.5355 48.476 0.129387C39.0813 -10.4983 34.2072 -38.5285 7.66733 -56.046C26.5193 -38.8968 30.1245 3.84444 44.3543 21.857L37.3862 24.6353L50.1061 38.457L43.9626 43.0161L59.5797 54.6052L55.1454 62.4229L72.1607 92.4211L89.1759 62.4229L84.7419 54.6055L100.359 43.0161L94.2152 38.457L106.935 24.6352L99.7196 21.7587C113.887 3.69006 117.514 -38.9273 136.333 -56.0461ZM59.0439 40.5436L48.3543 20.2334L64.5806 32.0339L59.0439 40.5436ZM85.2772 40.5436L79.7404 32.0339L95.9667 20.2334L85.2772 40.5436Z" fill="black"></path>
                </g>
              </svg>
            </div>
          </div>

          {/* Основная форма */}
          <div className="px-8 pt-7 pb-7 bg-[#f3f4f7]">
            <form onSubmit={handleSubmit}>
              {error && (
                  <div className="col-span-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                
                <div>
                  <label className="block text-lg font-medium text-[#23223a] mb-2">Correo electrónico / Teléfono</label>
                  <Input
                    type="email"
                    placeholder="Correo electrónico o teléfono"
                    className="bg-white shadow-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-[#23223a] mb-2">Contraseña</label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      className="bg-white shadow-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a3a3b3] cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#a3a3b3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Zm9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path stroke="#a3a3b3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 3 18 18" /></svg>
                    </span>
                  </div>
                </div>

                <div>
                  <Button
                    className="w-full bg-[#f4ad3d] hover:bg-[#e6a13a] text-white font-bold py-3 rounded-lg shadow-[0_6px_0_0_#d89a2c] active:shadow-none active:translate-y-1 transition-all duration-100 border-0 disabled:opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Iniciando sesión...' : 'Acceso'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Нижний блок */}
          <div className="bg-[#23223a] text-white flex justify-between items-center px-8 py-4 rounded-b-2xl">
            <span className="">No tengo una cuenta</span>
            <span 
              className="text-white font-bold cursor-pointer flex items-center gap-2"
              onClick={handleRegisterClick}
            >
              Registrarse <span className="text-3xl">→</span>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}