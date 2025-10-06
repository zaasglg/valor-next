"use client"

import { useState } from 'react'

interface ChickenRoadGameProps {
    userId?: string
    lang?: string
    className?: string
}

export default function ChickenRoadGame({ 
    userId, 
    lang = 'es', 
    className = '' 
}: ChickenRoadGameProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const gameUrl = `/chicken-road/index.php?${new URLSearchParams({
        ...(userId && { user_id: userId }),
        lang
    }).toString()}`

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    if (isFullscreen) {
        return (
            <div className="fixed inset-0 z-50 bg-black">
                <div className="relative w-full h-full">
                    <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Закрыть
                    </button>
                    <iframe
                        src={gameUrl}
                        className="w-full h-full border-0"
                        title="Chicken Road Game"
                        allowFullScreen
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                    src={gameUrl}
                    className="w-full h-full border-0"
                    title="Chicken Road Game"
                    allowFullScreen
                />
            </div>
            <button
                onClick={toggleFullscreen}
                className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
                Полный экран
            </button>
        </div>
    )
}
