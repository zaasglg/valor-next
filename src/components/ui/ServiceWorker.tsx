'use client'

import { useEffect } from 'react'

export function ServiceWorker() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Register service worker after page load
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration)
            
            // Update on reload
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content available, reload page
                    window.location.reload()
                  }
                })
              }
            })
          })
          .catch(error => {
            console.log('SW registration failed: ', error)
          })
      })
    }
  }, [])

  return null
}