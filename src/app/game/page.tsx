"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import ProfileSidebar from '@/components/ProfileSidebar';

export default function GamePage() {
    const router = useRouter();
    const [balance, setBalance] = useState<string>('0.00');
    const [userCurrency, setUserCurrency] = useState('$');
    const [isLoading, setIsLoading] = useState(true);
    const [isGameLoading, setIsGameLoading] = useState(false);
    const [gameData, setGameData] = useState({
        gameId: '',
        gameName: '',
        gameUrl: '',
        provider: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('/api/user/info', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setBalance(data.deposit ? `${data.deposit}` : '0.00');
                    setUserCurrency(data.currency || '$');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleBackToGames = () => {
        router.push('/all_games');
    };

    const handleGameClick = () => {
        setIsGameLoading(true);
        // Simulate infinite loading - never set to false
        console.log('Starting infinite game loading...');
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
                
                <main className="flex-1 p-4 lg:p-8 bg-white rounded-2xl mt-6 lg:mt-0 w-full lg:w-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>

                            {/* Game Container */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8 border border-gray-200">
                                <div 
                                    className="aspect-video bg-black rounded-xl flex items-center justify-center mb-6 cursor-pointer hover:bg-gray-900 transition-colors"
                                    onClick={handleGameClick}
                                >
                                    <div className="text-center">
                                        {isGameLoading ? (
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                                                <h3 className="text-xl font-bold text-white mb-2">Cargando Juego...</h3>
                                                <p className="text-gray-300">Preparando la mejor experiencia de juego para ti</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-700 transition-colors">
                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Haz clic para iniciar</h3>
                                                <p className="text-gray-300">Toca la pantalla para comenzar a jugar</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </main>
            </div>
        </AuthGuard>
    );
}
