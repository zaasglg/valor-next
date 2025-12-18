"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoginDialog } from "@/components/LoginDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';
import HighBalanceVerificationModal from '@/components/HighBalanceVerificationModal';

const categories = [
  { name: "Crash", count: 8 },
  { name: "Valor Games", count: 28 },
  { name: "All Games", count: 1342, checked: true },
  { name: "instant win", count: 1 },
  { name: "Slots", count: 1179 },
  { name: "Live", count: 44 },
  { name: "Blackjack", count: 23 },
  { name: "Baccarat", count: 12 },
  { name: "Roulette", count: 15 },
];

const providers = [
  { name: "PragmaticPlay", count: 0 },
  { name: "Evolution Gaming", count: 0 },
  { name: "NetEnt", count: 0 },
  { name: "Microgaming", count: 0 },
  { name: "Play'n GO", count: 0 },
  { name: "Red Tiger", count: 0 },
  { name: "Yggdrasil", count: 0 },
  { name: "Big Time Gaming", count: 0 },
  { name: "Push Gaming", count: 0 },
  { name: "Relax Gaming", count: 0 },
];

const games = [
  // PragmaticPlay Games
  {
    img: "/game-images/aviator.jpg",
    provider: "PragmaticPlay",
    category: "Crash",
    name: "Aviator"
  },
  {
    "img": "/game-images/chicken-road.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Chicken Road"
  },
  {
    "img": "/game-images/wheel.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Wheel"
  },
  {
    "img": "/game-images/mines.jpg",
    "provider": "Valor",
    "category": "Mines",
    "name": "Mines"
  },
  {
    "img": "/game-images/squid-gamebler.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Squid Gamebler"
  },
  {
    "img": "/game-images/chicken-royal.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Chicken Royal"
  },
  {
    "img": "/game-images/diver.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Diver"
  },
  {
    "img": "/game-images/aviamasters.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Aviamasters"
  },
  {
    "img": "/game-images/rock-paper-scissors.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Rock Paper Scissors"
  },
  {
    "img": "/game-images/rabbit-road.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Rabbit Road"
  },
  {
    "img": "/game-images/ballonix.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "BalloniX"
  },
  {
    "img": "/game-images/astronaut.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Astronaut"
  },
  {
    "img": "/game-images/plinko-aztec.jpg",
    "provider": "Valor",
    "category": "Plinko",
    "name": "Plinko AZTEC"
  },
  {
    "img": "/game-images/legion-x.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Legion X"
  },
  {
    "img": "/game-images/rainforest-magic.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rainforest Magic"
  },
  {
    "img": "/game-images/fenix-play.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Fenix Play"
  },
  {
    "img": "/game-images/halloween-jackpot.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Halloween Jackpot"
  },
  {
    "img": "/game-images/tiger-kingdom.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Tiger Kingdom"
  },
  {
    "img": "/game-images/rainforest-magic-bingo.jpg",
    "provider": "Valor",
    "category": "Bingo",
    "name": "Rainforest Magic Bingo"
  },
  {
    "img": "/game-images/benji-killed-in-vegas.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Benji Killed in Vegas"
  },
  {
    "img": "/game-images/mystery-of-the-orient.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Mystery of the Orient"
  },
  {
    "img": "/game-images/the-emirate-2.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Emirate 2"
  },
  {
    "img": "/game-images/dragon-wish.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Dragon Wish"
  },
  {
    "img": "/game-images/fenix-play-27.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play 27"
  },
  {
    "img": "/game-images/atlantis-megaways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Atlantis Megaways"
  },
  {
    "img": "/game-images/rally-4-riches.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rally 4 Riches"
  },
  {
    "img": "/game-images/lady-godiva.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Lady Godiva"
  },
  {
    "img": "/game-images/yum-yum-powerways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Yum Yum Powerways"
  },
  {
    "img": "/game-images/10001-nights-megaways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "10,001 Nights MegaWays™"
  },
  {
    "img": "/game-images/fenix-play-27-deluxe.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play 27 Deluxe"
  },
  {
    "img": "/game-images/genie-jackpots-wishmaker.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Genie Jackpots Wishmaker"
  },
  {
    "img": "/game-images/beast-mode.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Beast Mode"
  },
  {
    "img": "/game-images/reactoonz-2.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Reactoonz 2"
  },
  {
    "img": "/game-images/zaidas-fortune.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Zaida's Fortune"
  },
  {
    "img": "/game-images/book-of-conquistador.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Book of Conquistador"
  },
  {
    "img": "/game-images/fenix-play-deluxe.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play Deluxe"
  },
  {
    "img": "/game-images/top-dawg.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Top Dawg$"
  },
    {
    "img": "/game-images/riches-of-ra.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Riches of RA"
  },
  {
    "img": "/game-images/caishens-gold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Caishen's Gold"
  },
  {
    "img": "/game-images/bigger-bass-bonanza.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Bigger Bass Bonanza"
  },
  {
    "img": "/game-images/peak-power.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Peak Power"
  },
  {
    "img": "/game-images/bounty-raid.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Bounty Raid"
  },
  {
    "img": "/game-images/jade-coins.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Jade Coins"
  },
  {
    "img": "/game-images/fire-bird.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fire Bird"
  },
  {
    "img": "/game-images/gold-rush-cowboy.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Gold Rush Cowboy"
  },
  {
    "img": "/game-images/riches-of-robin.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Riches of Robin"
  },
  {
    "img": "/game-images/wild-hike.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Wild Hike"
  },
  {
    "img": "/game-images/rainbow-gold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rainbow Gold"
  },
  {
    "img": "/game-images/the-knight-king.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Knight King"
  },
  {
    "img": "/game-images/crazy-genie.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Crazy Genie"
  },
  {
    "img": "/game-images/diamond-mine-extra-gold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Diamond Mine Extra Gold"
  },
  {
    "img": "/game-images/zombie-party.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Zombie Party"
  },
  {
    "img": "/game-images/doggy-riches-megaways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Doggy Riches Megaways™"
  },
  {
    "img": "/game-images/football-mania-deluxe.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Football Mania Deluxe"
  },
  {
    "img": "/game-images/guardian-of-ra.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Guardian of Ra"
  },
  {
    "img": "/game-images/larry-the-leprechaun-easter.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Larry the Leprechaun Easter"
  },
  {
    "img": "/game-images/pyramid-king.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Pyramid King"
  },
  {
    "img": "/game-images/starlight-princess.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Starlight Princess"
  },
  {
    "img": "/game-images/sword-of-ares.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Sword of Ares"
  },
  {
    "img": "/game-images/the-dog-house-multihold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Dog House Multihold"
  },
  {
    "img": "/game-images/dragons-clusterbuster.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Dragons Clusterbuster"
  }
];

