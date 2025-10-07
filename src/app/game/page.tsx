"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
            <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
                
                <main className="flex-1 p-4 lg:p-8 bg-white rounded-2xl mt-6 lg:mt-0 w-full lg:w-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>

                            {/* Game Container */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                                <div 
                                    className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden"
                                >
                                    <iframe 
                                        src="https://chicken.valor-games.com" 
                                        className="w-full h-full rounded-xl"
                                        style={{ border: 'none' }}
                                        title="Game"
                                        allow="autoplay; fullscreen"
                                    />
                                </div>

                            </div>
                        </>
                    )}
                </main>
            </div>
    );
}
