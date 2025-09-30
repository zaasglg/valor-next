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

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleCarouselClick = () => {
    if (isAuthenticated) {
      router.push('/deposit');
    }
  };

  return (
    <div>
      <section className="px-4 md:px-8 py-4">
        <div style={{ maxWidth: '100%', margin: '0 auto', overflow: 'visible' }}>
          <Carousel opts={{ align: "start", loop: true, slidesToScroll: 1 }}>
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
            {/* <CarouselPrevious />
            <CarouselNext /> */}
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
              <button className="text-blue-500 text-xs md:text-sm flex items-center gap-1">
                🎮 Todos los juegos
                <span>›</span>
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/aviator.avif)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/diver.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/wheel.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/mines.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/plinko.png)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/crash.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/chicken_road.png)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/plinko_1000.png)' }} />
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
              <button className="text-blue-500 text-xs md:text-sm flex items-center gap-1">
                🎮 Todos los juegos
                <span>›</span>
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/blackjack.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/powerup.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/blackjack-2.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/backjac-5.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/32-cards.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/one-day.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/backjack-salon.jpeg)' }} />
              <div className="rounded-lg p-4 text-white text-center h-40 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/backjack-4.jpeg)' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
