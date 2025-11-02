'use client'

import { useEffect } from 'react'

export function CriticalCSS() {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (href: string) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = href
      document.head.appendChild(link)
    }

    // Preload only critical font weights
    preloadFont('/_next/static/media/geist-sans-400.woff2')
    preloadFont('/_next/static/media/geist-sans-600.woff2')

    // Remove non-critical CSS after load
    const removeCriticalCSS = () => {
      const criticalCSS = document.getElementById('critical-css')
      if (criticalCSS) {
        criticalCSS.remove()
      }
    }

    // Remove after page is fully loaded
    if (document.readyState === 'complete') {
      setTimeout(removeCriticalCSS, 1000)
    } else {
      window.addEventListener('load', () => {
        setTimeout(removeCriticalCSS, 1000)
      })
    }
  }, [])

  return (
    <style id="critical-css" dangerouslySetInnerHTML={{
      __html: `
        /* Critical above-the-fold styles */
        body { 
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          background-color: #f1f3f6;
          margin: 0;
          padding: 0;
        }
        
        /* Header critical styles */
        header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: white;
          border-bottom: 1px solid #e5e7eb;
        }
        
        /* Navigation critical styles */
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
        }
        
        /* Button critical styles */
        button {
          cursor: pointer;
          border: none;
          background: transparent;
        }
        
        /* Image critical styles */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Layout critical styles */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        /* Hide non-critical content initially */
        .below-fold {
          visibility: hidden;
        }
        
        /* Show after load */
        .loaded .below-fold {
          visibility: visible;
        }
      `
    }} />
  )
}