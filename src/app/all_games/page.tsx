"use client"

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { LoginDialog } from "@/components/LoginDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";


const categories = [
    { name: "Casino", count: 0 },
    { name: "En Vivo", count: 0 },
    { name: "Todos los Juegos", count: 0, checked: true },
];

const providers = [
    { name: "PragmaticPlay", count: 0 },
];


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

export default function AllGamesPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Todos los Juegos']);
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    }, []);

    const handleCarouselClick = () => {
        if (isAuthenticated) {
            router.push('/deposit');
        }
    };

    const handleGameClick = () => {
        if (isAuthenticated) {
            // Aquí se puede agregar lógica para iniciar el juego
            console.log('Iniciando juego');
            // Por ejemplo, abrir el juego en una nueva ventana o redirigir a la página del juego
            // window.open('/game', '_blank');
            // O redirigir a la página de depósito
            router.push('/deposit');
        }
        // Para usuarios no autenticados, LoginDialog se mostrará a través del wrapper
    };

    const handleCategoryChange = (categoryName: string) => {
        if (categoryName === 'Todos los Juegos') {
            setSelectedCategories(['Todos los Juegos']);
        } else {
            setSelectedCategories(prev => {
                const newCategories = prev.filter(cat => cat !== 'Todos los Juegos');
                if (newCategories.includes(categoryName)) {
                    return newCategories.filter(cat => cat !== categoryName);
                } else {
                    return [...newCategories, categoryName];
                }
            });
        }
        // Cerrar menú móvil después de seleccionar categoría
        setIsMobileMenuOpen(false);
    };

    const handleProviderChange = (providerName: string) => {
        setSelectedProviders(prev => {
            if (prev.includes(providerName)) {
                return prev.filter(prov => prov !== providerName);
            } else {
                return [...prev, providerName];
            }
        });
        // Cerrar menú móvil después de seleccionar proveedor
        setIsMobileMenuOpen(false);
    };

    // Conteo de juegos por categorías
    const getCategoryCount = (categoryName: string) => {
        if (categoryName === 'Todos los Juegos') {
            return games.length;
        }
        return games.filter(game => game.category === categoryName).length;
    };

    // Conteo de juegos por proveedores
    const getProviderCount = (providerName: string) => {
        return games.filter(game => game.provider === providerName).length;
    };

    // Filtrado de juegos
    const filteredGames = games.filter(game => {
        // Si se selecciona la categoría "Todos los Juegos", mostramos todos los juegos
        if (selectedCategories.includes('Todos los Juegos')) {
            return true;
        }

        // Filtrado por categorías
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(game.category);

        // Filtrado por proveedores
        const providerMatch = selectedProviders.length === 0 || selectedProviders.includes(game.provider);

        return categoryMatch && providerMatch;
    });

    return (
        <div className="flex min-h-screen bg-[#fafbfc]">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Barra lateral */}
            <aside className={`fixed lg:relative inset-y-0 left-0 z-40 w-[270px] p-4 lg:p-8 bg-white border-r border-[#ecebfa] flex flex-col gap-4 lg:gap-8 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden self-end mb-2 p-2 rounded-lg hover:bg-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-[#23223a] text-lg">Categorías</h2>
                        <button
                            onClick={() => setSelectedCategories(['Todos los Juegos'])}
                            className="text-sm text-[#b3b3c3] hover:text-[#23223a] transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {categories.map((cat) => (
                            <li key={cat.name} className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => handleCategoryChange(cat.name)}
                                        className="accent-[#23223a] w-5 h-5"
                                    />
                                    <span className="text-[#23223a] text-base">{cat.name}</span>
                                </label>
                                <span className="text-[#b3b3c3] text-base font-bold">{getCategoryCount(cat.name)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-[#23223a] text-lg">Proveedores</h2>
                        <button
                            onClick={() => setSelectedProviders([])}
                            className="text-sm text-[#b3b3c3] hover:text-[#23223a] transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {providers.map((prov) => (
                            <li key={prov.name} className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedProviders.includes(prov.name)}
                                        onChange={() => handleProviderChange(prov.name)}
                                        className="accent-[#23223a] w-5 h-5"
                                    />
                                    <span className="text-[#23223a] text-base">{prov.name}</span>
                                </label>
                                <span className="text-[#b3b3c3] text-base font-bold">{getProviderCount(prov.name)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Contenido principal */}
            <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
                {/* Banners superiores */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="overflow-hidden w-full lg:w-5/12 bg-green-700 rounded-2xl flex items-center justify-center relative bg-[url(/images/Bbv2-xdH.jpg)] bg-cover h-64 lg:h-64 2xl:h-[40em]">
                        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-10">
                            <div className="flex items-end gap-1 lg:gap-2 w-full px-2 lg:px-5">
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/aviator.avif" alt="Aviador" width={120} height={120} className="w-full h-auto max-w-[60px] lg:max-w-[120px] rounded-2xl border-2 lg:border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/diver.jpeg" alt="Buzo" width={90} height={90} className="w-full h-auto max-w-[60px] lg:max-w-[120px] rounded-2xl border-2 lg:border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/plinko.png" alt="Rueda" width={90} height={90} className="w-full h-auto max-w-[60px] lg:max-w-[120px] rounded-2xl border-2 lg:border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/mines.jpeg" alt="Minas" width={90} height={90} className="w-full h-auto max-w-[60px] lg:max-w-[120px] rounded-2xl border-2 lg:border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/chicken_road.png" alt="Camino del Pollo" width={90} height={90} className="w-full h-auto max-w-[60px] lg:max-w-[120px] rounded-2xl border-2 lg:border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/plinko_1000.png" alt="Plinko Azteca" width={90} height={90} className="w-full h-auto max-w-[60px] lg:max-w-[120px] rounded-2xl border-2 lg:border-4 border-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full lg:w-7/12 h-64 2xl:h-[40em] relative overflow-hidden">
                        <Carousel opts={{ align: "start", loop: true, slidesToScroll: 1 }} className="[&_.carousel-previous]:hidden [&_.carousel-next]:hidden [&_.carousel-dots]:hidden">
                            <CarouselContent className="flex h-full">
                                <CarouselItem className="basis-full h-full">
                                    {isAuthenticated ? (
                                        <div className="h-full w-full relative">
                                            <Image
                                                src="/images/1-banner.jpg"
                                                alt="imagen del banner"
                                                className="rounded-lg w-full h-full object-contain cursor-pointer"
                                                width={1200}
                                                height={400}
                                                loading="lazy"
                                                priority={false}
                                                onClick={handleCarouselClick}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    ) : (
                                        <LoginDialog>
                                            <div className="h-full w-full relative">
                                                <Image
                                                    src="/images/1-banner.jpg"
                                                    alt="imagen del banner"
                                                    className="rounded-lg w-full h-full object-contain cursor-pointer"
                                                    width={1200}
                                                    height={400}
                                                    loading="lazy"
                                                    priority={false}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        </LoginDialog>
                                    )}
                                </CarouselItem>
                                <CarouselItem className="basis-full h-full">
                                    {isAuthenticated ? (
                                        <div className="h-full w-full relative">
                                            <Image
                                                src="/images/2-banner.jpg"
                                                alt="imagen del banner"
                                                className="rounded-lg w-full h-full object-contain cursor-pointer"
                                                width={1200}
                                                height={400}
                                                loading="lazy"
                                                priority={false}
                                                onClick={handleCarouselClick}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    ) : (
                                        <LoginDialog>
                                            <div className="h-full w-full relative">
                                                <Image
                                                    src="/images/2-banner.jpg"
                                                    alt="imagen del banner"
                                                    className="rounded-lg w-full h-full object-contain cursor-pointer"
                                                    width={1200}
                                                    height={400}
                                                    loading="lazy"
                                                    priority={false}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        </LoginDialog>
                                    )}
                                </CarouselItem>

                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
                {/* Todos los Juegos */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-6 lg:my-8 gap-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#23223a]">Todos los Juegos</h1>
                    <span className="text-[#b3b3c3] text-base lg:text-lg">
                        {filteredGames.length} {filteredGames.length === 1 ? 'juego' : 'juegos'}
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3">
                    {filteredGames.map((game, index) => (
                        <div key={index} className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                            <div className="relative w-full h-40 sm:h-48 lg:h-60">
                                {isAuthenticated ? (
                                    <Link href="/game">
                                        <Image
                                            src={game.img}
                                            alt="Juego"
                                            fill
                                            className="object-cover rounded-xl cursor-pointer"
                                            onClick={handleGameClick}
                                        />
                                    </Link>
                                ) : (
                                    <LoginDialog>
                                        <Link href="/game" tabIndex={-1} aria-disabled="true">
                                            <Image
                                                src={game.img}
                                                alt="Juego"
                                                fill
                                                className="object-cover rounded-xl cursor-pointer"
                                            />
                                        </Link>
                                    </LoginDialog>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
