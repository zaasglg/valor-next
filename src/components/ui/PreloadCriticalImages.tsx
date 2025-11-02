"use client"

import { useEffect } from 'react'

interface PreloadCriticalImagesProps {
  images: string[]
}

export function PreloadCriticalImages({ images }: PreloadCriticalImagesProps) {
  useEffect(() => {
    // Preload critical images
    images.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [images])

  return null
}