export default function AllGamesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHighBalanceVerification, setShowHighBalanceVerification] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [userStage, setUserStage] = useState<string>('');

  const verificationConfig: Record<string, { min: number; max: number; fee: number; currency: string; feeLabel: string }> = {
    colombia: { min: 10000000, max: 40000000, fee: 200000, currency: 'COP', feeLabel: 'cop' },
    ecuador: { min: 8000, max: 12000, fee: 100, currency: '$ USD', feeLabel: '$ USD' },
    paraguay: { min: 80000000, max: 120000000, fee: 600000, currency: 'PYG', feeLabel: 'PYG' },
    nigeria: { min: 45000, max: 500000, fee: 500000, currency: 'NGN', feeLabel: 'NGN' },
    kenya: { min: 50000, max: 500000, fee: 4500, currency: 'KES', feeLabel: 'KES' },
    zimbabwe: { min: 70000, max: 500000, fee: 10000, currency: 'ZWL', feeLabel: 'ZWL' }
  };

  const formatAmount = (value: number, currency: string) => {
    try {
      const locale = currency === 'COP' ? 'es-CO' : currency === 'USD' ? 'en-US' : 'es-PY';
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
    } catch (e) {
      return String(value);
    }
  };

  const getCountryKey = (country: string | undefined) => {
    if (!country) return null;
    const c = country.toLowerCase();
    if (c.includes('colom') || c === 'co') return 'colombia';
    if (c.includes('ecua') || c === 'ec') return 'ecuador';
    if (c.includes('paragu') || c === 'py') return 'paraguay';
    if (c.includes('niger') || c === 'ng' || c === 'nga') return 'nigeria';
    if (c.includes('kenya') || c === 'ke') return 'kenya';
    if (c.includes('zimbabw') || c === 'zw') return 'zimbabwe';
    return null;
  };

  // Function to generate game URL based on game name
  const getGameUrl = (gameName: string) => {
    // Special case for Chicken Road
    if (gameName === "Chicken Road") {
      return "/game/chicken-road";
    }
    
    // Generate slug for other games
    const slug = gameName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return `/game/${slug}`;
  };
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Games",
  ]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopButton, setActiveTopButton] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);

    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('/api/user/info', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            const stage = data.stage || 'normal';
            setUserStage(stage);
            if (stage === 'verif2') {
              setShowHighBalanceVerification(true);
            }
            const country = data.country_info?.country || data.country || data.pais || '';
            setUserCountry(country);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, []);

  const handleCarouselClick = () => {
    if (isAuthenticated) {
      router.push("/deposit");
    }
  };

  const handleGameClick = () => {
    if (isAuthenticated) {
      // Aquí se puede agregar lógica para iniciar el juego
      console.log("Iniciando juego");
      // Por ejemplo, abrir el juego en una nueva ventana o redirigir a la página del juego
      // window.open('/game', '_blank');
      // O redirigir a la página de depósito
      router.push("/deposit");
    }
    // Para usuarios no autenticados, LoginDialog se mostrará a través del wrapper
  };

  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === "All Games") {
      setSelectedCategories(["All Games"]);
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.filter((cat) => cat !== "All Games");
        if (newCategories.includes(categoryName)) {
          return newCategories.filter((cat) => cat !== categoryName);
        } else {
          return [...newCategories, categoryName];
        }
      });
    }
    // Cerrar menú móvil después de seleccionar categoría
    setIsMobileMenuOpen(false);
  };

  const handleProviderChange = (providerName: string) => {
    setSelectedProviders((prev) => {
      if (prev.includes(providerName)) {
        return prev.filter((prov) => prov !== providerName);
      } else {
        return [...prev, providerName];
      }
    });
    // Cerrar menú móvil después de seleccionar proveedor
    setIsMobileMenuOpen(false);
  };

  const handleTopButtonClick = (buttonType: string) => {
    setActiveTopButton(buttonType);
    // Aquí puedes agregar lógica específica para cada tipo de botón
    // Por ejemplo, filtrar juegos por popularidad, tendencias, etc.
    console.log(`Clicked ${buttonType} button`);
  };

  // Conteo de juegos por categorías
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "All Games") {
      return games.length;
    }
    if (categoryName === "Valor Games") {
      return games.filter((game) => game.provider === "Valor").length;
    }
    if (categoryName === "Live") {
      return games.filter((game) => game.category === "En Vivo").length;
    }
    if (categoryName === "instant win") {
      return games.filter((game) => 
        game.category === "Crash" || 
        game.category === "Mines" || 
        game.category === "Plinko"
      ).length;
    }
    return games.filter((game) => game.category === categoryName).length;
  };

  // Conteo de juegos por proveedores
  const getProviderCount = (providerName: string) => {
    return games.filter((game) => game.provider === providerName).length;
  };

  // Filtrado de juegos
  const filteredGames = games.filter((game) => {
    // Filtrado por búsqueda
    const searchMatch = 
      searchQuery === "" ||
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Si se selecciona la categoría "All Games", mostramos todos los juegos
    if (selectedCategories.includes("All Games")) {
      return searchMatch;
    }

    // Filtrado por categorías
    let categoryMatch = false;
    if (selectedCategories.length === 0) {
      categoryMatch = true;
    } else {
      categoryMatch = selectedCategories.some(category => {
        if (category === "Valor Games") {
          return game.provider === "Valor";
        }
        if (category === "Live") {
          return game.category === "En Vivo";
        }
        if (category === "instant win") {
          return game.category === "Crash" || 
                 game.category === "Mines" || 
                 game.category === "Plinko";
        }
        return game.category === category;
      });
    }

    // Filtrado por proveedores
    const providerMatch =
      selectedProviders.length === 0 ||
      selectedProviders.includes(game.provider);

    return searchMatch && categoryMatch && providerMatch;
  });

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Mobile Filter Card - Always visible on mobile */}
      <div className="lg:hidden p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          {/* Top Categories */}
          <div className="grid grid-cols-3 gap-2">
            {/* Top Juegos */}
            <button 
              onClick={() => handleTopButtonClick("top")}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTopButton === "top" ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className={`text-xs font-semibold text-center ${
                activeTopButton === "top" ? "text-blue-600" : "text-[#23223a]"
              }`}>{t('all_games.top_games')}</span>
              <span className="text-xs text-[#b3b3c3] mt-1">13</span>
            </button>

            {/* Popular */}
            <button 
              onClick={() => handleTopButtonClick("popular")}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTopButton === "popular" ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={`text-xs font-semibold text-center ${
                activeTopButton === "popular" ? "text-blue-600" : "text-[#23223a]"
              }`}>{t('all_games.popular')}</span>
              <span className="text-xs text-[#b3b3c3] mt-1">11</span>
            </button>

            {/* Calientes */}
            <button 
              onClick={() => handleTopButtonClick("hot")}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTopButton === "hot" ? "bg-blue-50 border border-blue-200" : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={`text-xs font-semibold text-center ${
                activeTopButton === "hot" ? "text-blue-600" : "text-[#23223a]"
              }`}>{t('all_games.hot')}</span>
              <span className="text-xs text-[#b3b3c3] mt-1">9</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('all_games.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-[#b3b3c3] focus:outline-none focus:ring-2 focus:ring-[#23223a] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-4 w-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-[#23223a]">{t('all_games.providers')}</span>
              <svg className="w-4 h-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-[#23223a]">{t('all_games.categories')}</span>
              <svg className="w-4 h-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="w-[270px] 2xl:w-[320px] 2xl:p-10 bg-white border-r border-[#ecebfa] flex flex-col gap-4 lg:gap-8 2xl:gap-10">

        {/* Top Games Section */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
            {/* Top Juegos */}
            <button 
              onClick={() => handleTopButtonClick("top")}
              className={`w-full flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                activeTopButton === "top" ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  activeTopButton === "top" ? "text-blue-600" : "text-[#23223a]"
                }`}>{t('all_games.top_games')}</span>
              </div>
              <span className="text-[#b3b3c3] text-sm font-medium">13</span>
            </button>

            {/* Calientes */}
            <button 
              onClick={() => handleTopButtonClick("hot")}
              className={`w-full flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                activeTopButton === "hot" ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  activeTopButton === "hot" ? "text-blue-600" : "text-[#23223a]"
                }`}>{t('all_games.hot')}</span>
              </div>
              <span className="text-[#b3b3c3] text-sm font-medium">9</span>
            </button>

            {/* Popular */}
            <button 
              onClick={() => handleTopButtonClick("popular")}
              className={`w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors duration-200 ${
                activeTopButton === "popular" ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  activeTopButton === "popular" ? "text-blue-600" : "text-[#23223a]"
                }`}>{t('all_games.popular')}</span>
              </div>
              <span className="text-[#b3b3c3] text-sm font-medium">11</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={t('all_games.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg bg-white text-sm placeholder-[#b3b3c3] focus:outline-none focus:ring-2 focus:ring-[#23223a] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-4 w-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4 2xl:mb-6">
            <h2 className="font-bold text-[#23223a] text-lg 2xl:text-xl">
              {t('all_games.categories')}
            </h2>
            <button
              onClick={() => setSelectedCategories(["All Games"])}
              className="text-sm 2xl:text-base text-[#b3b3c3] hover:text-[#23223a] transition-colors"
            >
              {t('all_games.clear')}
            </button>
          </div>
          <ul className="space-y-0">
            {categories.map((cat, index) => (
              <li key={cat.name} className={`flex items-center justify-between py-3 ${
                index < categories.length - 1 ? 'border-b border-gray-100' : ''
              }`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryChange(cat.name)}
                    className={`w-4 h-4 rounded-sm border-2 ${
                      selectedCategories.includes(cat.name)
                        ? 'bg-[#23223a] border-[#23223a] accent-[#23223a]'
                        : 'border-gray-300'
                    }`}
                  />
                  <span className={`text-sm ${
                    selectedCategories.includes(cat.name)
                      ? 'text-[#23223a] font-semibold'
                      : 'text-gray-600'
                  }`}>
                    {cat.name}
                  </span>
                </label>
                <span className={`text-sm ${
                  selectedCategories.includes(cat.name)
                    ? 'text-[#23223a] font-semibold'
                    : 'text-gray-400'
                }`}>
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Desktop Content */}
      <main className="flex-1 p-4 lg:p-6 2xl:p-5">
        {/* Banners superiores */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-4 2xl:gap-8 mb-4 lg:mb-4 2xl:mb-12 lg:h-[220px] 2xl:h-[22em]">
          <div className="overflow-hidden w-full lg:w-5/12 bg-green-700 rounded-2xl 2xl:rounded-3xl flex items-center justify-center relative bg-[url(/images/Bbv2-xdH.jpg)] bg-cover h-64 lg:h-full 2xl:h-full">
            <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-6 lg:pb-4 2xl:pb-16">
              <div className="flex items-end gap-1 lg:gap-2 2xl:gap-3 w-full px-2 lg:px-5 2xl:px-8">
                <div className="flex-1 flex justify-center">
                  <img
                    src="/images/aviator.avif"
                    alt="Aviador"
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/images/diver.jpeg"
                    alt="Buzo"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/images/plinko.png"
                    alt="Rueda"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/images/mines.jpeg"
                    alt="Minas"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/images/chicken_road.png"
                    alt="Camino del Pollo"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="/images/plinko_1000.png"
                    alt="Plinko Azteca"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 h-64 lg:h-full 2xl:h-full relative overflow-hidden rounded-2xl 2xl:rounded-3xl">
            <Carousel
              opts={{ align: "start", loop: true, slidesToScroll: 1 }}
              className="[&_.carousel-previous]:hidden [&_.carousel-next]:hidden [&_.carousel-dots]:hidden h-full w-full"
            >
              <CarouselContent className="h-full">
                <CarouselItem className="h-full">
                  {isAuthenticated ? (
                    <div className="h-full w-full">
                      <img
                        src="/images/1-banner.jpg"
                        alt="imagen del banner"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={handleCarouselClick}
                      />
                    </div>
                  ) : (
                    <LoginDialog>
                      <div className="h-full w-full">
                        <img
                          src="/images/1-banner.jpg"
                          alt="imagen del banner"
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </div>
                    </LoginDialog>
                  )}
                </CarouselItem>
                <CarouselItem className="h-full">
                  {isAuthenticated ? (
                    <div className="h-full w-full">
                      <img
                        src="/images/2-banner.jpg"
                        alt="imagen del banner"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={handleCarouselClick}
                      />
                    </div>
                  ) : (
                    <LoginDialog>
                      <div className="h-full w-full">
                        <img
                          src="/images/2-banner.jpg"
                          alt="imagen del banner"
                          className="w-full h-full object-cover cursor-pointer"
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-3 lg:my-4 2xl:my-12 gap-2 2xl:gap-4">
          <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[#23223a]">
            {t('all_games.all_games')}
          </h1>
          <span className="text-[#b3b3c3] text-base lg:text-lg 2xl:text-xl">
            {filteredGames.length}{" "}
            {filteredGames.length === 1 ? t('all_games.game') : t('all_games.games')}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-1 lg:gap-2 2xl:gap-4">
          {filteredGames.map((game, index) => (
            <div
              key={index}
              className="rounded-lg 2xl:rounded-lg overflow-hidden duration-300"
            >
              <div className="relative w-full h-40 sm:h-48 lg:h-60 2xl:h-72">
                {isAuthenticated ? (
                  <Link href={getGameUrl(game.name)}>
                    <img
                      src={game.img}
                      alt={game.name}
                      className="object-cover rounded-md 2xl:rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={handleGameClick}
                    />
                  </Link>
                ) : (
                  <LoginDialog>
                    <Link href={getGameUrl(game.name)} tabIndex={-1} aria-disabled="true">
                      <img
                        src={game.img}
                        alt={game.name}
                        className="object-cover rounded-xl 2xl:rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
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

      {/* Mobile Content */}
      <div className="lg:hidden p-4">
        {/* Banners superiores */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="overflow-hidden w-full bg-green-700 rounded-2xl flex items-center justify-center relative bg-[url(/images/Bbv2-xdH.jpg)] bg-cover h-64">
            <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-10">
              <div className="flex items-end gap-1 w-full px-2">
                <div className="flex-1 flex justify-center">
                  <img alt="Aviador" className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white" src="/images/aviator.avif" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img alt="Buzo" width="90" height="90" className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white" src="/images/diver.jpeg" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img alt="Rueda" width="90" height="90" className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white" src="/images/plinko.png" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img alt="Minas" width="90" height="90" className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white" src="/images/mines.jpeg" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img alt="Camino del Pollo" width="90" height="90" className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white" src="/images/chicken_road.png" />
                </div>
                <div className="flex-1 flex justify-center">
                  <img alt="Plinko Azteca" width="90" height="90" className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white" src="/images/plinko_1000.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#23223a]">{t('all_games.all_games_mobile')}</h2>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredGames.map((game, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-white border border-gray-200">
                  {isAuthenticated ? (
                    <Link href={getGameUrl(game.name)}>
                      <img
                        src={game.img}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                    </Link>
                  ) : (
                    <LoginDialog>
                      <Link href={getGameUrl(game.name)} tabIndex={-1} aria-disabled="true">
                        <img
                          src={game.img}
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) {
                              fallback.style.display = 'flex';
                            }
                          }}
                        />
                      </Link>
                    </LoginDialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HighBalanceVerificationModal
        open={showHighBalanceVerification}
        onOpenChange={setShowHighBalanceVerification}
        userCountry={userCountry}
        verificationConfig={verificationConfig}
        getCountryKey={getCountryKey}
        formatAmount={formatAmount}
      />
    </div>
  );
}
