"use client"

import Image from "next/image";
import { LoginDialog } from "@/components/LoginDialog";
import { RegisterDialog } from "@/components/RegisterDialog";
import { CarouselBanner } from "@/components/CarouselBanner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LoadingPage from "@/components/LoadingPage";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Эффект для показа экрана загрузки только при первом заходе
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedValorGames');
    
    if (!hasVisitedBefore) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisitedValorGames', 'true');
      }, 3000); // Показываем загрузку 3 секунды только при первом заходе

      return () => clearTimeout(timer);
    }
  }, []);

  // Функция для сброса флага первого визита (для разработки)
  // Можно вызвать в консоли: window.resetFirstVisit()
  useEffect(() => {
    (window as Window & { resetFirstVisit?: () => void }).resetFirstVisit = () => {
      localStorage.removeItem('hasVisitedValorGames');
      console.log('First visit flag reset. Refresh the page to see loading screen again.');
    };
  }, []);

  // Массив игр для главной страницы
  const games = [
    {
      id: 1,
      name: "Aviator",
      image: "/images/aviator.avif",
      href: "/game"
    },
    {
      id: 2,
      name: "Diver",
      image: "/images/diver.jpeg",
      href: "/game"
    },
    {
      id: 3,
      name: "Wheel",
      image: "/images/wheel.jpeg",
      href: "/game"
    },
    {
      id: 4,
      name: "Mines",
      image: "/images/mines.jpeg",
      href: "/game"
    },
    {
      id: 5,
      name: "Plinko",
      image: "/images/plinko.png",
      href: "/game"
    },
    {
      id: 6,
      name: "Crash",
      image: "/images/crash.jpeg",
      href: "/game"
    },
    {
      id: 7,
      name: "Chicken Road",
      image: "/images/chicken_road.png",
      href: "/game"
    },
    {
      id: 8,
      name: "Plinko 1000",
      image: "/images/plinko_1000.png",
      href: "/game"
    }
  ];

  // Массив игр для секции "Juegos en vivo"
  const liveGames = [
    {
      id: 1,
      name: "Blackjack",
      image: "/images/blackjack.jpeg",
      href: "/game"
    },
    {
      id: 2,
      name: "Power Up",
      image: "/images/powerup.jpeg",
      href: "/game"
    },
    {
      id: 3,
      name: "Blackjack 2",
      image: "/images/blackjack-2.jpeg",
      href: "/game"
    },
    {
      id: 4,
      name: "Blackjack 5",
      image: "/images/backjac-5.jpeg",
      href: "/game"
    },
    {
      id: 5,
      name: "32 Cards",
      image: "/images/32-cards.jpeg",
      href: "/game"
    },
    {
      id: 6,
      name: "One Day",
      image: "/images/one-day.jpeg",
      href: "/game"
    },
    {
      id: 7,
      name: "Blackjack Salon",
      image: "/images/backjack-salon.jpeg",
      href: "/game"
    },
    {
      id: 8,
      name: "Blackjack 4",
      image: "/images/backjack-4.jpeg",
      href: "/game"
    }
  ];

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


  const handleLoginClick = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <CarouselBanner isAuthenticated={isAuthenticated} />

      <section className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
          {/* Casino Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold mr-5">{t('home.casino')}</h2>
                <div className="hidden md:flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-2xl cursor-pointer">
                    <img className="h-4" src="https://static.valorbetxxl.top/providers/jEBtY5wzVUqECjrAFoFGTstIkmJRjufxoKjhrAKL.svg" alt="wazdan" />
                    <span className="text-xs">Wazdan</span>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-2xl cursor-pointer">
                    <svg className="h-4" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.23862 1.11628C5.02146 -0.372094 6.97854 -0.372092 7.76138 1.11628L11.7245 8.65117C12.5073 10.1395 11.5288 12 9.9631 12H2.0369C0.471227 12 -0.507314 10.1395 0.275521 8.65116L4.23862 1.11628Z" fill="url(#paint0_linear_4182)"></path><defs><linearGradient id="paint0_linear_4182" x1="0" y1="0" x2="7.5185" y2="11.5079" gradientUnits="userSpaceOnUse"><stop stopColor="#00F0FF"></stop><stop offset="0.890625" stopColor="#000AFF"></stop></linearGradient></defs></svg>
                    <span className="text-xs">PragmaticPlay</span>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-2xl cursor-pointer">
                    <img className="h-4" src="https://static.valorbetxxl.top/providers/B7iNFZVxKk5gZNJ4qoEWzMzNr9UmHzuwlBY77R42.svg" alt="wazdan" />
                    <span className="text-xs">BGaming</span>
                  </div>
                </div>
              </div>
              <Link
                href="/all_games"
                className="bg-white text-gray-700 text-xs md:text-sm flex items-center gap-1 px-3 py-2 rounded-lg border-0 shadow-[0_4px_0_0_#6b46c1] hover:shadow-[0_2px_0_0_#6b46c1] active:shadow-[0_1px_0_0_#6b46c1] active:translate-y-1 transition-all duration-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1Z" fill="#8888A6"/><path d="M0 5C0 4.44772 0.447715 4 1 4C1.55228 4 2 4.44772 2 5C2 5.55228 1.55228 6 1 6C0.447715 6 0 5.55228 0 5Z" fill="#8888A6"/><path d="M0 9C0 8.44772 0.447715 8 1 8C1.55228 8 2 8.44772 2 9C2 9.55228 1.55228 10 1 10C0.447715 10 0 9.55228 0 9Z" fill="#8888A6"/><path d="M4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1C6 1.55228 5.55228 2 5 2C4.44772 2 4 1.55228 4 1Z" fill="#8888A6"/><path d="M4 5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5Z" fill="#8888A6"/><path d="M4 9C4 8.44772 4.44772 8 5 8C5.55228 8 6 8.44772 6 9C6 9.55228 5.55228 10 5 10C4.44772 10 4 9.55228 4 9Z" fill="#8888A6"/><path d="M8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447715 10 1C10 1.55228 9.55228 2 9 2C8.44772 2 8 1.55228 8 1Z" fill="#8888A6"/><path d="M8 5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5Z" fill="#8888A6"/><path d="M8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9Z" fill="#8888A6"/></svg>
                {t('home.all_games')}
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {games.map((game) => (
                <Link 
                  key={game.id} 
                  href={game.href} 
                  className="rounded-xl p-4 text-white text-center h-32 md:h-56 flex flex-col items-start justify-between bg-cover bg-center transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden" 
                  style={{ backgroundImage: `url(${game.image})` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#fda700e6' }}></div>
                  <div className="relative z-10 flex flex-col items-start justify-center h-full w-full p-4">
                    <h3 className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg md:text-2xl text-white text-left mb-2 md:mb-4">{game.name}</h3>
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center shadow-lg mx-auto">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[90deg]"><path fillRule="evenodd" clipRule="evenodd" d="m13.789 1.578 9.764 19.528A2 2 0 0 1 21.763 24H2.237a2 2 0 0 1-1.789-2.894l9.764-19.528a2 2 0 0 1 3.578 0z" fill="#ffffff"></path></svg>
                     </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Juegos en vivo Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">{t('home.live_games')}</h2>
              <div className="hidden md:flex gap-2 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded-2xl cursor-pointer">{t('home.crash')}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-2xl cursor-pointer">{t('home.valor_games')}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-2xl cursor-pointer">{t('home.all_games_filter')}</span>
              </div>
              <Link
                href="/all_games"
                className="bg-white text-gray-700 text-xs md:text-sm flex items-center gap-1 px-3 py-2 rounded-lg border-0 shadow-[0_4px_0_0_#6b46c1] hover:shadow-[0_2px_0_0_#6b46c1] active:shadow-[0_1px_0_0_#6b46c1] active:translate-y-1 transition-all duration-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1Z" fill="#8888A6"/><path d="M0 5C0 4.44772 0.447715 4 1 4C1.55228 4 2 4.44772 2 5C2 5.55228 1.55228 6 1 6C0.447715 6 0 5.55228 0 5Z" fill="#8888A6"/><path d="M0 9C0 8.44772 0.447715 8 1 8C1.55228 8 2 8.44772 2 9C2 9.55228 1.55228 10 1 10C0.447715 10 0 9.55228 0 9Z" fill="#8888A6"/><path d="M4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1C6 1.55228 5.55228 2 5 2C4.44772 2 4 1.55228 4 1Z" fill="#8888A6"/><path d="M4 5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5Z" fill="#8888A6"/><path d="M4 9C4 8.44772 4.44772 8 5 8C5.55228 8 6 8.44772 6 9C6 9.55228 5.55228 10 5 10C4.44772 10 4 9.55228 4 9Z" fill="#8888A6"/><path d="M8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447715 10 1C10 1.55228 9.55228 2 9 2C8.44772 2 8 1.55228 8 1Z" fill="#8888A6"/><path d="M8 5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5Z" fill="#8888A6"/><path d="M8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9Z" fill="#8888A6"/></svg>
                {t('home.all_games')}
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {liveGames.map((game) => (
                <Link 
                  key={game.id} 
                  href={game.href} 
                  className="rounded-xl p-4 text-white text-center h-36 md:h-56 flex flex-col items-start justify-center bg-cover bg-center transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden" 
                  style={{ backgroundImage: `url(${game.image})` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#fda700e6' }}></div>
                  <div className="relative z-10 flex flex-col items-start justify-center h-full w-full p-4">
                    <h3 className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg md:text-2xl text-white text-left mb-2 md:mb-4">{game.name}</h3>
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shadow-lg mx-auto">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[90deg]"><path fillRule="evenodd" clipRule="evenodd" d="m13.789 1.578 9.764 19.528A2 2 0 0 1 21.763 24H2.237a2 2 0 0 1-1.789-2.894l9.764-19.528a2 2 0 0 1 3.578 0z" fill="#ffffff"></path></svg>
                     </div>
                  </div>
                </Link>
              ))}
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
      )}
    </>
  );
}
