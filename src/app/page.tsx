"use client"

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { LoginDialog } from "@/components/LoginDialog";
import { RegisterDialog } from "@/components/RegisterDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const hasVisited = localStorage.getItem('has_visited');
    
    setIsAuthenticated(!!token);
    
    // Если пользователь не авторизован и это его первый визит, показываем модальное окно регистрации
    if (!token && !hasVisited) {
      setShowRegisterModal(true);
      localStorage.setItem('has_visited', 'true');
    }
  }, []);

  const handleCarouselClick = () => {
    if (isAuthenticated) {
      router.push('/deposit');
    }
  };

  const handleLoginClick = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <div>
      <section className="px-4 md:px-8 py-4">
        <div style={{ maxWidth: '100%', margin: '0 auto', overflow: 'visible' }} className="relative">
          <Carousel 
            opts={{ align: "start", loop: true, slidesToScroll: 1 }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="flex gap-1" style={{ overflow: 'visible' }}>
              <CarouselItem className="basis-full md:basis-3/5">
                {isAuthenticated ? (
                  <Image
                    src="/images/1-banner.jpg"
                    alt="banner img"
                    className="rounded-lg w-full cursor-pointer"
                    width={1200}
                    height={400}
                    loading="lazy"
                    priority={false}
                    onClick={handleCarouselClick}
                  />
                ) : (
                  <LoginDialog>
                    <Image
                      src="/images/1-banner.jpg"
                      alt="banner img"
                      className="rounded-lg w-full cursor-pointer"
                      width={1200}
                      height={400}
                      loading="lazy"
                      priority={false}
                    />
                  </LoginDialog>
                )}
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-3/5">
                {isAuthenticated ? (
                  <Image
                    src="/images/2-banner.jpg"
                    alt="banner img"
                    className="rounded-lg w-full cursor-pointer"
                    width={1200}
                    height={400}
                    loading="lazy"
                    priority={false}
                    onClick={handleCarouselClick}
                  />
                ) : (
                  <LoginDialog>
                    <Image
                      src="/images/2-banner.jpg"
                      alt="banner img"
                      className="rounded-lg w-full cursor-pointer"
                      width={1200}
                      height={400}
                      loading="lazy"
                      priority={false}
                    />
                  </LoginDialog>
                )}
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-3/5">
                {isAuthenticated ? (
                  <Image
                    src="/images/1-banner.jpg"
                    alt="banner img"
                    className="rounded-lg w-full cursor-pointer"
                    width={1200}
                    height={400}
                    loading="lazy"
                    priority={false}
                    onClick={handleCarouselClick}
                  />
                ) : (
                  <LoginDialog>
                    <Image
                      src="/images/1-banner.jpg"
                      alt="banner img"
                      className="rounded-lg w-full cursor-pointer"
                      width={1200}
                      height={400}
                      loading="lazy"
                      priority={false}
                    />
                  </LoginDialog>
                )}
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-3/5">
                {isAuthenticated ? (
                  <Image
                    src="/images/2-banner.jpg"
                    alt="banner img"
                    className="rounded-lg w-full cursor-pointer"
                    width={1200}
                    height={400}
                    loading="lazy"
                    priority={false}
                    onClick={handleCarouselClick}
                  />
                ) : (
                  <LoginDialog>
                    <Image
                      src="/images/2-banner.jpg"
                      alt="banner img"
                      className="rounded-lg w-full cursor-pointer"
                      width={1200}
                      height={400}
                      loading="lazy"
                      priority={false}
                    />
                  </LoginDialog>
                )}
              </CarouselItem>
            </CarouselContent>
            
            {/* Custom Navigation Buttons - Bottom Center */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-10 w-[80px] h-auto">
              <CarouselPrevious className="cursor-pointer h-10 w-20 rounded-lg bg-white border-0 hover:bg-gray-50 shadow-lg hover:shadow-xl active:shadow-md active:scale-95 transition-all duration-200 text-gray-700 hover:text-gray-900" />
              <CarouselNext className="cursor-pointer h-10 w-20 rounded-lg bg-white border-0 hover:bg-gray-50 shadow-lg hover:shadow-xl active:shadow-md active:scale-95 transition-all duration-200 text-gray-700 hover:text-gray-900" />
            </div>
          </Carousel>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
          {/* Casino Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold">Casino</h2>
                <span className="text-yellow-500 text-sm md:text-base">🔥 PragmaticPlay</span>
              </div>
              <button className="bg-white text-gray-700 text-xs md:text-sm flex items-center gap-1 px-3 py-2 rounded-lg border-0 shadow-[0_4px_0_0_#6b46c1] hover:shadow-[0_2px_0_0_#6b46c1] active:shadow-[0_1px_0_0_#6b46c1] active:translate-y-1 transition-all duration-100">
                <div className="grid grid-cols-3 gap-0.5 w-3 h-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                </div>
                Todos los juegos
                <span>›</span>
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/aviator.avif)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/diver.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/wheel.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/mines.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/plinko.png)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/crash.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/chicken_road.png)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/plinko_1000.png)' }}></Link>
            </div>
          </div>

          {/* Juegos en vivo Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Juegos en vivo</h2>
              <div className="hidden md:flex gap-4 text-sm">
                <span>Roulette</span>
                <span>Baccarat</span>
                <span>Crash</span>
              </div>
              <button className="bg-white text-gray-700 text-xs md:text-sm flex items-center gap-1 px-3 py-2 rounded-lg border-0 shadow-[0_4px_0_0_#6b46c1] hover:shadow-[0_2px_0_0_#6b46c1] active:shadow-[0_1px_0_0_#6b46c1] active:translate-y-1 transition-all duration-100">
                <div className="grid grid-cols-3 gap-0.5 w-3 h-3">
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                </div>
                Todos los juegos
                <span>›</span>
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/blackjack.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/powerup.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/blackjack-2.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/backjac-5.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/32-cards.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/one-day.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/backjack-salon.jpeg)' }}></Link>
              <Link href="/game" className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center transition-transform hover:scale-105" style={{ backgroundImage: 'url(/images/backjack-4.jpeg)' }}></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно регистрации */}
      <RegisterDialog 
        isOpen={showRegisterModal} 
        onOpenChange={setShowRegisterModal}
        onLoginClick={handleLoginClick}
      />

      {/* Модальное окно входа */}
      <LoginDialog 
        isOpen={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onRegisterClick={handleRegisterClick}
      />
    </div>
  );
}
