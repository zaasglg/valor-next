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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CarouselBannerProps {
  isAuthenticated: boolean;
}

export function CarouselBanner({ isAuthenticated }: CarouselBannerProps) {
  const router = useRouter();
  const [banners, setBanners] = useState([
    { id: 1, src: "/images/1-banner.jpg", alt: "banner img" },
    { id: 2, src: "/images/2-banner.jpg", alt: "banner img" },
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase();
      
      if (hostname.includes('valor-games.online')) {
        // Kenya domain
        setBanners([
          { id: 1, src: "/images/1-banner-kenya.jpg", alt: "banner img" },
          { id: 2, src: "/images/2-banner-eng.jpg", alt: "banner img" },
        ]);
      } else if (hostname.includes('valor-games.world')) {
        // Nigeria domain
        setBanners([
          { id: 1, src: "/images/1-banner-nigeria.jpg", alt: "banner img" },
          { id: 2, src: "/images/2-banner-eng.jpg", alt: "banner img" },
        ]);
      } else {
        // Default (Spanish - valor-games.co and others)
        setBanners([
          { id: 1, src: "/images/1-banner.jpg", alt: "banner img" },
          { id: 2, src: "/images/2-banner.jpg", alt: "banner img" },
        ]);
      }
    }
  }, []);

  const handleCarouselClick = () => {
    if (isAuthenticated) {
      router.push('/deposit');
    }
  };

  return (
    <section className="px-4 py-4">
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
            {banners.map((banner) => (
              <CarouselItem key={banner.id} className="basis-full md:basis-3/5">
                {isAuthenticated ? (
                  <Image
                    src={banner.src}
                    alt={banner.alt}
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
                      src={banner.src}
                      alt={banner.alt}
                      className="rounded-lg w-full cursor-pointer"
                      width={1200}
                      height={400}
                      loading="lazy"
                      priority={false}
                    />
                  </LoginDialog>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Buttons - Bottom Center */}
          <div className="absolute bottom-10 right-24 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex gap-4 z-10 w-auto md:w-[80px] h-auto">
            <CarouselPrevious className="cursor-pointer h-8 w-10 md:h-10 md:w-20 rounded-lg bg-white border-0 hover:bg-gray-50 shadow-lg hover:shadow-xl active:shadow-md active:scale-95 transition-all duration-200 text-gray-700 hover:text-gray-900" />
            <CarouselNext className="cursor-pointer h-8 w-10 md:h-10 md:w-20 rounded-lg bg-white border-0 hover:bg-gray-50 shadow-lg hover:shadow-xl active:shadow-md active:scale-95 transition-all duration-200 text-gray-700 hover:text-gray-900" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
