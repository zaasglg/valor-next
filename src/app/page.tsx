import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <div>
      <section className="px-8 py-4">
        <div style={{ maxWidth: '100%', margin: '0 auto', overflow: 'visible' }}>
          <Carousel opts={{ align: "start", loop: true, slidesToScroll: 1 }}>
            <CarouselContent className="flex gap-1" style={{ overflow: 'visible' }}>
              <CarouselItem style={{ flex: '0 0 60%', maxWidth: '60%' }}>
                <Image src="/images/1-banner.jpg" alt="banner img" className="rounded-lg w-full" width={1200} height={400} loading="lazy" priority={false} />
              </CarouselItem>
              <CarouselItem style={{ flex: '0 0 60%', maxWidth: '60%' }}>
                <Image src="/images/2-banner.jpg" alt="banner img" className="rounded-lg w-full" width={1200} height={400} loading="lazy" priority={false} />
              </CarouselItem>
              <CarouselItem style={{ flex: '0 0 60%', maxWidth: '60%' }}>
                <Image src="/images/1-banner.jpg" alt="banner img" className="rounded-lg w-full" width={1200} height={400} loading="lazy" priority={false} />
              </CarouselItem>
              <CarouselItem style={{ flex: '0 0 60%', maxWidth: '60%' }}>
                <Image src="/images/2-banner.jpg" alt="banner img" className="rounded-lg w-full" width={1200} height={400} loading="lazy" priority={false} />
              </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      </section>

      <section className="px-8 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Casino Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Casino</h2>
                <span className="text-yellow-500">🔥 PragmaticPlay</span>
              </div>
              <button className="text-blue-500 text-sm flex items-center gap-1">
                🎮 Todos los juegos
                <span>›</span>
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Juegos en vivo</h2>
              <div className="flex gap-4 text-sm">
                <span>Roulette</span>
                <span>Baccarat</span>
                <span>Crash</span>
              </div>
              <button className="text-blue-500 text-sm flex items-center gap-1">
                🎮 Todos los juegos
                <span>›</span>
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
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
