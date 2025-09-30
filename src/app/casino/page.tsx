"use client"

import Image from "next/image";
import { LoginDialog } from "@/components/LoginDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const games = [
    { img: "/images/aviator.avif", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/diver.jpeg", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/wheel.jpeg", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/mines.jpeg", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/plinko.png", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/crash.jpeg", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/chicken_road.png", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/plinko_1000.png", provider: "PragmaticPlay", category: "Casino" },
    { img: "/images/blackjack.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/powerup.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/blackjack-2.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/backjac-5.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/32-cards.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/one-day.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/backjack-salon.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
    { img: "/images/backjack-4.jpeg", provider: "PragmaticPlay", category: "En Vivo" },
];


export default function CasinoPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    }, []);

    const handleGameClick = (gameTitle: string) => {
        if (isAuthenticated) {
            // Здесь можно добавить логику для запуска игры
            console.log(`Запуск игры: ${gameTitle}`);
            // Например, открыть игру в новом окне или перенаправить на страницу игры
            // window.open(`/game/${gameTitle}`, '_blank');
            // Или перенаправить на страницу депозита
            router.push('/deposit');
        }
        // Для неаутентифицированных пользователей LoginDialog будет показан через обертку
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] p-4 lg:p-8">
            <div className="mx-auto bg-white p-8 rounded-2xl shadow-lg">
                {/* Заголовок */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#23223a] mb-2">Juegos</h1>
                </div>

                {/* Сетка игр */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
                    {games.map((game) => (
                        <div key={game.img} className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                            <div className="relative w-full h-40 sm:h-48 lg:h-60">
                                {isAuthenticated ? (
                                    <Image 
                                        src={game.img} 
                                        alt="Juego" 
                                        fill 
                                        className="object-cover rounded-xl cursor-pointer" 
                                    />
                                ) : (
                                    <LoginDialog>
                                        <Image 
                                            src={game.img} 
                                            alt="Juego" 
                                            fill 
                                            className="object-cover rounded-xl cursor-pointer" 
                                        />
                                    </LoginDialog>
                                )}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
