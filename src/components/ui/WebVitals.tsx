'use client'

import { useEffect } from 'react'

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log)
        onINP(console.log)
        onFCP(console.log)
        onLCP(console.log)
        onTTFB(console.log)
      }).catch(() => {
        // Fallback if web-vitals fails to load
        console.log('Web Vitals not available')
      })
    }
  }, [])

  return null
}

// Performance observer for monitoring
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Monitor LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1]
            console.log('LCP:', lastEntry.startTime)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Monitor INP (replaces FID)
        const inpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const inpEntry = entry as PerformanceEntry & { processingStart?: number }
            if (inpEntry.processingStart) {
              console.log('INP:', inpEntry.processingStart - entry.startTime)
            }
          }
        })
        inpObserver.observe({ entryTypes: ['first-input'] })

        // Monitor CLS
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }
            if (!clsEntry.hadRecentInput && clsEntry.value) {
              clsValue += clsEntry.value
              console.log('CLS:', clsValue)
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        return () => {
          lcpObserver.disconnect()
          inpObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch {
        console.log('Performance monitoring not available')
      }
    }
    
    return undefined
  }, [])

  return null
}